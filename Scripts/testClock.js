// Temporary schedule testing: add ?testTime=2026-09-05T10:30 or ?testTime=2026-09-05T10:30:15 to the URL.
var scheduleTestingEnabled = false;
var scheduleTestDate = null;

function setScheduleTestDate(date) {
    scheduleTestDate = date;
    if (typeof testDate !== "undefined") {
        testDate = date;
    }
}

function getScheduleNow() {
    return scheduleTestDate ? new Date(scheduleTestDate) : new Date();
}

const testTime = new URLSearchParams(window.location.search).get("testTime");
if (scheduleTestingEnabled && testTime) {
    const normalizedTestTime = testTime.replace(/(T| )\d{2}:\d{2}$/, "$&:00");
    const parsedTestTime = new Date(normalizedTestTime);
    if (!Number.isNaN(parsedTestTime.getTime())) {
        setScheduleTestDate(parsedTestTime);
        console.log("Using test time:", scheduleTestDate);
    } else {
        console.warn("Invalid testTime. Use a value like 2026-09-05T10:30.");
    }
}
