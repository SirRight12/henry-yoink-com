//TODO add passing periods
function getDay() {
    let nowThing = new Date()

    let dateText = (nowThing.getMonth() + 1) + "/" + nowThing.getDate() + "/" + nowThing.getFullYear() 
    if (oshSchedules[dateText]) return dateText
const day = new Date().getDay()
switch(day) {
    case 1:
    case 3:
    case 4:
        return "mwth"
    case 2:
        return "t"
    case 5:
        return "f"
}
}
function timeControls() {
    const text = document.getElementById("prompt")

    const title = document.getElementById("title")
    text.innerHTML = "No WiFi, clown"
    
let times = getTimes()
function getTimes() {
    return addPassings(oshSchedules[getDay()])
}

function addPassings(times) {
    let prevTime = false
    let newTimes = []
    for (let period in times) {
        if (!prevTime) {
            prevTime = period
            continue
        }
        newTimes["P" + period] = `${times[prevTime].split("-")[1]}-${times[period].split("-")[0]}`
        newTimes[period] = times[period]
    }
    return times
}
function ParseTime(TimeString) {
    let [startTime,endTime] = TimeString.split("-")
    
    let [startHr,startMin] = startTime.split(":")
    let [endHr,endMin] = endTime.split(":")
    const start = new Date()
    start.setHours(startHr,startMin,0,0)
    const end = new Date()
    end.setHours(endHr,endMin,0,0)
    return [start,end]
}
function IsNow(TimeString) {
    if (!TimeString)  {
        // console.warn("Not a string lol")
        return false
    }
    const now = new Date()
    const [start,end] = ParseTime(TimeString)
    if (now > start && now < end) return true
    return false
}
function getTimeTo(TimeString) {
    const now = new Date()
    const [start,end] = ParseTime(TimeString)
    const difference = end - now
    const milliseconds = Math.floor(difference)
    const seconds = Math.floor(difference / 1000)
    const minutes = Math.floor(difference / (1000 * 60))
    const hours = Math.floor(difference / (1000 * 60 * 60))

    return [hours % 24,minutes % 60,seconds % 60,milliseconds % 1000]
}
let suggestedPeriod = false
function getSuggestedPeriod() {
    for (let period in times) {
        if (IsNow(times[period])) return period
    }
    return false
}
let tries = 0
let broke = false
function loop() {
    if (!suggestedPeriod) suggestedPeriod = getSuggestedPeriod()

    let now = IsNow(times[suggestedPeriod])

    if (!now) {
        suggestedPeriod = false
        times = getTimes()
        if (tries >= 10 || broke) {
            broke = true
            // clearInterval(interval)
            title.innerText = "Bork"
            text.dataset.before = "Nothing to see here"
            text.dataset.after = "Move along"
            text.innerText = "Bozo Clown"
            
            return
        }
        broke = false
        tries += 1
        return
    }
    tries = 0
    const time = getTimeTo(times[suggestedPeriod])
    titleUpdate(time)
    displayTime()
}
function FormatTime(Time) {
    let [hrs,mins,secs,mils] = Time
    if (mins < 10 && hrs > 0) {
        mins = "0" + mins
    }
    let unit = ""
    if (mils < 100) {
        mils = "0" + mils
    }
    if (mils < 10) {
        mils = "0" + mils
    }
    if (secs < 10) {
        secs = "0" + secs
    }
    if (hrs <= 0) {
        hrs = ""
        unit = ""
    } else {
        hrs = hrs + ":"
    }
    return [hrs,mins,secs,mils,unit]
}
function getPeriodFig(period) {
    switch (period) {
        case "BD":
            return "Coach Groups starts"
        case "BC":
            return "Chapel starts"
        case "BH":
            return "Homeroom starts"
        case "C":
            return "Chapel ends"
        case "D":
            return "Coach Groups ends"
        case "L":
            return "Lunch ends"
        case "P1":
            return "1st Period Starts"
        case "1":
            return "1st Period ends"
        case "P2":
            return "2nd Period starts"
        case "2":
            return "2nd Period ends"
        case "P3":
            return "3rd Period starts"
        case "3":
            return "3rd Period ends"
        case "P4":
            return "4th Period starts"
        case "4":
            return "4th Period ends"
        case "P5":
            return "5th Period starts"
        case "5":
            return "5th Period ends"
        case "P6":
            return "6th Period starts"
        case "6":
            return "6th Period ends"
        case "P7":
            return "7th Period starts"
        case "7":
            return "7th Period ends"
        case "P8":
            return "8th Period starts"
        case "8":
            return "8th Period ends"
        default:
            return "Period figure not planned for, please yell at sam to add " + '"' + period + '"'
    }
}
function displayTime(Time) {
    let [hrs,mins,secs,mils,unit] = FormatTime(Time)
    text.dataset.before = "You Have"
    text.innerText = `${hrs}${mins}:${secs}:${mils} ${unit}`
    text.dataset.after = `Until ${getPeriodFig(suggestedPeriod)}`
}
function titleUpdate(time) {
    if (!times[suggestedPeriod]) return
    const [hrs,mins,secs] = time
    
    title.innerText = `${hrs}${mins}:${secs}`
}
// let interval = setInterval(titleUpdate,100)
titleUpdate()
return loop
}
