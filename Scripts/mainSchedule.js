const scheduleFile = "data/MainSchedule.csv";
const specialScheduleFile = "data/SpecialScheduleDays.csv";
const periodTextFile = "data/PeriodText.csv";

function getSelectedScheduleSelection() {
	return (localStorage.getItem("scheduleSelection") || "").trim();
}

function getCsvCampusAndGrade(columns) {
	if (!Array.isArray(columns) || columns.length === 0) return { campus: "", grade: "" };

	const first = (columns[0] || "").trim();
	const second = (columns[1] || "").trim();
	const third = (columns[2] || "").trim();

	if (!first && !second && !third) return { campus: "", grade: "" };
	if (["Name", "Campus"].includes(first)) return { campus: second, grade: third };
	if (["Name", "Campus"].includes(second)) return { campus: third, grade: "" };

	const secondLooksLikeGradeGroup = /school|grade|middle|elementary|junior|senior|freshman|sophomore/i.test(second);
	const thirdLooksLikeDayCode = /^(m|t|w|th|f|hrm|zh|l|normal|school|week|[0-9]+)$/i.test(third);

	if (secondLooksLikeGradeGroup && thirdLooksLikeDayCode) {
		return { campus: first, grade: second };
	}

	if (secondLooksLikeGradeGroup && !thirdLooksLikeDayCode) {
		return { campus: first, grade: second };
	}

	return { campus: second, grade: third };
}

function rowMatchesSelectedSchedule(columns) {
	if (!Array.isArray(columns) || columns.length < 3) return true;

	const selectedValue = getSelectedScheduleSelection();
	const { campus, grade } = getCsvCampusAndGrade(columns);
	if (!selectedValue) return true;

	const selectedCampus = selectedValue.includes(" - ") ? selectedValue.split(" - ")[0].trim() : selectedValue;
	const selectedGrade = selectedValue.includes(" - ") ? selectedValue.split(" - ")[1].trim() : "";

	if (selectedCampus && campus && selectedCampus !== campus) return false;
	if (selectedGrade && grade && selectedGrade !== grade) return false;
	return true;
}

function loadCsvRows(filePath, sheetKey, filterBySchedule = true) {
	const rows = loadDatabaseText(filePath, sheetKey)
		.split(/\r?\n/)
		.map(row => row.trim())
		.filter(Boolean)
		.map(row => row.includes("\t") ? row.split("\t").map(value => value.trim()) : parseDelimitedRow(row));

	return filterBySchedule ? rows.filter(rowMatchesSelectedSchedule) : rows;
}

function buildScheduleFilterOptions() {
	const select = document.getElementById("schedule-selection");
	if (!select) return;

	const csvSources = [
		{ path: scheduleFile, key: "mainSchedule" },
		{ path: "data/CountDownToDate.csv", key: "countdown" },
		{ path: specialScheduleFile, key: "specialScheduleDays" }
	];

	const options = new Map();
	for (const source of csvSources) {
		try {
			for (const columns of loadCsvRows(source.path, source.key, false)) {
				if (!columns.length || columns[0]?.trim() === "Name" || columns[0]?.trim() === "Campus") continue;
				const { campus, grade } = getCsvCampusAndGrade(columns);
				if (campus && grade) options.set(`${campus} - ${grade}`, `${campus} - ${grade}`);
				else if (campus) options.set(campus, campus);
			}
		} catch {}
	}

	select.innerHTML = "";
	const sortedValues = [...new Set(options.values())].sort();
	if (sortedValues.length > 1) {
		const allOption = document.createElement("option");
		allOption.value = "";
		allOption.textContent = "None";
		select.appendChild(allOption);
	}
	for (const value of sortedValues) {
		const option = document.createElement("option");
		option.value = value;
		option.textContent = value;
		select.appendChild(option);
	}

	const savedValue = getSelectedScheduleSelection();
	if (savedValue && sortedValues.includes(savedValue)) {
		select.value = savedValue;
	} else if (sortedValues.length === 1) {
		select.value = sortedValues[0];
		localStorage.setItem("scheduleSelection", sortedValues[0]);
	} else {
		select.value = "";
		localStorage.setItem("scheduleSelection", "");
	}

	select.addEventListener("change", () => {
		localStorage.setItem("scheduleSelection", select.value || "");
		window.location.reload();
	});
}

function downloadScheduleExample() {
	const csv = [
		"Campus,Grade Level Category/Group,Day/s of the Week(M,T,W,Th, and/or F),Hour/Period,Start Time (24 hr),End Time (24 hr)",
		"Vinland,High School,\"M, T, Th\",1,8:15:01,8:58",
		"Vinland,High School,\"W, F\",1,8:59,9:40",
		"Vinland,High School,\"M, T, W, Th, F\",HRM,8:15,8:15:01"
	].join("\n");

	const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = "ScheduleExample.csv";
	document.body.appendChild(link);
	link.click();
	link.remove();
	URL.revokeObjectURL(url);
}

function uploadedCsvLooksValid(text, sheetKey) {
	if (!text.trim()) return false;
	const header = text.split(/\r?\n/, 1)[0].toLowerCase();
	const requiredHeaders = {
		mainSchedule: ["period", "start time", "end time"],
		countdown: ["date", "time"],
		specialScheduleDays: ["date", "hour/period"],
		periodText: ["code", "text"]
	};
	return requiredHeaders[sheetKey].every(value => header.includes(value));
}

function addSettingsTooltips() {
	const settingsMenu = document.getElementById("settingsMenu");
	if (!settingsMenu) return;
	const useSpanish = typeof isSpanishEnabled === "function" && isSpanishEnabled();

	settingsMenu.querySelectorAll("details > summary").forEach(summary => {
		summary.title = useSpanish
			? "Expandir o contraer la configuración de " + summary.textContent.trim()
			: "Expand or collapse the " + summary.textContent.trim() + " settings";
	});

	settingsMenu.querySelectorAll(".settingsContainer").forEach(container => {
		const label = container.querySelector(".setText")?.textContent.trim()
			|| [...container.querySelectorAll("label")].find(item => !item.classList.contains("file-input-button"))?.textContent.trim();
		const control = container.querySelector("input, select, button");
		if (!control) return;
		const name = label || control.textContent.trim() || control.id;
		if (control.matches("input[type='color']")) {
			control.title = useSpanish ? "Elige " + name.toLowerCase() : "Choose the " + name.toLowerCase();
		} else if (control.matches("input[type='file']")) {
			const fileTitle = useSpanish ? "Sube " + name.toLowerCase() : "Upload " + name.toLowerCase();
			control.title = fileTitle;
			container.querySelector(".file-input-button")?.setAttribute("title", fileTitle);
		} else if (control.matches("select")) {
			const selectHelp = {
				"presets": "Choose a visual preset",
				"custom-schedule-sheet": "Choose which schedule data to use",
				"database-source": "Choose where schedule data is loaded from"
			};
			const spanishSelectHelp = {
				"presets": "Elige un preajuste visual",
				"custom-schedule-sheet": "Elige qué datos de horario usar",
				"database-source": "Elige de dónde cargar los datos del horario"
			};
			control.title = useSpanish
				? spanishSelectHelp[control.id] || "Elige " + name.toLowerCase()
				: selectHelp[control.id] || "Choose " + name.toLowerCase();
		} else {
			control.title = useSpanish ? name : name;
		}
	});

	settingsMenu.querySelectorAll("select option").forEach(option => {
		const selectId = option.parentElement?.id;
		const optionHelp = {
			"database-source": {
				local: "Use the CSV files stored in the website folder",
				global: "Use the connected Google Sheet; this data is usually more up to date"
			},
			"custom-schedule-sheet": {
				mainSchedule: "Choose the regular class schedule data",
				countdown: "Choose countdown date data",
				specialScheduleDays: "Choose special school-day data",
				periodText: "Choose period name and description data"
			}
		};
		const spanishOptionHelp = {
			"database-source": {
				local: "Usa los archivos CSV guardados en la carpeta del sitio web",
				global: "Usa la hoja de Google conectada; estos datos suelen estar más actualizados"
			},
			"custom-schedule-sheet": {
				mainSchedule: "Elige los datos del horario normal de clases",
				countdown: "Elige los datos de fechas de cuenta regresiva",
				specialScheduleDays: "Elige los datos de días escolares especiales",
				periodText: "Elige los datos de nombres y descripciones de periodos"
			}
		};
		option.title = useSpanish
			? spanishOptionHelp[selectId]?.[option.value] || "Elige " + option.textContent.trim()
			: optionHelp[selectId]?.[option.value] || "Choose " + option.textContent.trim();
	});
}

document.addEventListener("DOMContentLoaded", () => {
	buildScheduleFilterOptions();
	addSettingsTooltips();

	const uploadInput = document.getElementById("custom-schedule-file");
	if (uploadInput) {
		const uploadStatus = document.getElementById("schedule-upload-status");
		const sheetSelect = document.getElementById("custom-schedule-sheet");
		const showUploadStatus = message => {
			if (uploadStatus) uploadStatus.textContent = message;
		};
		const selectedSheetKey = sheetSelect?.value || "mainSchedule";
		if (localStorage.getItem(`customScheduleError_${selectedSheetKey}`) === "true") {
			const sourceName = window.databaseSource === "google" ? "Google Sheets" : "the bundled local CSV";
			showUploadStatus(`The uploaded ${selectedSheetKey} CSV has an error. Using ${sourceName}.`);
		}
		uploadInput.addEventListener("change", async () => {
			const file = uploadInput.files[0];
			if (!file) return;
			const sheetKey = sheetSelect?.value || "mainSchedule";
			const supportedKeys = new Set(["mainSchedule", "countdown", "specialScheduleDays", "periodText"]);
			if (!supportedKeys.has(sheetKey) || !/\.csv$/i.test(file.name)) {
				showUploadStatus("The selected upload has an error. Choose a valid CSV file.");
				window.alert("Choose a CSV file and select one of the four CSV types first.");
				uploadInput.value = "";
				return;
			}
			let text;
			try {
				text = await file.text();
			} catch {
				localStorage.removeItem(`customSchedule_${sheetKey}`);
				localStorage.setItem(`customScheduleError_${sheetKey}`, "true");
				showUploadStatus(`The uploaded ${sheetKey} CSV has an error. Using the fallback data.`);
				window.alert("This CSV could not be read. The bundled local CSV will be used.");
				window.location.reload();
				return;
			}
			if (!uploadedCsvLooksValid(text, sheetKey)) {
				localStorage.removeItem(`customSchedule_${sheetKey}`);
				localStorage.setItem(`customScheduleError_${sheetKey}`, "true");
				showUploadStatus(`The uploaded ${sheetKey} CSV has an error. Using the fallback data.`);
				window.alert("This CSV does not match the selected type. The bundled local CSV will be used.");
				window.location.reload();
				return;
			}
			localStorage.removeItem(`customScheduleError_${sheetKey}`);
			localStorage.setItem(`customSchedule_${sheetKey}`, text);
			window.location.reload();
		});
	}

	const exampleButton = document.getElementById("download-schedule-example");
	if (exampleButton) {
		exampleButton.addEventListener("click", downloadScheduleExample);
	}
});

function isSpanishEnabled() {
	return Boolean(document.getElementById("span")?.checked);
}

function getLocalizedCsvValue(columns, englishIndex, spanishIndex) {
	const englishValue = columns[englishIndex]?.trim() || "";
	const spanishValue = columns[spanishIndex]?.trim() || "";
	return isSpanishEnabled() && spanishValue ? spanishValue : englishValue;
}

function normalizeScheduleTime(value) {
	const parts = value.split(":");
	const hour = parts[0].padStart(2, "0");
	const minute = parts[1].padStart(2, "0");
	if (parts.length < 3) return `${hour}:${minute}`;
	return `${hour}:${minute}:${parts[2].padStart(2, "0")}`;
}

function loadMainSchedule() {
	const schedules = {
		mtth: {},
		w: {},
		f: {}
	};

	const rows = loadCsvRows(scheduleFile, "mainSchedule");

	for (const row of rows) {
		const columns = row;
		const hasNameColumn = columns.length >= 7;
		const days = columns[hasNameColumn ? 3 : 2];
		const period = columns[hasNameColumn ? 4 : 3];
		const start = columns[hasNameColumn ? 5 : 4];
		const end = columns[hasNameColumn ? 6 : 5];
		if (!days || !period || !start || !end || period === "Hour/Period") continue;

		const time = `${normalizeScheduleTime(start)}-${normalizeScheduleTime(end)}`;
		const normalizedPeriod = period;
		const dayList = days.split(",").map(day => day.trim());

		if (["M", "T", "Th"].every(day => dayList.includes(day))) {
			schedules.mtth[normalizedPeriod] = time;
		}
		if (dayList.includes("W")) {
			schedules.w[normalizedPeriod] = time;
		}
		if (dayList.includes("F")) {
			schedules.f[normalizedPeriod] = time;
		}
	}

	return schedules;
}

function parseDelimitedRow(row) {
	const columns = [];
	let value = "";
	let quoted = false;

	for (let index = 0; index < row.length; index += 1) {
		const character = row[index];
		if (character === '"') {
			if (quoted && row[index + 1] === '"') {
				value += '"';
				index += 1;
			} else {
				quoted = !quoted;
			}
		} else if (character === "," && !quoted) {
			columns.push(value.trim());
			value = "";
		} else {
			value += character;
		}
	}

	columns.push(value.trim());
	return columns;
}

function loadPeriodTextMap() {
	const periodText = {};
	const periodTextSpanish = {};
	const rows = loadDatabaseText(periodTextFile, "periodText")
		.split(/\r?\n/)
		.map(row => row.trim())
		.filter(Boolean);

	for (const row of rows) {
		const [code, text, spanishText] = parseDelimitedRow(row);
		if (!code || !text || code === "Code") continue;
		periodText[code.toUpperCase()] = text;
		periodTextSpanish[code.toUpperCase()] = (spanishText || text).replace(/^spanish:\s*/i, "");
	}

	return { english: periodText, spanish: periodTextSpanish };
}

function normalizeScheduleDate(value) {
	const parts = value.trim().split("/");
	if (parts.length !== 3) return null;
	return `${Number(parts[0])}/${Number(parts[1])}/${parts[2]}`;
}

function expandScheduleDates(value) {
	const dates = [];

	for (const dateValue of value.split(",")) {
		const range = dateValue.trim().split("-");
		if (range.length > 2) continue;

		const startDate = new Date(`${range[0].trim()} 00:00:00`);
		if (Number.isNaN(startDate.getTime())) continue;

		const endDate = range.length === 2
			? new Date(`${range[1].trim()} 00:00:00`)
			: new Date(startDate);
		if (Number.isNaN(endDate.getTime()) || startDate > endDate) continue;

		for (const date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
			dates.push(normalizeScheduleDate(`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`));
		}
	}

	return dates;
}

function loadSpecialSchedules() {
	const schedules = {};
	const rows = loadDatabaseText(specialScheduleFile, "specialScheduleDays")
		.split(/\r?\n/)
		.map(row => row.trim())
		.filter(Boolean)
		.map(parseDelimitedRow)
		.filter(rowMatchesSelectedSchedule);

	for (const row of rows) {
		const columns = row;
		const [name, , , dates, period, start, end, dayType] = columns;
		const spanishName = columns[7];
		if (!dates || name === "Name") continue;

		for (const dateKey of expandScheduleDates(dates)) {
			if (name) {
				specialDayTypes[dateKey] = name;
				specialDayTypesSpanish[dateKey] = spanishName || name;
				if (!schedules[dateKey]) schedules[dateKey] = {};
			}
			if (period && ["normal", "normal schedule"].includes(period.trim().toLowerCase())) {
				normalScheduleDates[dateKey] = true;
				continue;
			}
			if (!period || !start || !end) continue;
			const time = `${normalizeScheduleTime(start)}-${normalizeScheduleTime(end)}`;
			if (!schedules[dateKey]) schedules[dateKey] = {};
			schedules[dateKey][period] = time;
		}
	}

	return schedules;
}

function getRegularScheduleForDate(date) {
	switch (date.getDay()) {
	case 1:
	case 2:
	case 4:
		return oshSchedules.mtth;
	case 3:
		return oshSchedules.w;
	case 5:
		return oshSchedules.f;
	default:
		return undefined;
	}
}

function getScheduleForDate(date) {
	const dateKey = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
	if (normalScheduleDates[dateKey] || specialDayTypes[dateKey] === "School at Home") {
		return getRegularScheduleForDate(date);
	}
	if (Object.prototype.hasOwnProperty.call(specialSchedules, dateKey)) return specialSchedules[dateKey];
	return getRegularScheduleForDate(date);
}

function getSpecialDayType(date) {
	const dateKey = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
	const dayType = specialDayTypes[dateKey];
	if (!dayType) return undefined;
	const localizedDayType = isSpanishEnabled() ? specialDayTypesSpanish[dateKey] : dayType;

	const specialTimes = Object.values(specialSchedules[dateKey] || {});
	if (specialTimes.length === 0) return localizedDayType;

	const currentMinutes = date.getHours() * 60 + date.getMinutes();
	const isWithinSpecialTime = specialTimes.some(time => {
		const [start, end] = time.split("-").map(value => {
			const [hours, minutes] = value.split(":").map(Number);
			return hours * 60 + minutes;
		});
		return currentMinutes >= start && currentMinutes <= end;
	});

	return isWithinSpecialTime ? localizedDayType : undefined;
}

var oshSchedules = loadMainSchedule();
var periodTextMaps = loadPeriodTextMap();
var periodTextMap = periodTextMaps.english;
var periodTextSpanishMap = periodTextMaps.spanish;
var specialDayTypes = {};
var specialDayTypesSpanish = {};
var normalScheduleDates = {};
var specialSchedules = loadSpecialSchedules();
var neenSchedules = oshSchedules;
