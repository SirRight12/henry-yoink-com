const counter = document.getElementById("count-text")
function calculateTimeToEnd() {  
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
function formatTime(num) {
  if (num < 10) {
    return num
  }
  return "0" + parseString(num)

}
setInterval(calculateTimeToEnd,1000/3)

