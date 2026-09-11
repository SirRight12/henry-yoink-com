function hTimeControls() {

// Example usage:
// const randomIndex = Math.floor(Math.random() * endPrompts.length);
// const randomPrompt = endPrompts[randomIndex].join(" ");

let stringThing = "";
const spanish = document.getElementById("span")
const spanishParam = new URLSearchParams(window.location.search).get("spanish");
if (spanish) {
    spanish.checked = spanishParam === null
        ? localStorage.getItem("useSpanish") === "true"
        : ["1", "true", "yes", "on"].includes(spanishParam.toLowerCase());
    spanish.addEventListener("change", () => {
        localStorage.setItem("useSpanish", String(spanish.checked));
        update();
    });
}
var whileCount = 0;
const loopDelay = 500;
const endPrompts = [["School's out, it's time to", "celebrate!", "No more homework, isn't that great?", ], ["Done with classes, it's", "time to shine!", "Enjoy the free time."], ["School's over, it's", "party time!", "Celebrate the day's uphill climb."], ["Out of school, now it's", "chillaxing!", "No more textbooks, it's relaxing.", ], ["No more lectures, it's", "fun o'clock!", "Enjoy the freedom around the block.", ], ["School's out, it's", "time to roam!", "No more classrooms, head home."], ["School's out, time to", "laugh and play!", "Leave the stress far, far away.", ], ["School's out, it's time to", "celebrate!", "No more school, that's pretty great.", ], ["Done with school, it's", "time to unwind!", "Relax and leave your stress behind.", ], ["School's over, it's", "party time!", "Celebrate the day, it's all prime."], ["Out of school, now it's", "chill and cheer!", "No more textbooks, the coast is clear.", ], ["No more lectures, it's", "fun o'clock!", "Enjoy the evening, let your laughter rock.", ], ["School's out, it's", "time to thrive!", "No more classes, embrace the vibe.", ], ];
const nothingPrompts = [
    ["Nothing to See Here", "", ""],
    ["No Classes Right Now", "", ""],
    ["Enjoy your Free Time", "", ""]
];
let selectedNothingPrompt = null;
let wasOutsideScheduleWindow = false;
const spanPrompts = [["Escuela está acaba, es la hora para", "Celebrar!", "No más terea. Está bien?", ], ];
const plcDates = ["9/25/2024",'11/13/2024','1/22/2025','2/5/2025','3/12/2025','4/9/2025',];
const plcRegex = new RegExp("^" + plcDates.join("|^"),"gm");
const spiritWeekDates = ["9/18", "9/19", "9/20", "9/21", "9/22"];
const spRegex = new RegExp("^" + spiritWeekDates.join("|^"),"gm");
const lastEndOfDaySpeed = 5000;
var testDate = scheduleTestDate;
// testDate = new Date("9/22/2023 15:00");
var now = getScheduleNow();
if (testDate) {
    now = testDate;
}
var dateText = now.getMonth() + 1 + "/" + now.getDate() + "/" + now.getFullYear();
var currentMinute = now.getMinutes();
var currentHour = now.getHours();
var currentYear = now.getFullYear();
var weekday = now.getDay();
var adjTime = 0;
let lastEndPromptUpdate = 0;
// var weekday = "test";

function timeText(h, m) {
    return (tText = h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0"));
}

schedulePrompt = function(b, t, a) {
    element = document.querySelector("#prompt");
    const dayType = getSpecialDayType(getScheduleNow());
    const displayedAfter = times && times.length > 0 && dayType
        ? `${a} (${dayType})`
        : a;
    if (element.innerText !== t) {
        element.innerText = t;
    }
    if (element.dataset.before !== b) {
        element.dataset.before = b;
    }
    if (element.dataset.after !== displayedAfter) {
        element.dataset.after = displayedAfter;
    }
    if (!(b + t + a).includes("nothing")) {
        document.title = minuteTime(minute);
    }
    if (minuteTime(minute) === "0:00") {
        playBell();
    }
    // textInputEl.innerHTML = t;
    // handleInput();
    // refreshText();
}
;

let schedules = oshSchedules;
// let schedules = neenSchedules;

var timeDict, times;
function isHTimeOutsideScheduleWindow() {
    if (!times || times.length === 0) return true;

    const toMinutes = time => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };
    const firstStart = Math.min(...times.map(period => toMinutes(period[0])));
    const lastEnd = Math.max(...times.map(period => toMinutes(period[1])));
    const nowMinutes = getScheduleNow().getHours() * 60 + getScheduleNow().getMinutes();
    const twoHours = 2 * 60;

    return nowMinutes <= firstStart - twoHours || nowMinutes >= lastEnd + twoHours;
}
function getNextSchoolDate() {
    const candidate = new Date(getScheduleNow());
    for (let daysAhead = 0; daysAhead < 366; daysAhead += 1) {
        const schedule = getScheduleForDate(candidate);
        if (schedule && Object.keys(schedule).length > 0) {
            const firstStart = Math.min(...Object.values(schedule).map(period => {
                const [hours, minutes] = period.split("-")[0].split(":").map(Number);
                return hours * 60 + minutes;
            }));
            if (daysAhead > 0 || getScheduleNow().getHours() * 60 + getScheduleNow().getMinutes() < firstStart) {
                return candidate.toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric"
                });
            }
        }
        candidate.setDate(candidate.getDate() + 1);
    }
    return "the next school day";
}
function showNothingPrompt() {
    const dayType = getSpecialDayType(getScheduleNow());
    if (dayType) {
        schedulePrompt(dayType, "", `School will be back on ${getNextSchoolDate()}`);
        return;
    }
    if (!selectedNothingPrompt) {
        const randomIndex = Math.floor(Math.random() * nothingPrompts.length);
        selectedNothingPrompt = nothingPrompts[randomIndex];
    }
    schedulePrompt(selectedNothingPrompt[0], selectedNothingPrompt[1], `School will be back on ${getNextSchoolDate()}`);
}
function updateDay() {
    const scheduleForDate = getScheduleForDate(getScheduleNow());
    if (specialSchedules[dateText] && !normalScheduleDates[dateText]) {
        timeDict = specialSchedules[dateText];
    } else if (plcDates.includes(dateText) && schedules.plc) {
        timeDict = schedules['plc']
    } else {
        timeDict = scheduleForDate;
        if (!timeDict) {
            if (spanish.checked) {
                showNothingPrompt();
            } else {
                showNothingPrompt();
            }
            document.querySelector("#prompt").onclick = "";
            document.title = "Schedule";
        }
    }
    times = [];
    if (timeDict !== undefined) {
        for (var item of Object.values(timeDict)) {
            var array = item.split("-");
            times.push(array);
        }
        update();
    }
}

let minute, hour, timeout;
let style = 1;
function update() {
    date = getScheduleNow();
    //Comment out the line below to stop testing a specific time
    // date = new Date("4/6/2023 12:03");

    if (isHTimeOutsideScheduleWindow()) {
        if (!wasOutsideScheduleWindow) {
            showNothingPrompt();
            wasOutsideScheduleWindow = true;
        }
        document.title = "Schedule";
        return;
    }
    wasOutsideScheduleWindow = false;
    selectedNothingPrompt = null;

    if (now.getDay() !== getScheduleNow().getDay() && !testDate) {
        updateDay();
    }

    nowHour = date.getHours();
    nowMinute = date.getMinutes() + adjTime;

    hour = 0;
    minute = 1;
    var result;
    whileCount = 0;
    while (result === undefined && whileCount < 1000) {
        hour = Math.trunc((nowMinute + minute) / 60);
        timeText(nowHour + Math.trunc((minute + nowMinute) / 60), minute - 60 * hour + nowMinute);
        for (var period of times) {
            for (var pTime of period) {
                if (tText === pTime) {
                    pTimeIndex = period.indexOf(pTime);
                    periodFig = periodText(Object.keys(timeDict)[times.indexOf(period)]);
                    // timeout = setTimeout(update, loopDelay);
                    switch (pTimeIndex) {
                    case 0:
                        switch (style) {
                        case 0:
                            if (spanish.checked) return schedulePrompt("Tienes", minuteText(minute).toLowerCase(), "hasta " + periodFig + " empieza");

                            return schedulePrompt("You have", minuteText(minute).toLowerCase(), "until " + periodFig + " starts");
                        case 1:
                            let time = nowHour + Math.trunc(minute / 60) + ":" + (minute - 60 * hour + nowMinute).toString().padStart(2, "0") + ":" + (60 - getScheduleNow().getSeconds()).toString().padStart(2, "0");
                            if (spanish.checked) return schedulePrompt("Tienes", minuteTime(minute), "hasta " + periodFig + " empieza") 
                            return schedulePrompt("You have", minuteTime(minute), "until " + periodFig + " starts");
                        }
                    case 1:
                        switch (style) {
                        case 0:
                            if (spanish.checked) return schedulePrompt("Tienes", minuteTime(minute).toLowerCase(), "hasta " + periodFig + " acaba") 
                            return schedulePrompt("You have", minuteText(minute).toLowerCase(), "until " + periodFig + " ends");
                        case 1:
                            if (spanish.checked) return schedulePrompt("Tienes", minuteTime(minute), "hasta " + periodFig + " acaba") 
                            return schedulePrompt("You have", minuteTime(minute), "until " + periodFig + " ends");
                        }
                    }
                }
            }
        }
        minute += 1;
        if (minute / 60 + nowHour > 24) {
            if (Date.now() - lastEndPromptUpdate < lastEndOfDaySpeed) return;
            lastEndPromptUpdate = Date.now();
            if (spanish.checked) { 
                const randomIndex = Math.floor(Math.random() * spanPrompts.length);
                schedulePrompt(spanPrompts[randomIndex][0], spanPrompts[randomIndex][1], spanPrompts[randomIndex][2]);
            } else {
                const randomIndex = Math.floor(Math.random() * endPrompts.length);
                schedulePrompt(endPrompts[randomIndex][0], endPrompts[randomIndex][1], endPrompts[randomIndex][2]);
            }
            document.title = "Schedule";
            return;
        }
        whileCount += 1;
    }
    if (whileCount > 1000) {
        console.error("We couldn't find anything within a thousand iters");
        return;
    }
}

function minuteText(num) {
    if (num === undefined)
        return "";
    // Handle undefined input

    num = parseFloat(num);

    const hours = Math.floor(num / 60);
    const minutes = num % 60;

    if (hours === 0 && minutes === 0) {
        return "0 minutes";
    } else if (hours === 0) {
        if (minutes === 1) {
            return `${minutes} minute`;
        } else {
            return `${minutes} minutes`;
        }
    } else if (minutes === 0) {
        if (hours === 1) {
            return `${hours} hour`;
        } else {
            return `${hours} hours`;
        }
    } else {
        const hourText = hours === 1 ? "hour" : "hours";
        const minuteText = minutes === 1 ? "minute" : "minutes";
        return `${hours} ${hourText} and ${minutes} ${minuteText}`;
    }
}

function minuteTime(num) {
    let hourT = "";
    if (Math.trunc(minute / 60) !== 0) {
        hourT = Math.trunc(minute / 60) + ":";
    }
    minuteT = minute - 60 * Math.trunc(minute / 60) - 1;
    let secondT = (60 - getScheduleNow().getSeconds()).toString().padStart(2, "0");
    if (secondT === "60") {
        secondT = "00";
        minuteT += 1;
    }

    return hourT + minuteT.toString().padStart(2, "0") + ":" + secondT;
}

function periodText(inp) {
    const periodMap = spanish.checked ? periodTextSpanishMap : periodTextMap;
    return periodMap[String(inp).trim().toUpperCase()] || inp + "th period";
}

function toggleStyle() {
    clearTimeout(timeout);
    style += 1;
    if (style > 1) {
        style = 0;
    }
    update();
}

updateDay();

window.addEventListener("keydown", function(e) {
    stringThing += e.key;
    if (e.code === "Enter" && e.ctrlKey === true) {
        playBell();
    }
});

window.addEventListener("keyup", function(e) {
    if (stringThing === atob("YTtzbGRrZmo=")) {
        input = parseInt(window.prompt(atob("SG93IG1hbnkgbWludXRlcyB3b3VsZCB5b3UgbGlrZSB0byBhZGp1c3QgdGhlIHRpbWUgYnk/")));
        if (!isNaN(input)) {
            adjTime = input;
        }
    }
    stringThing = "";
});

let helperDiv;
function toggleCampus() {
    if (helperDiv.innerText.contains("")) {} else {}
}

let input = document.querySelector("#input");
input.addEventListener("keydown", function(e) {
    if (e.code === "Backspace") {
        input.innerHTML = "";
    }
    if (e.code === "Enter") {
        e.preventDefault();
        parseSchedule();
    }
});

function parseSchedule() {
    courseHtml = input.querySelector("table:nth-child(2) > tbody");
    timeHtml = input.querySelector("#AutoNumber2 > tbody");
}

// Define the URL of the Google Sheets CSV file
const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSimvdzuvl9bkci5Iszv9SZkKmmkPQQoJbpjYTA-5RRTMhslY4Ii7mRz98wa49yOdaIf0RyOU7zylsN/pub?gid=163195620&single=true&output=csv";

// Function to fetch and process CSV data
csvObj = {};
function fetchCSVData() {
    csvObj = {};
    fetch(csvUrl).then((response)=>{
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.text();
    }
    ).then((csvData)=>{
        // Process the CSV data
        let rows = csvData.split("\r\n");
        for (let row of rows) {
            row = row.split(",");
            csvObj[row[0]] = row[1];
        }
        useCsvData();
        // You can perform further processing or display the data as needed
    }
    ).catch((error)=>{
        console.error("Error:", error);
    }
    );
}

function useCsvData() {
}

// setTheme("halloween");
return update
}
