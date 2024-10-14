function hTimeControls() {

// Example usage:
// const randomIndex = Math.floor(Math.random() * endPrompts.length);
// const randomPrompt = endPrompts[randomIndex].join(" ");

let stringThing = "";
const spanish = document.getElementById("span")
var whileCount = 0;
const loopDelay = 500;
const endPrompts = [["School's out, it's time to", "celebrate!", "No more homework, isn't that great?", ], ["Done with classes, it's", "time to shine!", "Enjoy the free time."], ["School's over, it's", "party time!", "Celebrate the day's uphill climb."], ["Out of school, now it's", "chillaxing!", "No more textbooks, it's relaxing.", ], ["No more lectures, it's", "fun o'clock!", "Enjoy the freedom around the block.", ], ["School's out, it's", "time to roam!", "No more classrooms, head home."], ["School's out, time to", "laugh and play!", "Leave the stress far, far away.", ], ["School's out, it's time to", "celebrate!", "No more school, that's pretty great.", ], ["Done with school, it's", "time to unwind!", "Relax and leave your stress behind.", ], ["School's over, it's", "party time!", "Celebrate the day, it's all prime."], ["Out of school, now it's", "chill and cheer!", "No more textbooks, the coast is clear.", ], ["No more lectures, it's", "fun o'clock!", "Enjoy the evening, let your laughter rock.", ], ["School's out, it's", "time to thrive!", "No more classes, embrace the vibe.", ], ];
const spanPrompts = [["Escuela está acaba, es la hora para", "Celebrar!", "No más terea. Está bien?", ], ];
const plcDates = ["9/25"];
const plcRegex = new RegExp("^" + plcDates.join("|^"),"gm");
const spiritWeekDates = ["9/18", "9/19", "9/20", "9/21", "9/22"];
const spRegex = new RegExp("^" + spiritWeekDates.join("|^"),"gm");
var testDate;
// testDate = new Date("9/22/2023 15:00");
var now = new Date();
if (testDate) {
    now = testDate;
}
var dateText = now.getMonth() + 1 + "/" + now.getDate() + "/" + now.getFullYear();
var currentMinute = now.getMinutes();
var currentHour = now.getHours();
var currentYear = now.getFullYear();
var weekday = now.getDay();
var adjTime = 0;
// var weekday = "test";

function timeText(h, m) {
    return (tText = h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0"));
}

schedulePrompt = function(b, t, a) {
    element = document.querySelector("#prompt");
    if (element.innerText !== t) {
        element.innerText = t;
    }
    if (element.dataset.before !== b) {
        element.dataset.before = b;
    }
    if (element.dataset.after !== a) {
        element.dataset.after = a;
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
function updateDay() {
    if (dateText.match("10/17") !== null) {
        timeDict = schedules.mwth;
    } else if (dateText.match("4/24")) {
        timeDict = schedules['4/24']
    } else if (dateText.match("10/19") !== null) {
        timeDict = schedules.t;
    } else if (dateText.match(plcRegex) !== null) {
        timeDict = schedules.plc;
    } else if (dateText.match(spRegex) !== null) {
        timeDict = schedules[dateText];
    } else if (schedules[dateText]) {
        timeDict = schedules[dateText];
    } else {
        switch (weekday) {
        case 1:
            timeDict = schedules.mwth;
            break;
        case 2:
            timeDict = schedules.t;
            break;
        case 3:
            timeDict = schedules.mwth;
            break;
        case 4:
            timeDict = schedules.mwth;
            break;
        case 5:
            timeDict = schedules.f;
            break;
        case "test":
            timeDict = schedules.test;
            break;
        default:
            if (spanish.checked) {
                schedulePrompt("Lo siento, pero hay","nada","hacer hoy")
            } else {
                schedulePrompt("Sorry, but there's", "nothing", "coming up today");
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
    date = new Date();
    if (testDate) {
        date = testDate;
    }
    //Comment out the line below to stop testing a specific time
    // date = new Date("4/6/2023 12:03");

    if (now.getDay() !== new Date().getDay() && !testDate) {
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
                            if (spanish.checked) schedulePrompt("Tienes", minuteText(minute).toLowerCase(), "hasta " + periodFig + " empieza"); 

                            return schedulePrompt("You have", minuteText(minute).toLowerCase(), "until " + periodFig + " starts");
                        case 1:
                            let time = nowHour + Math.trunc(minute / 60) + ":" + (minute - 60 * hour + nowMinute) + ":" + (60 - new Date().getSeconds());
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
    let hourT = (minuteT = "");
    if (Math.trunc(minute / 60) !== 0) {
        hourT = Math.trunc(minute / 60) + ":";
    }
    minuteT = minute - 60 * Math.trunc(minute / 60) - 1;
    let secondT = (60 - new Date().getSeconds()).toString().padStart(2, "0");
    if (secondT === "60") {
        secondT = "00";
        minuteT += 1;
    }

    return hourT + minuteT + ":" + secondT;
}

function periodText(inp) {
    switch (inp) {
    case "C":
        return "Chapel";
    case "D":
        return "D-Groups";
    case "CD":
        return "Chapel/D-Groups";
    case "L":
        return "Lunch";
    case "BH":
        return "You have to check in"
    case "H":
        return "H-Hour";
    case "1":
        return "1st period";
    case "2":
        return "2nd period";
    case "3":
        return "3rd period";
    case "R":
        return "Recess";
    case "0":
        return "H-Hour/D-Groups";
        //Spirit Week cases
    case "SP-M":
        return "volleyball";
    case "SP-W":
        return "the powderpuff game";
    case "CRT":
        return "court presentation";
    //Spiritual Emphasis Cases
    case "SEC":
        return "Spiritual Emphasis Chapel"
    //Default case
    default:
        return inp + "th period";
    }
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
