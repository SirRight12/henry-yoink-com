const scheduleFile = "Databases Local/MainSchedule.csv";
const specialScheduleFile = "Databases Local/SpecialScheduleDays.csv";
const periodTextFile = "Databases Local/PeriodText.csv";

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

	const rows = loadDatabaseText(scheduleFile, "mainSchedule")
		.split(/\r?\n/)
		.map(row => row.trim())
		.filter(Boolean);

	for (const row of rows) {
		const columns = row.includes("\t")
			? row.split("\t").map(value => value.trim())
			: parseDelimitedRow(row);
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
	const rows = loadDatabaseText(periodTextFile, "periodText")
		.split(/\r?\n/)
		.map(row => row.trim())
		.filter(Boolean);

	for (const row of rows) {
		const [code, text] = parseDelimitedRow(row);
		if (!code || !text || code === "Code") continue;
		periodText[code.toUpperCase()] = text;
	}

	return periodText;
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
		.filter(Boolean);

	for (const row of rows) {
		const [name, , , dates, period, start, end, dayType] = parseDelimitedRow(row);
		if (!dates || name === "Name") continue;

		for (const dateKey of expandScheduleDates(dates)) {
			if (name) {
				specialDayTypes[dateKey] = name;
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

	const specialTimes = Object.values(specialSchedules[dateKey] || {});
	if (specialTimes.length === 0) return dayType;

	const currentMinutes = date.getHours() * 60 + date.getMinutes();
	const isWithinSpecialTime = specialTimes.some(time => {
		const [start, end] = time.split("-").map(value => {
			const [hours, minutes] = value.split(":").map(Number);
			return hours * 60 + minutes;
		});
		return currentMinutes >= start && currentMinutes <= end;
	});

	return isWithinSpecialTime ? dayType : undefined;
}

var oshSchedules = loadMainSchedule();
var periodTextMap = loadPeriodTextMap();
var specialDayTypes = {};
var normalScheduleDates = {};
var specialSchedules = loadSpecialSchedules();
var neenSchedules = oshSchedules;
