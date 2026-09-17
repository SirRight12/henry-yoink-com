class Schedule {
    constructor (sc={
        mwth: new MWTH(),
        tf: new TF(),
        //plc: new PLC(),
    }) {
        this.mwth = sc["mwth"]
        this.tf = sc["tf"]
        //this.plc = sc["plc"]
    }
    getCurrentWeekDay() {
        const date = new Date()
        const day = date.getDay()
        switch (day) {
            case 1:
            case 3:
            case 4:
             return "mwth"
            case 2:
            case 5:
                return "tf"
            default: 
                return false
        }
    }
    getCurrentPlace() {
        const date = new Date()
        const day = date.getDay()
        switch (day) {
            case 1:
            case 3:
            case 4:
             return this.handleDay("mwth")
            case 2:
            case 5:
                return this.handleDay("tf")
            default: 
                return false
        }
    }
    getTimeToEnd(currPlace) {
        if (!currPlace) currPlace = this.getCurrentWeekDay()
        let found = false
        const days = this[currPlace]
        let foundPlace;

        for (let x in days) {
            const period = days[x]
            if (!period.isPeriod()) continue
            found = true
            const displayTime = new Date()
            displayTime.setTime(period.distanceTo())
            return period.distanceTo()
        }
    }
    getCurrentPeriod() {
        
    }
    handleDay(place) {
        const days = this[place]
        if (!days) return 'Sorry I did dumb'
        let found = false
        let foundPlace
        for (let x in days) {
            const period = days[x]
            if (!period.isPeriod()) continue
            found = true
            foundPlace = period.room
            break;
        }
        if (!found) {
            if (!this.isSchoolHours()) return "Dumb has been did, sorry"
            return "Passing Period"
        }
        return foundPlace

    }
    isSchoolHours() {
        const start = new Date()
        start.setHours(7)
        const end = new Date()
        end.setHours(15,20)
        const now = new Date()
        const x = now.getTime()
        const a = start.getTime()
        const b = end.getTime()
        return x <=  b && x >= a
    }
}
class MWTH {
    constructor (dondeEstas={
        zh: "nowhere",
        hh: "nowhere",
        p1: "nowhere",
        p2: "nowhere",
        p3: "nowhere",
        p4: "nowhere",
        p5: "nowhere",
        lu: "nowhere",
        p6: "nowhere",
        p7: "nowhere",
        p8: "nowhere",
    }) {
        this.zh = new zeroHour(dondeEstas["zh"]),
        this.hh = new hHour(dondeEstas['hh']),
        this.p1 = new firPeriod(dondeEstas['p1']),
        this.p2 = new secPeriod(dondeEstas['p2']),
        this.p3 = new thiPeriod(dondeEstas['p3']),
        this.p4 = new fouPeriod(dondeEstas['p4']),
        this.p5 = new fifPeriod(dondeEstas['p5']),
        this.lu = new lunchM(dondeEstas['lu']),
        this.p6 = new sixPeriod(dondeEstas['p6']),
        this.p7 = new sevPeriod(dondeEstas['p7']),
        this.p8 = new eigPeriod(dondeEstas['p8'])
    }
}
class TF {
    constructor (dondeEstas={
        zh: "nowhere",
        ch: "nowhere",
        p1: "nowhere",
        p2: "nowhere",
        p3: "nowhere",
        p4: "nowhere",
        p5: "nowhere",
        lu: "nowhere",
        p6: "nowhere",
        p7: "nowhere",
        p8: "nowhere",
    }) {
        this.zh = new zeroHour(dondeEstas["zh"]),
        this.hh = new Chapel(dondeEstas['hh']),
        this.p1 = new firPeriodF(dondeEstas['p1']),
        this.p2 = new secPeriodF(dondeEstas['p2']),
        this.p3 = new thiPeriodF(dondeEstas['p3']),
        this.p4 = new fouPeriodF(dondeEstas['p4']),
        this.p5 = new fifPeriodF(dondeEstas['p5']),
        this.lu = new lunchF(dondeEstas['lu']),
        this.p6 = new sixPeriodF(dondeEstas['p6']),
        this.p7 = new sevPeriodF(dondeEstas['p7']),
        this.p8 = new eigPeriodF(dondeEstas['p8'])
    }
}
/*
class PLC {
    constructor (dondeEstas={
        zh: "nowhere",
        ch: "nowhere",
        p1: "nowhere",
        p2: "nowhere",
        p3: "nowhere",
        p4: "nowhere",
        p5: "nowhere",
        lu: "nowhere",
        p7: "nowhere",
    }) {
        this.zh = new zeroHour(dondeEstas["zh"])
        this.p1 = new firPeriodW(dondeEstas['p1'])
        this.p2 = new secPeriodW(dondeEstas['p2'])
        this.p3 = new thiPeriodW(dondeEstas['p3'])
        this.p4 = new fouPeriodW(dondeEstas['p4'])
        this.p5 = new fifPeriodW(dondeEstas['p5'])
        this.lu = new lunchW(dondeEstas['lu'])
        this.p7 = new sevPeriodW(dondeEstas['p7'])
    }
}
*/
class Period {
    constructor(start= new Time(1),end=new Time(2),id="1") {
      this.startTime = start
      this.endTime = end
      this.id = id
    }
    updateDate() {
        const start = this.startTime
        const end = this.endTime
        this.start = new Date()
        this.start.setHours(start.hours,start.minutes)
        this.end = new Date()
        this.end.setHours(end.hours,end.minutes)
    }
    distanceTo() {
        this.updateDate()
        if (this.isPeriod()) {
            const x = new Date().getTime()
            const b = this.end.getTime()
            const dif = b - x
            const c = new Date()
            c.setHours(0,0)
            c.setMinutes(c.getMinutes(),60 - c.getSeconds())
            const time = c.getTime() + dif
            const newTime = new Date()
            newTime.setTime(time)
            let mins = newTime.getMinutes()
            mins -= 1
            if (mins < 10) {
                if (mins < 0) mins = 0
                mins = "0" + mins
            }
            return `${newTime.getHours()}:${mins}:${newTime.getSeconds()}`
        } else {
            const x = new Date().getTime()
            const b = this.start.getTime()
            const dif = b - x
            const c = new Date()
            c.setHours(0,0)
            c.setMinutes(c.getMinutes(),60 - c.getSeconds())
            const time = c.getTime() + dif
            const newTime = new Date()
            newTime.setTime(time)
            let mins = newTime.getMinutes()
            mins -= 1
            if (mins < 10) {
                if (mins < 0) mins = 0
                mins = "0" + mins
            }
            return `${newTime.getHours()}:${mins}:${newTime.getSeconds()}`
        }
    }
    isPeriod() {
        this.updateDate()
        const x = new Date().getTime()
        const a = this.start.getTime()
        const b = this.end.getTime()
        return x <= Math.max(a, b) && x >= Math.min(a, b)
    }
}
class Time {
    constructor(hours=1,minutes=0) {
        this.hours = hours
        this.minutes = minutes
    }
}
class zeroHour extends Period {
    constructor (room) {
        super(new Time(7),new Time(7,45),"-1")
        this.room = room
    }
}
class hHour extends Period {
    constructor (room) {
        super(new Time(8,20),new Time(8,31),"0")
        this.room = room
    }
}
class firPeriod extends Period {
    constructor (room) {
        super(new Time(8,35),new Time(9,18),"1")
        this.room = room
    }
}
class secPeriod extends Period {
    constructor (room) {
        super(new Time(9,22),new Time(10,5),"2")
        this.room = room
    }
}
class thiPeriod extends Period {
    constructor (room) {
        super(new Time(10,9),new Time(10,52),"3")
        this.room = room
    }
}
class fouPeriod extends Period {
    constructor (room) {
        super(new Time(10,56),new Time(11,39),"4")
        this.room = room
    }
}
class fifPeriod extends Period {
    constructor (room) {
        super(new Time(11,43),new Time(12,26),"5")
        this.room = room
    }
}
class lunchM extends Period {
    constructor (room) {
        super(new Time(12,26),new Time(12,59),"lu")
        this.room = room
    }
}
class sixPeriod extends Period {
    constructor (room) {
        super(new Time(13,3),new Time(13,46),"lu")
        this.room = room
    }
}
class sevPeriod extends Period {
    constructor (room) {
        super(new Time(13,50),new Time(14,33),"7")
        this.room = room
    }
}
class eigPeriod extends Period {
    constructor (room) {
        super(new Time(14,37),new Time(15,20),"8")
        this.room = room
    }
}



class Chapel extends Period {
    constructor (room) {
        super(new Time(8,20),new Time(9,0),"0")
        this.room = room
    }
}
class firPeriodF extends Period {
    constructor (room) {
        super(new Time(9,4),new Time(9,43),"1")
        this.room = room
    }
}
class secPeriodF extends Period {
    constructor (room) {
        super(new Time(9,47),new Time(10,27),"2")
        this.room = room
    }
}
class thiPeriodF extends Period {
    constructor (room) {
        super(new Time(10,31),new Time(11,11),"3")
        this.room = room
    }
}
class fouPeriodF extends Period {
    constructor (room) {
        super(new Time(11,15),new Time(11,55),"4")
        this.room = room
    }
}
class fifPeriodF extends Period {
    constructor (room) {
        super(new Time(11,59),new Time(12,39),"5")
        this.room = room
    }
}
class lunchF extends Period {
    constructor (room) {
        super(new Time(12,39),new Time(13,9),"lu")
        this.room = room
    }
}
class sixPeriodF extends Period {
    constructor (room) {
        super(new Time(13,13),new Time(13,52),"lu")
        this.room = room
    }
}
class sevPeriodF extends Period {
    constructor (room) {
        super(new Time(13,56),new Time(14,36),"7")
        this.room = room
    }
}
class eigPeriodF extends Period {
    constructor (room) {
        super(new Time(14,40),new Time(15,20),"8")
        this.room = room
    }
}



const teachers = {
    
}

function addOpt(name) {
    const teacherSelect = document.getElementById("teachers")
    const opt = document.createElement("option")
    opt.innerHTML = name
    teacherSelect.appendChild(opt)
}
function makeTeacher(name,schedule={
    "mwth": {
        zh: "nowhere",
        hh: "nowhere",
        p1: "nowhere",
        p2: "nowhere",
        p3: "nowhere",
        p4: "nowhere",
        p5: "nowhere",
        lu: "nowhere",
        p6: "nowhere",
        p7: "nowhere",
        p8: "nowhere",
    },
    "tf": {
        zh: "nowhere",
        ch: "nowhere",
        p1: "nowhere",
        p2: "nowhere",
        p3: "nowhere",
        p4: "nowhere",
        p5: "nowhere",
        lu: "nowhere",
        p6: "nowhere",
        p7: "nowhere",
        p8: "nowhere",
    }
}) {
    teachers[name] = {
        schedule: new Schedule({
            mwth: new MWTH(schedule["mwth"]),
            tf: new TF(schedule['tf']),
        })
    }
}