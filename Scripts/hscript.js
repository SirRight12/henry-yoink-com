let selectedNothingPrompt = null;
let wasOutsideScheduleWindow = false;

function hTimeControls() {
let stringThing = "";
const spanish = document.getElementById("span")
const spanishParam = new URLSearchParams(window.location.search).get("spanish");
const settingTranslations = {
    "Schedule": "Horario",
    "Appearance": "Apariencia",
    "Background Image": "Imagen de fondo",
    "Schedule Data": "Datos del horario",
    "Count Down to Date": "Cuenta regresiva hasta la fecha",
    "Campus / Grade": "Campus / Grado",
    "Schedule Data Source": "Fuente de datos del horario",
    "Navbar Color": "Color de la barra de navegación",
    "Text Color": "Color del texto",
    "Countdown Text Color": "Color del texto de la cuenta regresiva",
    "Countdown Background Color": "Color de fondo de la cuenta regresiva",
    "Icon Color": "Color del icono",
    "Background Color": "Color de fondo",
    "Font Style": "Estilo de fuente",
    "Custom FX": "Efectos personalizados",
    "Presets": "Preajustes",
    "Time Controller": "Controlador de tiempo",
    "Download CST": "Descargar CST",
    "Clear Image": "Borrar imagen",
    "Clear Saved Fonts": "Borrar fuentes guardadas",
    "Use Spanish": "Usar español",
    "Navbar Opacity": "Opacidad de la barra de navegación",
    "Reset Settings": "Restablecer configuración",
    "ALT Background Image": "Imagen de fondo alternativa",
    "Background Image settings": "Configuración de imagen de fondo",
    "Background Image Sizing": "Tamaño de imagen de fondo",
    "Background Image Repeating": "Repetición de imagen de fondo",
    "Example Schedule Data": "Datos de ejemplo del horario",
    "Download Example Data": "Descargar datos de ejemplo",
    "Upload Schedule Data": "Subir datos del horario",
    "Choose File": "Elegir archivo",
    "No file selected": "Ningún archivo seleccionado",
    "Custom Width": "Ancho personalizado",
    "Main Schedule": "Horario principal",
    "Countdown": "Cuenta regresiva",
    "Special Days": "Días especiales",
    "Period Text": "Texto de periodos",
    "None": "Ninguno",
    "Default": "Predeterminado",
    "Classic": "Clásico",
    "Milliseconds": "Milisegundos",
    "Cover": "Cubrir",
    "Contain": "Contener",
    "Custom": "Personalizado",
    "No-Repeat": "No repetir",
    "Repeat-X": "Repetir horizontalmente",
    "Repeat-Y": "Repetir verticalmente",
    "Repeat": "Repetir"
};
function updateSettingsLanguage() {
    const useSpanish = spanish?.checked;
    document.querySelectorAll("#settingsMenu label, #settingsMenu summary, #settingsMenu button, #settingsMenu .file-input-name, #settingsMenu select:not(#myDropdown) option, #settingsMenu #myDropdown option[value='']").forEach(element => {
        if (!element.dataset.englishText) element.dataset.englishText = element.textContent.trim();
        const englishText = element.dataset.englishText;
        element.textContent = useSpanish ? settingTranslations[englishText] || englishText : englishText;
    });
}
function updateFileInputNames() {
    document.querySelectorAll("#settingsMenu input[type='file']").forEach(input => {
        const name = input.closest(".file-input-control")?.querySelector(".file-input-name");
        if (!name) return;
        name.dataset.fileName = input.files[0]?.name || "";
        const englishText = input.files[0]?.name || "No file selected";
        name.dataset.englishText = englishText;
        name.textContent = spanish?.checked && !input.files[0]
            ? settingTranslations[englishText]
            : englishText;
    });
}
if (spanish) {
    spanish.checked = spanishParam === null
        ? localStorage.getItem("useSpanish") === "true"
        : ["1", "true", "yes", "on"].includes(spanishParam.toLowerCase());
    updateSettingsLanguage();
    updateFileInputNames();
    document.querySelectorAll("#settingsMenu input[type='file']").forEach(input => {
        if (input.dataset.fileInputListenerAttached) return;
        input.addEventListener("change", updateFileInputNames);
        input.dataset.fileInputListenerAttached = "true";
    });
    if (!spanish.dataset.languageListenerAttached) {
        spanish.addEventListener("change", () => {
            localStorage.setItem("useSpanish", String(spanish.checked));
            document.body.classList.remove("language-change");
            void document.body.offsetWidth;
            document.body.classList.add("language-change");
            setTimeout(() => document.body.classList.remove("language-change"), 320);
            updateSettingsLanguage();
            if (typeof addSettingsTooltips === "function") addSettingsTooltips();
            selectedNothingPrompt = null;
            wasOutsideScheduleWindow = false;
            update();
            if (typeof calculateTimeToEnd === "function") calculateTimeToEnd();
        });
        spanish.dataset.languageListenerAttached = "true";
    }
}
var whileCount = 0;
const loopDelay = 500;
const endPrompts = [["School's out, it's time to", "celebrate!", "No more homework, isn't that great?", ], ["Done with classes, it's", "time to shine!", "Enjoy the free time."], ["School's over, it's", "party time!", "Celebrate the day's uphill climb."], ["Out of school, now it's", "chillaxing!", "No more textbooks, it's relaxing.", ], ["No more lectures, it's", "fun o'clock!", "Enjoy the freedom around the block.", ], ["School's out, it's", "time to roam!", "No more classrooms, head home."], ["School's out, time to", "laugh and play!", "Leave the stress far, far away.", ], ["School's out, it's time to", "celebrate!", "No more school, that's pretty great.", ], ["Done with school, it's", "time to unwind!", "Relax and leave your stress behind.", ], ["School's over, it's", "party time!", "Celebrate the day, it's all prime."], ["Out of school, now it's", "chill and cheer!", "No more textbooks, the coast is clear.", ], ["No more lectures, it's", "fun o'clock!", "Enjoy the evening, let your laughter rock.", ], ["School's out, it's", "time to thrive!", "No more classes, embrace the vibe.", ], ];
const nothingPrompts = [
    ["Nothing to See Here", "", ""],
    ["No Classes Right Now", "", ""],
    ["Enjoy your Free Time", "", ""]
];
const spanishNothingPrompts = [
    ["No hay nada que ver aquí", "", ""],
    ["No hay clases ahora", "", ""],
    ["Disfruta tu tiempo libre", "", ""]
];
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
                return candidate.toLocaleDateString(spanish.checked ? "es" : undefined, {
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
    const nextSchoolDate = getNextSchoolDate();
    if (dayType) {
        schedulePrompt(
            dayType,
            "",
            spanish.checked ? `La escuela volverá el ${nextSchoolDate}` : `School will be back on ${nextSchoolDate}`
        );
        return;
    }
    if (!selectedNothingPrompt || (spanish.checked && nothingPrompts.includes(selectedNothingPrompt))) {
        const prompts = spanish.checked ? spanishNothingPrompts : nothingPrompts;
        const randomIndex = Math.floor(Math.random() * prompts.length);
        selectedNothingPrompt = prompts[randomIndex];
    }
    schedulePrompt(
        selectedNothingPrompt[0],
        selectedNothingPrompt[1],
        spanish.checked ? `La escuela volverá el ${nextSchoolDate}` : `School will be back on ${nextSchoolDate}`
    );
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
            showNothingPrompt();
            document.querySelector("#prompt").onclick = "";
            document.title = "Schedule";
        }
    }
    times = [];
    window.scheduleTimes = times;
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
    return periodMap[String(inp).trim().toUpperCase()] || (spanish.checked ? `${inp}º periodo` : inp + "th period");
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

if (!document.documentElement.dataset.hTimeControlListenersAttached) {
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
    document.documentElement.dataset.hTimeControlListenersAttached = "true";
}

let input = document.querySelector("#input");
if (!input.dataset.scheduleInputListenerAttached) {
    input.addEventListener("keydown", function(e) {
        if (e.code === "Backspace") {
            input.innerHTML = "";
        }
        if (e.code === "Enter") {
            e.preventDefault();
            parseSchedule();
        }
    });
    input.dataset.scheduleInputListenerAttached = "true";
}

function parseSchedule() {
    courseHtml = input.querySelector("table:nth-child(2) > tbody");
    timeHtml = input.querySelector("#AutoNumber2 > tbody");
}
return update
}
