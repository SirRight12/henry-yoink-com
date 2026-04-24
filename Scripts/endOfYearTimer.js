const counter = document.getElementById("count-text")
let counterMode = 0 //0 = days, 1 = hours
function calculateTimeToEndHours() {  
  const dif = new Date("May 30, 2026 15:25:00").getTime() - Date.now()
  const date = new Date().setTime(dif)

  const hours = ((dif / 1000) / 3600)
  const hoursFract = (hours - Math.floor(hours))
  const minutes = (hoursFract) * 60
  const minutesFract = minutes - Math.floor(minutes)
  const seconds = (minutesFract) * 60

  const hour = Math.floor(hours)
  const minute = Math.floor(minutes)
  const second = Math.floor(seconds)

  const time = `${hour}:${minute}:${second}<br>Until the end of the year`
  counter.innerHTML = time
}
function calculateTimeToEndDays() {
  const dif = new Date("May 30, 2026 15:25:00").getTime() - Date.now()
  const date = new Date().setTime(dif)

  const days = ((dif / 1000) / (3600*24))
  const daysFract = (days - Math.floor(days))
  const hours = (daysFract * 24)
  const hoursFract = (hours - Math.floor(hours))
  const minutes = (hoursFract) * 60
  const minutesFract = minutes - Math.floor(minutes)
  const seconds = (minutesFract) * 60

  const hour = Math.floor(hours)
  const minute = Math.floor(minutes)
  const second = Math.floor(seconds)

  const time = `${days} days and ${hour}:${minute}:${second} hours<br>Until the end of the year`
  counter.innerHTML = time
}
function calculateTimeToEnd(){
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
setInterval(calculateTimeToEnd,1000/3)

counter.onclick = () => {
  //toggle days to hours and visa-versa
  if (counterMode == 0) {
    counterMode = 1
  } else if (counterMode == 1) {
    counterMode = 0
  }
}