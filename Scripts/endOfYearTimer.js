const counter = document.getElementById("count-text")
const countDown = document.getElementById("count-down")
let counterMode = 0 //0 = days, 1 = hours
let csvText = "";
// 1. Fetches CSV text and finds the row index
async function findRowIndexFromServer(filePath) {
  csvText = loadDatabaseText(filePath.endsWith('.csv') ? filePath : `${filePath}.csv`, "countdown");
  const rows = csvText.replace(/\r/g, "").split('\n').filter(r => r.trim());
    return rows.findIndex(r => r.split(',')[0].trim() === String(window.selectedCSVOption).trim());
}

// 2. Returns a column value based on row index
function getColumnValue(csvText, rowIndex, columnIndex) {
    if (!csvText || rowIndex === -1) return null;
    const rows = csvText.replace(/\r/g, "").split('\n').filter(r => r.trim());
  return rows[rowIndex]?.split(',')[columnIndex]?.replace(/^"|"$/g, "").trim() || null;
}

function getFirstColumnValue(csvText, rowIndex) {
  return getColumnValue(csvText, rowIndex, 0);
}

function displayCountdown(time, value) {
  counter.classList.toggle("compact", value.length > 18);
  counter.classList.toggle("very-compact", value.length > 28);
  counter.innerHTML = time;
}

async function getSelectedCountdown() {
  const index = await findRowIndexFromServer("Databases Local/CountDownToDate.csv");
  const dateValue = getColumnValue(csvText, index, 3);
  const timeValue = getColumnValue(csvText, index, 4);
  const selectedRow = csvText.replace(/\r/g, "").split('\n').filter(r => r.trim())[index];
  const selectedColumns = selectedRow ? parseDelimitedRow(selectedRow) : [];
  const targetDate = dateValue && timeValue ? new Date(`${dateValue} ${timeValue}`) : null;

  if (!targetDate || Number.isNaN(targetDate.getTime())) {
    return null;
  }

  return {
    date: targetDate,
    value: getLocalizedCsvValue(selectedColumns, 0, 5) || "Select a countdown"
  };
}
async function calculateTimeToEndHours() {  
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
  const time = `${hour}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}<br>${value}`;
  displayCountdown(time, value);

}
async function calculateTimeToEndDays() {
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
  const time = `${day} days and ${hour}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")} hours<br>${value}`;
  displayCountdown(time, value);
}
function calculateTimeToEnd(){
  const hasSelection = Boolean(String(window.selectedCSVOption || "").trim())
  countDown.style.display = hasSelection ? "" : "none"
  if (!hasSelection) {
    return
  }

  switch (counterMode) {
    case 0:
      calculateTimeToEndDays()
      break
    case 1:
      calculateTimeToEndHours()
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
}