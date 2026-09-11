try {
    const legacyTime = typeof timeControls === "function" ? timeControls : null;
    const classicTime = typeof hTimeControls === "function" ? hTimeControls : null;
    const refreshIntervalMs = 5000;
    let current = Number(localStorage.getItem("timeControl")) || 1;
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
    }

    function useTimeControl(controller) {
        try {
            if (controller == 1) {
                if (classicTime) classicTime();
                return;
            }
            if (controller == 2) {
                if (legacyTime) {
                    legacyTime();
                    return;
                }
                if (classicTime) {
                    classicTime();
                    return;
                }
            }
            if (classicTime) classicTime();
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

    timer();
    const scheduleTimer = setInterval(timer, refreshIntervalMs);
    window.scheduleTimer = scheduleTimer;
} catch (err) {
    if (window.con) con.innerHTML = err;
}
