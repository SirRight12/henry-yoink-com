//?testTime=2026-09-08T08:00&nextClass=0 or //?testTime=2026-09-08T08:00:00&nextClass=0
(function () {
    if (!scheduleTestingEnabled) return;

    const params = new URLSearchParams(window.location.search);
    const classParam = params.get("nextClass");
    if (classParam === null) return;

    const classIndex = Number(classParam);
    if (!Number.isInteger(classIndex) || classIndex < 0) return;

    function getMinutes(time) {
        const [hour, minute] = time.split(":").map(Number);
        return hour * 60 + minute;
    }

    function getScheduleForDate(date) {
        return window.getScheduleForDate(date);
    }

    function moveToNextClass() {
        const now = getScheduleNow();
        const schedule = getScheduleForDate(now);
        if (!schedule || Object.keys(schedule).length === 0) {
            console.warn("There is no schedule for this date.");
            return;
        }

        const periods = Object.values(schedule)
            .map(value => value.split("-"))
            .sort(([firstStart], [secondStart]) => getMinutes(firstStart) - getMinutes(secondStart));
        const nextPeriod = periods[classIndex];

        if (!nextPeriod) {
            console.warn("That nextClass index is not scheduled today.");
            return;
        }

        const nextStart = Math.max(0, getMinutes(nextPeriod[0]) - 1);
        const nextClassTime = new Date(now);
        nextClassTime.setHours(Math.floor(nextStart / 60), nextStart % 60, 0, 0);
        setScheduleTestDate(nextClassTime);
        hTimeControls();
        console.log("Showing next class at:", nextClassTime);
    }

    window.addEventListener("load", moveToNextClass, { once: true });
}());