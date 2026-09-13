const counter = document.getElementById("count-text")
const countDown = document.getElementById("count-down")
let counterMode = 0 //0 = days, 1 = hours
let csvText = "";
let countdownRequestId = 0;
let lastDisplayedCountdown = "";
let selectedCountdownCacheKey = "";
let selectedCountdownCache = null;
let millisecondAnimationFrame = 0;
// 1. Fetches CSV text and finds the row index
async function findRowIndexFromServer(filePath) {
  csvText = loadDatabaseText(filePath.endsWith('.csv') ? filePath : `${filePath}.csv`, "countdown");
  const rows = csvText.replace(/\r/g, "").split('\n').filter(r => r.trim()).map(parseDelimitedRow).filter(rowMatchesSelectedSchedule);
  return rows.findIndex(columns => columns[0]?.trim() === String(window.selectedCSVOption).trim());
}

// 2. Returns a column value based on row index
function getColumnValue(csvText, rowIndex, columnIndex) {
    if (!csvText || rowIndex === -1) return null;
    const rows = csvText.replace(/\r/g, "").split('\n').filter(r => r.trim()).map(parseDelimitedRow).filter(rowMatchesSelectedSchedule);
  return rows[rowIndex]?.[columnIndex]?.replace(/^"|"$/g, "").trim() || null;
}

function getFirstColumnValue(csvText, rowIndex) {
  return getColumnValue(csvText, rowIndex, 0);
}

function displayCountdown(time, value) {
  const displayKey = `${time}|${value}`;
  if (displayKey === lastDisplayedCountdown) return;
  lastDisplayedCountdown = displayKey;
  counter.classList.toggle("compact", value.length > 18);
  counter.classList.toggle("very-compact", value.length > 28);
  counter.innerHTML = time;
}

function stopMillisecondAnimation() {
  if (!millisecondAnimationFrame) return;
  cancelAnimationFrame(millisecondAnimationFrame);
  millisecondAnimationFrame = 0;
}

function animateCountdownMilliseconds(targetDate) {
  stopMillisecondAnimation();
  const millisecondPart = counter.querySelector(".countdown-milliseconds");
  if (!millisecondPart) return;

  const renderMilliseconds = () => {
    const remaining = Math.max(0, targetDate.getTime() - Date.now());
    millisecondPart.textContent = `.${String(remaining % 1000).padStart(3, "0")}`;
    millisecondAnimationFrame = requestAnimationFrame(renderMilliseconds);
  };
  renderMilliseconds();
}

async function getSelectedCountdown() {
  const cacheKey = `${window.selectedCSVOption}|${isSpanishEnabled()}`;
  if (cacheKey === selectedCountdownCacheKey) return selectedCountdownCache;

  const index = await findRowIndexFromServer("data/CountDownToDate.csv");
  const dateValue = getColumnValue(csvText, index, 3);
  const timeValue = getColumnValue(csvText, index, 4);
  const selectedRow = csvText.replace(/\r/g, "").split('\n').filter(r => r.trim()).map(parseDelimitedRow).filter(rowMatchesSelectedSchedule)[index];
  const selectedColumns = selectedRow || [];
  const targetDate = dateValue && timeValue ? new Date(`${dateValue} ${timeValue}`) : null;

  if (!targetDate || Number.isNaN(targetDate.getTime())) {
    selectedCountdownCacheKey = cacheKey;
    selectedCountdownCache = null;
    return null;
  }

  selectedCountdownCacheKey = cacheKey;
  selectedCountdownCache = {
    date: targetDate,
    value: getLocalizedCsvValue(selectedColumns, 0, 5) || "Select a countdown"
  };
  return selectedCountdownCache;
}
async function calculateTimeToEndHours(requestId) {  
  const selectedCountdown = await getSelectedCountdown()
  if (!selectedCountdown) return

  const dif = selectedCountdown.date.getTime() - Date.now()
  const date = new Date().setTime(dif)

  const hours = ((dif / 1000) / 3600)
  const hoursFract = (hours - Math.floor(hours))
  const minutes = (hoursFract) * 60
  const minutesFract = minutes - Math.floor(minutes)
  const seconds = (minutesFract) * 60

  const hour = Math.floor(hours)
  const minute = Math.floor(minutes)
  const second = Math.floor(seconds)

  const value = selectedCountdown.value;
  if (requestId !== countdownRequestId) return;
  const time = `${hour}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}<br>${value}`;
  displayCountdown(time, value);

}
async function calculateTimeToEndDays(requestId) {
  const selectedCountdown = await getSelectedCountdown()
  if (!selectedCountdown) return

  const dif = selectedCountdown.date.getTime() - Date.now()
  const date = new Date().setTime(dif)

  const days = ((dif / 1000) / (3600*24))
  const daysFract = (days - Math.floor(days))
  const hours = (daysFract * 24)
  const hoursFract = (hours - Math.floor(hours))
  const minutes = (hoursFract) * 60
  const minutesFract = minutes - Math.floor(minutes)
  const seconds = (minutesFract) * 60

  const day = Math.floor(days)
  const hour = Math.floor(hours)
  const minute = Math.floor(minutes)
  const second = Math.floor(seconds)

  const value = selectedCountdown.value;
  if (requestId !== countdownRequestId) return;
  const time = isSpanishEnabled()
    ? `${day} días y ${hour}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")} horas<br>${value}`
    : `${day} days and ${hour}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")} hours<br>${value}`;
  displayCountdown(time, value);
}
async function calculateTimeToEndMilliseconds(requestId) {
  const selectedCountdown = await getSelectedCountdown();
  if (!selectedCountdown) return;

  const difference = selectedCountdown.date.getTime() - Date.now();
  const totalMilliseconds = Math.max(0, difference);
  const days = Math.floor(totalMilliseconds / 86400000);
  const totalHours = Math.floor(totalMilliseconds / 3600000);
  const hours = Math.floor((totalMilliseconds % 86400000) / 3600000);
  const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
  const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
  const milliseconds = totalMilliseconds % 1000;

  const value = selectedCountdown.value;
  if (requestId !== countdownRequestId) return;
  const clock = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}<span class="countdown-milliseconds">.${milliseconds.toString().padStart(3, "0")}</span>`;
  const totalHoursClock = `${totalHours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}<span class="countdown-milliseconds">.${milliseconds.toString().padStart(3, "0")}</span>`;
  const displayedClock = counterMode === 1 ? totalHoursClock : clock;
  const time = isSpanishEnabled()
    ? counterMode === 1 ? `${displayedClock} horas<br>${value}` : `${days} días y ${displayedClock} horas<br>${value}`
    : counterMode === 1 ? `${displayedClock} hours<br>${value}` : `${days} days and ${displayedClock} hours<br>${value}`;
  displayCountdown(time, value);
  animateCountdownMilliseconds(selectedCountdown.date);
}
function calculateTimeToEnd(){
  const requestId = ++countdownRequestId;
  const hasSelection = Boolean(String(window.selectedCSVOption || "").trim())
  countDown.style.display = hasSelection ? "" : "none"
  if (!hasSelection) {
    stopMillisecondAnimation();
    return
  }

  if (window.timeControlMode === 2) {
    calculateTimeToEndMilliseconds(requestId);
    return;
  }

  stopMillisecondAnimation();

  switch (counterMode) {
    case 0:
      calculateTimeToEndDays(requestId)
      break
    case 1:
      calculateTimeToEndHours(requestId)
  }
}
function formatTime(num) {
  if (num < 10) {
    return num
  }
  return "0" + parseString(num)

}

counter.onclick = () => {
  //toggle days to hours and visa-versa
  if (counterMode == 0) {
    counterMode = 1
  } else if (counterMode == 1) {
    counterMode = 0
  }
  counter.classList.remove("mode-change");
  void counter.offsetWidth;
  counter.classList.add("mode-change");
  calculateTimeToEnd()
}