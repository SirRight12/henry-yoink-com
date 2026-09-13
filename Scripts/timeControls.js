try {
    const legacyTime = typeof timeControls === "function" ? timeControls : null;
    const classicTime = typeof hTimeControls === "function" ? hTimeControls : null;
    let current = Number(localStorage.getItem("timeControl")) || 1;
    let scheduleTimer;
    let nextScheduleTickAt = 0;
    let lastRefreshInterval = 0;
    const countdownRefreshInterval = 1000;
    const noClassPromptRefreshInterval = 5000;
    const activeScheduleRefreshInterval = 100;
    window.timeControlMode = current;
    const timeControlSelect = document.getElementById("timeControls");
    if (timeControlSelect) timeControlSelect.value = current === 2 && legacyTime ? "Milliseconds" : "Classic";

    function changeTimeControl(element) {
        if (element.value == "Classic") {
            current = 1;
        } else if (element.value == "Milliseconds") {
            current = 2;
        } else {
            element.value = "Classic";
            current = 1;
        }
        localStorage.setItem("timeControl", String(current));
        window.timeControlMode = current;
        restartTimer();
    }

    function useTimeControl(controller) {
        try {
            const selectedController = controller === 2 && legacyTime ? legacyTime : classicTime;
            if (selectedController) selectedController();
        } catch (err) {
            if (window.con) con.innerHTML = err;
        }
    }

    function timer() {
        useTimeControl(current);
        if (typeof calculateTimeToEnd === "function") {
            calculateTimeToEnd();
        }
    }

    function getRefreshInterval() {
        const hasCountdown = Boolean(String(window.selectedCSVOption || "").trim());
        const scheduleTimes = Array.isArray(window.scheduleTimes) ? window.scheduleTimes : [];
        if (scheduleTimes.length === 0) {
            return hasCountdown ? countdownRefreshInterval : noClassPromptRefreshInterval;
        }

        const toMinutes = value => {
            const [hours, minutes] = value.split(":").map(Number);
            return hours * 60 + minutes;
        };
        const lastEnd = Math.max(...scheduleTimes.map(period => toMinutes(period[1])));
        const now = typeof getScheduleNow === "function" ? getScheduleNow() : new Date();
        const nowMinutes = now.getHours() * 60 + now.getMinutes();

        const scheduleInterval = nowMinutes >= lastEnd
            ? noClassPromptRefreshInterval
            : activeScheduleRefreshInterval;
        return hasCountdown ? Math.min(scheduleInterval, countdownRefreshInterval) : scheduleInterval;
    }

    function scheduleTick() {
        const refreshInterval = getRefreshInterval();
        if (refreshInterval !== lastRefreshInterval || nextScheduleTickAt === 0) {
            nextScheduleTickAt = performance.now() + refreshInterval;
            lastRefreshInterval = refreshInterval;
        }
        timer();
        nextScheduleTickAt += refreshInterval;
        scheduleTimer = setTimeout(scheduleTick, Math.max(0, nextScheduleTickAt - performance.now()));
    }

    function restartTimer() {
        if (scheduleTimer) clearTimeout(scheduleTimer);
        nextScheduleTickAt = 0;
        lastRefreshInterval = 0;
        scheduleTick();
    }

    window.restartScheduleTimer = restartTimer;
    restartTimer();
    window.scheduleTimer = scheduleTimer;
} catch (err) {
    if (window.con) con.innerHTML = err;
}
