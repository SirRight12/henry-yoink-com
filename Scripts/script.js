
const presets = {
    "Coolest": {
        "bg": "#000000",
        "nb": "#000000",
        "fc": "#ffffff",
        "fn": "Minecraft",
        "no": 1,
    },
    "Christopher": {
        "bg": "#ffff00",
        "nb": "#0000ff",
        "fc": "#0000ff",
        "fn": "Enchanting",
        "no": 1,
    },
    "Isaiah": {
        "bg": "#000000",
        "nb": "#e7c104",
        "fc": "#ffffff",
        "fn": "LOTR",
        "no": 1,
    },
    "EnchantingTable": {
      "bg": "#0b0029",
      "nb":"#8a6500",
      "fc": "#00c795",
      "fn": "Enchanting",
      "no": 1,
    },
    "Christmas": {
        "bg": 'red',
        "nb" : "green",
        "fc": "green",
        "fn": "Christmas",
        "ic": "red",
        "no": 1,
    },
    "Peanuts": {
        'bg': 'black',
        'nb': 'black',
        "fc": 'black',
        'fn': 'Christmas',
        'ic': 'green',
        'bi': getFile('Peanuts.gif'),
        "ss": "cover",
        "cw": 100,
        "rs": "no-repeat",
        'no': 0,
    },
    "ChristmasM": {
        "bg": 'black',
        'nb': 'green',
        "fc": 'red',
        'fn': 'Christmas',
        'ic': 'white',
        'bi': getFile('mdawg.jpg'),
        'ss': 'custom',
        'cw': 33,
        'rs': 'repeat',
        'no': 1,
    },
    "Mason": {
        "bg": "black",
        "nb" : "black",
        "fc": "rgb(138,0,0)",
        "fn": "Demon",
        "ic": "rgb(138,0,0)",
        "no": 1,
    },
    'Cyrus': {
        "bg": 'black',
        'nb': 'black',
        'fc': 'white',
        'no': 0,
        'fn': 'Enchanting',
        'ic': 'white',
        'bi': getFile('cyrus.png'),
        "ss": "cover",
        "cw": 100,
        "rs": "no-repeat",
    },
    'Navy': {
        'bg': 'black',
        'nb': 'black',
        'fc': 'white',
        'no': 0,
        'fn': 'Default',
        'ss': 'contain',
        'bi': getFile('navy.png'),
        'rs': 'no-repeat',
        'ic': 'white',
    },
    "Kenzie": {
        "bg": "rgb(249,128,171)",
        "nb": "rgb(255,36,112)",
        "fc": "rgb(255,36,112)",
        "fn": "Default",
        "ic": "rgb(249,128,171)",
        "no": 1,
    },
    "RX-7": {
        "bg": "black",
        "nb": "black",
        "bi": getFile('rx-7.gif'), 
        "ic": "white",
        "fc": "white",
        "fn": "Enchanting",
        "ss": "cover",
        "cw": 100,
        "rs": "no-repeat",
        "no": 0,
    },
    "Bill": {
        "bg": "black",
        "nb": "black",
        "bi": getFile('bill.gif'), 
        "ic": "white",
        "fc": "white",
        "fn": "Enchanting",
        "ss": "cover",
        "rs": "no-repeat",
        "no": 0,
    },
    "Blueberry": {
        "bg": "black",
        "nb": "black",
        "bi": getFile('blueberry.png'), 
        "ic": "black",
        "fc": "white",
        "fn": "Gameboy",
        "no": 0,
        "ss": 'custom',
        'cw': 3,
        'rs': 'repeat',

    }

}
const con = document.getElementById("sub-console")
const sText = document.getElementById("prompt")
const actualNavBar = document.querySelector("#navbar.navbar")
let isAutoUpdBg = false
let isAutoUpdText = false
let isAutoUpdNav = false
let isAutoUpdIco = false
const setTexts = document.getElementsByClassName("setText")
const settingsMenu = document.getElementById("settingsMenu")
let fontName = ""
let colorBG = ""
let colorNavBar = ""
let colorIcon = ""
let colorFont = ""
function autoUpd(element) {
    isAutoUpdBg = true
    document.body.style.transitionDuration = "100ms"
    for (let x = 0; x < setTexts.length; x++) {
        const t = setTexts[x]
        t.style.color = element.value
    }
    requestAnimationFrame(anim)
    colorBG = element.value
    function anim() {
        if (!isAutoUpdBg) return
        requestAnimationFrame(anim)
        settingsMenu.style.backgroundColor = element.value
        document.body.style.backgroundColor = element.value
        colorBG = element.value
        for (let x = 0; x < setTexts.length; x++) {
            const t = setTexts[x]
            t.style.color = element.value
        }
    }
}
function changePreset(element) {
    const val = element.value
    if (val == "None") {
        loadBGColor()
        loadFont()
        loadNavColor()
        loadTextColor()
        loadBGColor()
    }
    usePreset(val)
}
function changeFont(element) {
    const val = element.value
    sText.className = val
    fontName = val
    localStorage['font'] = val
}
async function loadFont() {
    const font = localStorage['font']
    sText.className = font
    fontName = font
    const option = document.getElementById("fonts")
    await loadSavedFonts()
    option.value = font
}
function cancelUpd() {
    saveBGColor()
    isAutoUpdBg = false
    document.body.style.transitionDuration = "350ms"
}   
function autoUpdText(element) {
    isAutoUpdText = true
    sText.style.transitionDuration = "100ms"
    requestAnimationFrame(anim)
    function anim() {
        if (!isAutoUpdText) return
        requestAnimationFrame(anim)
        colorFont = element.value
        sText.style.color = element.value
    }
}
function cancelUpdText() {
    saveTextColor()
    isAutoUpdText = false
    sText.style.transitionDuration = "350ms"
}
function autoUpdNavbar(element) {
    isAutoUpdText = true
    actualNavBar.style.transitionDuration = "100ms"
    requestAnimationFrame(anim)
    function anim() {
        if (!isAutoUpdText) return
        requestAnimationFrame(anim)
        colorNavBar = element.value
        actualNavBar.style.backgroundColor = element.value
        space.style.backgroundColor = element.value
    }
}
function cancelUpdNavBar() {
    saveNavColor()
    isAutoUpdNav = false
    actualNavBar.style.transitionDuration = "350ms"
}
const icon = document.getElementById("allsun")
const icoChanger = document.getElementById("iconcolor")
function autoUpdIconColor(element) {
    isAutoUpdIco = true
    requestAnimationFrame(anim)
    function anim() {
        if (!isAutoUpdIco) return
        requestAnimationFrame(anim)
        setIconColor(element.value)
    }   
}
function setIconColor(val) {
    if (!val) return
    icon.style.color = val
    icon.style.fill = val
    colorIcon = val
}
function cancelUpdIcon() {
    saveIcoColor()
    isAutoUpdIco = false
}
const space = document.getElementById("navbarspace")
function updateBGImage(element) {
    try {
        if (!element) return
        setBGImg(element)
    } catch (err) {
        con.innerHTML = err
    }
}
async function setBGImg(image) {
    const file = image.files[0]
    const b64 = await readFileAsB64(file)
    saveBGImage(b64)
    setBG64(b64)
}
function setBG64(b64) {
    document.body.style.backgroundImage = `url("${b64}")`
}
function clearBGImg() {
    removeBGImg()
    localStorage['bgImage'] = ""
}
function removeBGImg() {
    document.body.style.backgroundImage = 'unset'
}
async function readFileAsB64(file) {
    return new Promise((resolve,reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        let failure = setTimeout(() => {
            reject("Could not read, exceeded 10000ms")
        },10000)
        reader.onload = () => {
            resolve(reader.result)
            clearTimeout(failure)
        }
    })
}
let sizingStyle = "Cover"
let sizingWidth = 100

let repeatingStyle = "no-repeat"
function changeSizingStyle(element) {
    console.log(element.value)
    setSizing(element.value)
    saveImageStyles()
}
const customPos = document.getElementById("custom-position")
function setSizing(val) {
    if (val == "Custom") {
        customPos.style.display = "block"   
        sizingStyle = val
        return
    }
    customPos.style.display = "none"

    document.body.style.backgroundSize = val.toLowerCase()
    sizingStyle = val
}
function setRepeating(val) {
    repeatingStyle = val
    document.body.style.backgroundRepeat = val.toLowerCase()
}
function changeRepeatStyle(element) {
    setRepeating(element.value)
    saveImageStyles()
}
function changeCustomSize() {
    setCustomSize()
    saveImageStyles()

}
const valX = document.getElementById("value-x")
function setCustomSize() {
    let val = `${valX.value}%,1%` 
    sizingWidth = valX.value
    document.body.style.backgroundSize = val
}
let isUpdNavBarOp = false
function updateNbOp(element) {
    isUpdNavBarOp = true
    function anim() {
        if (!isUpdNavBarOp) return
        space.style.opacity = element.value
        actualNavBar.style.opacity = element.value
        requestAnimationFrame(anim)
    }
    anim()
} 
function cancelUpdateNbOp() {
    isAutoUpdNav = false
}
let isInSettings = false
let canClick = true
const mainSettings = document.getElementById("settingsMenu")
function toggleSettings() {
    if (!canClick) return
    canClick = false
    if (!isInSettings) {
        isInSettings = true
        mainSettings.style.animationName = "moveLeft"
        mainSettings.style.animationDuration =  "400ms"
        mainSettings.style.display = "block"
        setTimeout(() => {
            mainSettings.style.right = "0%"
        },10)
    } else {
        isInSettings = false
        mainSettings.style.animationName = "moveRight"
        mainSettings.style.animationDuration =  "400ms"
        setTimeout(() => {
            mainSettings.style.right = "-36.6%"
        },10)
        setTimeout(() => {
            mainSettings.style.display = "none"
        },400)
    }
    setTimeout(() => {
        canClick = true
    },500)
}
bg.addEventListener("blur",cancelUpd)
const textChanger = document.getElementById("textism")
const navbar = document.querySelector("#navbarColor")
textChanger.addEventListener("blur",cancelUpdText)
navbar.addEventListener("blur",cancelUpdNavBar)
icoChanger.addEventListener('blur',cancelUpdIcon)
function saveBGColor() {
    localStorage['bgColor'] = bg.value
}
function saveTextColor() {
    localStorage['textColor'] = textChanger.value
}
function saveNavColor() {
    localStorage['navbar'] = navbar.value
}
function saveIcoColor() {
    localStorage['icon'] = icoChanger.value
}
function saveBGImage(b64) {
    localStorage['bgImage'] = b64
}
function saveImageStyles() {
    localStorage['bgImageSize'] = sizingStyle
    if (sizingStyle == 'Custom') {
        localStorage['bgWidth'] = sizingWidth
    }
    localStorage['bgRepeat'] = repeatingStyle
    console.log(sizingWidth)
}
function loadTextColor() {
    if (!localStorage['textColor']) return
    textChanger.value = localStorage['textColor']
    colorFont = localStorage['textColor']
    autoUpdText(textChanger)
    requestAnimationFrame(cancelUpdText)
}
function loadBGColor() {
    if (!localStorage['bgColor']) return
    bg.value = localStorage['bgColor']
    colorBG = localStorage['bgColor']
    autoUpd(bg)
    requestAnimationFrame(cancelUpd)
}
function loadIcoColor() {
    if (!localStorage['icon']) return
    icoChanger.value = localStorage['icon']
    colorIcon = localStorage['icon']
    setIconColor(localStorage['icon'])
}
function setNavColor(val) {
    actualNavBar.style.backgroundColor = val
    space.style.backgroundColor = val
}
function loadNavColor() {
    if (!localStorage['navbar']) return
    navbar.value = localStorage['navbar']
    colorNavBar = localStorage['navbar']
    setNavColor(navbar.value)
}
function loadBGImage() {
    const val = localStorage['bgImage']
    if (!val) return
    setBG64(val)
}
const sizing = document.getElementById("sizing")
const repeating = document.getElementById("repeating")
function loadImageStyles() {
    console.log(localStorage)
    setSizing(localStorage['bgImageSize'] || "Cover")
    sizing.value = localStorage['bgImageSize'] || "Cover"
    console.log(localStorage)
    
    if (localStorage['bgImageSize'] == 'Custom') {
        valX.value = localStorage['bgWidth'] || "100"
        setCustomSize()
    }
    console.log(localStorage)

    setRepeating(localStorage['bgRepeat'] || "no-repeat")
    repeating.value = localStorage['bgRepeat'] || "no-repeat"
    console.log(localStorage)
}
const presetVal = document.getElementById("presets")
loadFont()
loadNavColor()
loadBGColor()
loadTextColor()
loadIcoColor()
loadBGImage()
loadImageStyles()
function clearFonts() {
    localStorage['imported-fonts'] = ""
    localStorage['font-names'] = ""
    localStorage['font'] = "Default"
    location.reload()
}
function badrng(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function PlayChristmasMusic() {
    const audio = new Audio('18-AudioTrack1.wav')
    audio.loop = true
    
    audio.play()

    return () => {
        audio.pause()
        audio.remove()
    }
}
function Christmas() {
    try {
    let StopMusic = PlayChristmasMusic()
    function addSnow() {
        let snow = document.createElement('img')
        snow.src = "icons/snowflake.png"
        snow.className = 'snow'
        snow.style.left = badrng(0,100) + "%"
        snow.style.top = "-10%"
        // const randRot = badrng(0,360)
        // snow.style.transform = `rotate(${randRot}deg)`
        document.body.appendChild(snow)
    }
    
    let an = requestAnimationFrame(anim) 
    let spawnFrame = 10
    let frameElapsed = 0
    function anim() {
        frameElapsed ++
        // con.innerHTML = 'init'
        an = requestAnimationFrame(anim)
        if (frameElapsed % spawnFrame == 0) {
            addSnow()
        }
        const elements = document.querySelectorAll('.snow')
        elements.forEach(element => {
            let height = parseFloat(element.style.top.replace("%","")) || 0
            // let rotation = parseFloat(element.style.transform.replace('rotate(',"").replace(')',"").replace('deg','')) || 0
            // rotation += 2 * (1 / 60)
            height += 10 * (1 / 60)
            element.style.top = height + "%"
            // con.innerHTML = element.style.transform
            // element.style.transform = `rotate(${rotation}deg)`
            if (height > 100) {
                element.remove()
            }
        });
    }
    return () => {
        StopMusic()
        const elements = document.querySelectorAll('.snow')
        elements.forEach(element => {
            element.remove()
        });
        cancelAnimationFrame(an)
    }
    } catch (err) {
        con.innerHTML = err
    }
}
let stringThing = ""
document.addEventListener("keydown",(event) => {
    if (event.repeat) return
    const key = event.key.toUpperCase()
    stringThing += key
    if (stringThing == "ASDF") {
        usePreset("Christmas")
        stringThing = ""
    }
})
document.addEventListener("keyup", () => {
    stringThing = ""
})
const specialThemes = {
    'Christmas': Christmas,
    'ChristmasM': Christmas,
}
let clickedScreen = false
function onDocClicked() {
    clickedScreen = true
}
document.addEventListener('click',onDocClicked)
async function Clicked() {
    return new Promise((resolve,reject) => {
        if (clickedScreen) {
            resolve()
            return
        }
        function anim() {
            if (clickedScreen) {
                clearInterval(interval)
                resolve()
                return
            } 
        }
        anim()
        let interval = setInterval(anim,0)
    })
}
let stopSpecial = null
async function checkForSpecial(name) {
    if (stopSpecial) { 
        stopSpecial()
        stopSpecial = false
    }
    if (!specialThemes[name]) return
    await Clicked() 
    stopSpecial = specialThemes['Christmas']()
}
function usePreset(name) {
    try {
    checkForSpecial(name)
    let preset = presets[name]
    if (!preset) {
        return
    }
    
    saveBGColor()
    saveNavColor()
    saveTextColor()
    saveIcoColor()
    removeBGImg()
    actualNavBar.style.backgroundColor = preset['nb'] 
    space.style.backgroundColor = preset['nb']
    settingsMenu.style.backgroundColor = preset['bg']
    document.body.style.backgroundColor = preset['bg']
    setIconColor(preset['ic'])
    if (preset['bi']) {
        setBG64(preset['bi'])
    }
    colorBG = preset['bg']
    sText.style.color = preset['fc']
    sText.className = preset['fn']
    fontName = preset['fn']
    if (preset['no'] || preset['no'] == 0) {
        space.style.opacity = preset['no']
        actualNavBar.style.opacity = preset['no']
    }
    if (preset['ss'] && preset['ss'] != 'custom') {
        document.body.style.backgroundSize = preset['ss']
    } else if (preset['ss'] == 'custom') {
        valX.value = preset['cw']
        changeCustomSize()
    }

    if (preset['rs']) {
        document.body.style.backgroundRepeat = preset['rs']
    }
    for (let x = 0; x < setTexts.length; x++) {
        const t = setTexts[x]
        t.style.color = preset['bg']
    }
    } catch (err) {
        con.innerHTML = err
    }
}
setTimeout(() => {
    usePreset('Christmas')
},100)
let selectedPreset = 0
document.addEventListener('keydown',(event) => {
    
    const key = event.key.toUpperCase()
    if (key === 'M' && event.ctrlKey && !event.shiftKey) {
        const keys = Object.keys(presets)
        selectedPreset += 1
        if (selectedPreset >= keys.length) {
            selectedPreset = 0
        }
        const presetKey = keys[selectedPreset]
        usePreset(presetKey)
    } else if (key == 'M' && event.ctrlKey && event.shiftKey) {
        const keys = Object.keys(presets)
        selectedPreset -= 1
        if (selectedPreset < 0) {
            selectedPreset = keys.length - 1
        } 
        const presetKey = keys[selectedPreset]
        usePreset(presetKey)
    }
})
