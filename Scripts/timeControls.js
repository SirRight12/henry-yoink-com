try {

    let time = timeControls()
    let hTime = hTimeControls()
let current = 1
function changeTimeControl(element) {
    if (element.value == "Classic") {
        current = 1
    } else if (element.value == "Milliseconds") {
        current = 2
    } else {
        element.value = "Classic"
        current = 1
    }
}
function useTimeControl(controller) {
    try {
    // if (!isInsideSchool()) return
    if (controller == 1) {
        hTime()
    } else if (controller == 2) {
        time()
    } else {
        hTime()
    }
    } catch (err) {
        con.innerHTML = err
    }
}
//Parse Time
function PT(TimeString) {
    let [startTime,endTime] = TimeString.split("-")
    
    let [startHr,startMin] = startTime.split(":")
    let [endHr,endMin] = endTime.split(":")
    const start = new Date()
    start.setHours(startHr,startMin,0,0)
    const end = new Date()
    end.setHours(endHr,endMin,0,0)
    return [start,end]
}
    
    
function isInsideSchool() {
    let times = oshSchedules[getDay()]
    let lastPeriod = times[Object.keys(times)[Object.keys(times).length - 1]]
    const [start,end] = PT(lastPeriod)
    const now = new Date()
    if (now < end) return true
    return false
}
function timer() {
    // hTime()
    useTimeControl(current)
    // con.innerHTML = "hi "
}
timer()
setInterval(timer,0)
} catch (err) {
    con.innerHTML = err
}
