
const presets = {
    'None': false,
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
    "Borton": {
        "bg": "black",
        "nb" : "black",
        "fc": "white",
        "fn": "Borton",
        "no": 0,
        'bi': 'Backgrounds/Daniel.jpg',
        'ic': 'rgb(209,155,137)',
        'ss': "contain",
        "rs": 'repeat',
    },
    'Thanksgiving': {
        "bg": 'black',
        "nb" : "black",
        "fc": "white",
        "fn": "Christmas",
        "ic": "orange",
        "no": 0,
    },
    'EthanRe': {
        "bg": 'black',
        "nb" : "black",
        "fc": "white",
        "fn": "Mason",
        "ic": "white",
        "no": 0,
    },
    'WRX-STI': {
        "bg": 'black',
        "nb" : "black",
        "fc": "white",
        "fn": "Mason",
        "ic": "white",
        "no": 0,
    },
    'Moto': {
        "bg": 'black',
        "nb" : "black",
        "fc": "white",
        "fn": "Mason",
        "ic": "white",
        "no": 0,
    },
    "Christmas": {
        "bg": 'red',
        "nb" : "green",
        "fc": "green",
        "fn": "Christmas",
        "ic": "red",
        "no": 1,
    },
    'Cranberry': {
        "bg": 'red',
        "nb" : "green",
        "fc": "green",
        "fn": "Christmas",
        "ic": "red",
        "no": 0,
    },
    'Daniella': {
        'fn': 'Christmas',
        'no': 0.3,
        'ic': 'red',
        'fc': 'green',
        'bg': 'black',
        'nb': 'darkgreen',
        'bi': 'Backgrounds/nuts.gif',
        'ss': 'contain',
        'rs': 'repeat',
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
    "Jack": {
        "bg": 'black',
        'nb': 'black',
        "fc": 'white',
        'fn': 'BlackOps',
        'ic': 'white',
        'bi': getFile('jack.png'),
        'ss': 'contain',
        'cw': 100,
        'rs': 'no-repeat',
        'no': 0,
    },
    "Mason": {
        "bg": "black",
        "nb" : "black",
        "fc": "rgb(138,0,0)",
        "fn": "Demon",
        "ic": "rgb(138,0,0)",
        "no": 1,
    },
    "Massive": {
        "bg": "black",
        "nb" : "black",
        "fc": "white",
        "fn": "Default",
        "ic": "white",
        "no": 0,
        'bi': 'Backgrounds/low_taper_fade.png'
    },
    'Skibidi': {
        "bg": "black",
        "nb" : "black",
        "fc": "white",
        "fn": "Default",
        "ic": "white",
        "no": 0,
        'bi': 'Backgrounds/skibidi.webp'
    },
    "ThickOfIt": {
        "bg": "black",
        "nb" : "black",
        "fc": "white",
        "fn": "Default",
        "ic": "white",
        "no": 0,
        'bi': 'Backgrounds/thick_of_it.jpg'
    },
    'KneeSurgery': {
        "bg": 'black',
        'nb': 'black',
        'fc': 'white',
        'no': 0,
        'fn': 'Knee',
        'ic': 'white',
        'bi': 'Backgrounds/Knee.jpg',
        "ss": "cover",
        "cw": 100,
        "rs": "no-repeat",
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
    'JordanN': {
        'bg': 'black',
        'nb': 'black',
        'fc': 'white',
        'no': 0,
        'fn': 'Default',
        'ss': 'cover',
        'bi': 'Backgrounds/jordan.jpg',
        'rs': 'no-repeat',
        'ic': 'white',
    },
    'Subnautica': {
        'bg': 'black',
        'nb': 'black',
        'fc': 'white',
        'no': 0,
        'fn': 'Default',
        'ss': 'cover',
        'bi': 'Backgrounds/subnautica.png',
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
    'The G.O.A.T': {
        "bg": 'black',
        'nb': 'rgb(125, 0, 235)',
        'fc': 'rgb(237, 255, 39)',
        'no': 1,
        'fn': 'Default',
        'ic': 'white',
        'bi': 'Backgrounds/Bronnie.jpeg',
        "ss": "cover",
        "cw": 100,
        "rs": "repeat",
    },
    'Goat Edit':
    {
        "bg": 'black',
        'nb': 'rgb(125, 0, 235)',
        'fc': 'rgb(237, 255, 39)',
        'no': 0,
        'fn': 'Default',
        'ic': 'white',
        'bi': 'Backgrounds/Lebrons/1.gif',
        "ss": "cover",
        "cw": 100,
        "rs": "repeat",
    },
    'Paige': {
        "bg": 'black',
        'nb': 'rgb(81,139,205)',
        'fc': 'white',
        'no': 1,
        'fn': 'Google',
        'ic': 'white',
        'bi': getFile('monke.gif'),
        "ss": "contain",
        "cw": 100,
        "rs": "repeat",
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
    "Tales": {
        "bg": "black",
        "nb": "black",
        "ic": "black",
        "fc": "white",
        "fn": "Gameboy",
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
    },
    "Apple": {
        "bg": "black",
        "nb": "black",
        "bi": 'Flavors/Apple.png', 
        "ic": "black",
        "fc": "white",
        "fn": "Gameboy",
        "no": 0,
        "ss": 'custom',
        'cw': 3,
        'rs': 'repeat',
    },
    "Banana": {
        "bg": "black",
        "nb": "black",
        "bi": 'Flavors/Banana.png', 
        "ic": "black",
        "fc": "black",
        "fn": "Gameboy",
        "no": 0,
        "ss": 'custom',
        'cw': 3,
        'rs': 'repeat',
    },
    "Chocolate": {
        "bg": "black",
        "nb": "black",
        "bi": 'Flavors/Chocolate.png', 
        "ic": "black",
        "fc": "white",
        "fn": "Gameboy",
        "no": 0,
        "ss": 'custom',
        'cw': 3,
        'rs': 'repeat',
    },
    "Coal": {
        "bg": "black",
        "nb": "black",
        "bi": 'Flavors/Coal.png', 
        "ic": "black",
        "fc": "white",
        "fn": "Gameboy",
        "no": 0,
        "ss": 'custom',
        'cw': 3,
        'rs': 'repeat',
    },
    "Gold": {
        "bg": "black",
        "nb": "black",
        "bi": 'Flavors/Gold.png', 
        "ic": "black",
        "fc": "white",
        "fn": "Gameboy",
        "no": 0,
        "ss": 'custom',
        'cw': 3,
        'rs': 'repeat',
    },
    "Grape": {
        "bg": "black",
        "nb": "black",
        "bi": 'Flavors/Grape.png', 
        "ic": "black",
        "fc": "white",
        "fn": "Gameboy",
        "no": 0,
        "ss": 'custom',
        'cw': 3,
        'rs': 'repeat',
    },
    "Lime": {
        "bg": "black",
        "nb": "black",
        "bi": 'Flavors/Lime.png', 
        "ic": "black",
        "fc": "white",
        "fn": "Gameboy",
        "no": 0,
        "ss": 'custom',
        'cw': 3,
        'rs': 'repeat',
    },
    "Orange": {
        "bg": "black",
        "nb": "black",
        "bi": 'Flavors/Orange.png', 
        "ic": "black",
        "fc": "white",
        "fn": "Gameboy",
        "no": 0,
        "ss": 'custom',
        'cw': 3,
        'rs': 'repeat',
    },
    "Platinum": {
        "bg": "black",
        "nb": "black",
        "bi": 'Flavors/Platinum.png', 
        "ic": "black",
        "fc": "white",
        "fn": "Gameboy",
        "no": 0,
        "ss": 'custom',
        'cw': 3,
        'rs': 'repeat',
    },
    "Rose": {
        "bg": "black",
        "nb": "black",
        "bi": 'Flavors/Rose.png', 
        "ic": "black",
        "fc": "white",
        "fn": "Gameboy",
        "no": 0,
        "ss": 'custom',
        'cw': 3,
        'rs': 'repeat',
    },
    

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
let hasManualTextColor = localStorage.getItem("manualTextColor") === "true"
let hasManualCountdownTextColor = localStorage.getItem("manualCountdownTextColor") === "true"

function updateSettingsTextColor(value) {
    for (let x = 0; x < setTexts.length; x++) {
        setTexts[x].style.color = value
    }
}

function getInverseSettingsTextColor(hex) {
    const clean = (hex || "#202124").replace("#", "")
    const full = clean.length === 3 ? clean.split("").map(value => value + value).join("") : clean
    const color = parseInt(full, 16)
    const red = (color >> 16) & 255
    const green = (color >> 8) & 255
    const blue = color & 255
    const brightness = (red * 299 + green * 587 + blue * 114) / 1000

    if (brightness < 130) return "#ffffff"
    if (brightness < 175) return "#d0d0d0"
    return "#000000"
}

function autoUpd(element) {
    isAutoUpdBg = true
    document.body.style.transitionDuration = "100ms"
    requestAnimationFrame(anim)
    colorBG = element.value
    function anim() {
        if (!isAutoUpdBg) return
        requestAnimationFrame(anim)
        settingsMenu.style.backgroundColor = element.value
        document.body.style.backgroundColor = element.value
        colorBG = element.value
        if (!hasManualTextColor) {
            const inverseTextColor = getInverseSettingsTextColor(element.value)
            sText.style.color = inverseTextColor
            updateSettingsTextColor(inverseTextColor)
        }
    }
}
function changePreset(element) {
    const val = element.value
    localStorage.setItem("preset", val)
    if (val === "None") {
        const navbarOpacity = document.getElementById("navbar-opacity")
        if (navbarOpacity) {
            navbarOpacity.value = "1"
            saveNavbarOpacity(navbarOpacity)
        }
    }
    usePreset(val)
}
function changeFont(element) {
    const val = element.value
    sText.className = val
    counter.className = val
    fontName = val
    localStorage['font'] = val
}
async function loadFont() {
    const font = localStorage['font']
    counter.className = font
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
        updateSettingsTextColor(element.value)
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
if (icon) {
    icon.addEventListener("click", toggleSettings)
}
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
function setBGImageStatus(message) {
    const status = document.getElementById("bg-image-status")
    if (status) status.textContent = message
}
async function updateBGImage(element) {
    try {
        if (!element) return
        await setBGImg(element)
    } catch (err) {
        setBGImageStatus("The background image has an error. The previous image was kept.")
        con.innerHTML = err
    }
}
async function setBGImg(image) {
    const file = image.files[0]
    if (!file || !file.type.startsWith("image/")) {
        throw new Error("Choose a valid image file.")
    }
    const b64 = await readFileAsB64(file)
    if (typeof b64 !== "string" || !b64.startsWith("data:image/")) {
        throw new Error("The selected image could not be read.")
    }
    saveBGImage(b64)
    setBG64(b64)
    setBGImageStatus("")
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
        reader.onerror = () => {
            clearTimeout(failure)
            reject("Could not read the selected image")
        }
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
    const value = `${valX.value}%,1%`
    sizingWidth = valX.value
    document.body.style.backgroundSize = value
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
function saveNavbarOpacity(element) {
    localStorage.setItem("navbarOpacity", element.value)
    space.style.opacity = element.value
    actualNavBar.style.opacity = element.value
}
let isInSettings = false
let canClick = true
const mainSettings = document.getElementById("settingsMenu")
function toggleSettings() {
    if (!canClick) return
    canClick = false
    if (!isInSettings) {
        isInSettings = true
        mainSettings.style.display = "block"
        mainSettings.classList.add("open")
        mainSettings.setAttribute("aria-hidden", "false")
    } else {
        isInSettings = false
        mainSettings.classList.remove("open")
        mainSettings.setAttribute("aria-hidden", "true")
    }
    icon.classList.toggle("settings-open", isInSettings)
    setTimeout(() => {
        canClick = true
    }, 500)
}
window.addEventListener("resize", () => {
    if (mainSettings && !isInSettings) {
        mainSettings.classList.remove("open")
    }
})
document.addEventListener("click", event => {
    if (!isInSettings || mainSettings.contains(event.target) || event.target.closest("#allsun")) return;
    toggleSettings();
});
bg.addEventListener("blur",cancelUpd)
const textChanger = document.getElementById("textism")
const navbar = document.querySelector("#navbarColor")
const countdownColor = document.getElementById("countdown-color")
const countdownBackgroundColor = document.getElementById("countdown-background-color")
textChanger.addEventListener("blur",cancelUpdText)
navbar.addEventListener("blur",cancelUpdNavBar)
icoChanger.addEventListener('blur',cancelUpdIcon)
textChanger.addEventListener("input", () => {
    hasManualTextColor = true
    localStorage.setItem("manualTextColor", "true")
    sText.style.color = textChanger.value
    updateSettingsTextColor(textChanger.value)
})
function updateCountdownColor(value, manual = false) {
    if (!value || !counter) return
    if (manual) {
        hasManualCountdownTextColor = true
        localStorage.setItem("manualCountdownTextColor", "true")
    }
    counter.style.color = value
    if (manual) localStorage.setItem("countdownTextColor", value)
}
function updateCountdownBackgroundColor(value) {
    countDown.style.backgroundColor = value
    countDown.style.borderColor = value === "#0086ba" ? "rgb(40, 10, 108)" : value
    counter.style.backgroundColor = "transparent"
    if (!hasManualCountdownTextColor) counter.style.color = getInverseSettingsTextColor(value)
    localStorage.setItem("countdownBackgroundColor", value)
}
countdownColor?.addEventListener("input", () => updateCountdownColor(countdownColor.value, true))
countdownBackgroundColor?.addEventListener("input", () => updateCountdownBackgroundColor(countdownBackgroundColor.value))
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
}
function loadTextColor() {
    if (!localStorage['textColor']) return
    textChanger.value = localStorage['textColor']
    colorFont = localStorage['textColor']
    if (hasManualTextColor) {
        autoUpdText(textChanger)
        requestAnimationFrame(cancelUpdText)
    }
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
    setSizing(localStorage['bgImageSize'] || "Cover")
    sizing.value = localStorage['bgImageSize'] || "Cover"
    
    if (localStorage['bgImageSize'] == 'Custom') {
        valX.value = localStorage['bgWidth'] || "100"
        setCustomSize()
    }
    const savedRepeat = (localStorage['bgRepeat'] || "no-repeat").toLowerCase()
    const repeatValue = ["no-repeat", "repeat-x", "repeat-y", "repeat"].includes(savedRepeat)
        ? savedRepeat
        : "no-repeat"
    setRepeating(repeatValue)
    repeating.value = repeatValue
    localStorage['bgRepeat'] = repeatValue
}
const presetVal = document.getElementById("presets")
loadFont()
loadNavColor()
loadBGColor()
loadTextColor()
loadIcoColor()
loadBGImage()
loadImageStyles()
if (countdownColor) {
    countdownColor.value = hasManualCountdownTextColor
        ? localStorage.getItem("countdownTextColor") || "#ffffff"
        : "#ffffff"
    if (hasManualCountdownTextColor) updateCountdownColor(countdownColor.value)
}
if (countdownBackgroundColor) {
    countdownBackgroundColor.value = localStorage.getItem("countdownBackgroundColor") || "#0086ba"
    updateCountdownBackgroundColor(countdownBackgroundColor.value)
}
const navbarOpacity = document.getElementById("navbar-opacity")
if (navbarOpacity) {
    navbarOpacity.value = localStorage.getItem("navbarOpacity") || "1"
    saveNavbarOpacity(navbarOpacity)
}
function clearFonts() {
    localStorage['imported-fonts'] = ""
    localStorage['font-names'] = ""
    localStorage['font'] = "Default"
    location.reload()
}

function resetSettings() {
    const settingKeys = [
        "bgColor", "textColor", "navbar", "icon", "bgImage", "bgImageSize", "bgWidth", "bgRepeat",
        "font", "preset", "fx", "timeControl", "useSpanish", "databaseSource", "scheduleSelection",
        "countdownSelection", "manualTextColor", "navbarOpacity", "countdownTextColor", "manualCountdownTextColor", "countdownBackgroundColor"
    ]

    settingKeys.forEach(key => localStorage.removeItem(key))
    Object.keys(sessionStorage)
        .filter(key => key.startsWith("googleData_"))
        .forEach(key => sessionStorage.removeItem(key))
    window.location.reload()
}
function badrng(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function playLoopingAudio(sourcePath) {
    const audio = new Audio(sourcePath)
    audio.loop = true
    audio.play()

    return () => {
        audio.pause()
        audio.remove()
    }
}
function PlayChristmasMusic() {
    return playLoopingAudio('Music/18-AudioTrack1.wav')
}
function PlayNutsMusic() {
    return playLoopingAudio('Music/nuts.mp3')
}
function Monkey() {
    return playLoopingAudio('Music/monke.mp3')
}
function JordanN() {
    return playLoopingAudio('Music/jordan.mp3')
}
function PlaySkeletonsMusic() {
    return playLoopingAudio('Music/Skeletons.mp3')
}
function playBackgroundVideo(sourcePath) {
    const video = document.getElementById('video')
    const source = document.getElementById('source')
    source.src = sourcePath
    video.style.display = 'block'
    video.load()
    video.play()

    return () => {
        video.style.display = 'none'
        video.pause()
    }
}
function Thanksgiving() {
    return playBackgroundVideo('Videos/charlie brown.mp4')
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
function Cranberry() {
    return playBackgroundVideo('Videos/cranberry.mp4')
}
function Tales() {
    let audio = new Audio('Music/cruel_king.mp3')
    audio.play()
    audio.loop = true
    applyPreset('Blueberry')
    let flavors = ['Blueberry','Apple','Banana','Chocolate','Coal','Gold','Grape','Lime','Orange','Platinum','Rose']
    let selectedFlavor = 0
    function FlavorMusic() {
        let flavor = flavors[selectedFlavor]
        switch(flavor) {
            //name goes in the quotes/apothesis
            case 'Blueberry':
                audio.pause()
                audio.remove()
                //drop music file into Music folder
                audio = new Audio('Music/cruel_king.mp3')
                //audio must be able looped
                audio.loop = true

                //Play music
                audio.play()
                //do not forget to break
                break
            case 'Grape':
                audio.pause()
                audio.remove()
                audio = new Audio('Music/Block Tales OST_ Fear.mp3')
                audio.loop = true
                audio.play()
                break
            case 'Apple':
                audio.pause()
                audio.remove()
                audio = new Audio('Music/HATRED.mp3')
                audio.loop=true
                audio.play()
                break
            case 'Banana':
                audio.pause()
                audio.remove()
                audio = new Audio('Music/Block Tales OST_ Greed.mp3')
                audio.loop = true
                audio.play()
                break
            case 'Chocolate':
                audio.pause()
                audio.remove()
                audio = new Audio('Music/Block Tales OST_ Bigfoot.mp3')
                audio.loop = true
                audio.play()
                break
            case 'Coal':
                audio.pause()
                audio.remove()
                audio = new Audio('Music/Block Tales OST_ Slasher.mp3')
                audio.loop = true
                audio.play()
                break
            case 'Gold':
                audio.pause()
                audio.remove()
                audio = new Audio('Music/Block Tales OST_ Turkey.mp3')
                audio.loop = true
                audio.play()
                break
            case 'Lime':
                audio.pause()
                audio.remove()
                audio = new Audio('Music/Block Tales OST_ Green & Purple Noobs.mp3')
                audio.loop = true
                audio.play()
                break
            case 'Orange':
                audio.pause()
                audio.remove()
                audio = new Audio('Music/Block Tales OST_ Bizville.mp3')
                audio.loop = true
                audio.play()
                break
            case 'Platinum':
                audio.pause()
                audio.remove()
                audio = new Audio('Music/Block Tales OST_ Solitude.mp3')
                audio.loop = true
                audio.play()
                break
            case 'Rose':
                audio.pause()
                audio.remove()
                audio = new Audio('Music/Block Tales OST_ Bubonic Plant.mp3')
                audio.loop = true
                audio.play()
                break
        }
    }
    function keyDown(event) {
        if (event.key.toUpperCase() == 'F' && !event.shiftKey) {
            selectedFlavor += 1
            if (selectedFlavor >= flavors.length) {
                selectedFlavor = 0
            }
            applyPreset(flavors[selectedFlavor])
        } else if (event.key.toUpperCase() == 'F' && event.shiftKey) {
            selectedFlavor -= 1
            if (selectedFlavor < 0) {
                selectedFlavor = flavors.length - 1
            }
            applyPreset(flavors[selectedFlavor])
        }
        FlavorMusic()
    }
    document.addEventListener('keypress',keyDown)
    return () => {
        document.removeEventListener('keypress',keyDown)
        audio.pause()
        audio.remove()
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
function KneeSurgery() {
    return playLoopingAudio('Music/surgery.mp3')
}
function EthanRe() {
    return playBackgroundVideo('Backgrounds/EthanRe.mp4')
}
function WRXSTI() {
    return playBackgroundVideo('Backgrounds/racing.mp4')
}
function Moto() {
    return playBackgroundVideo('Backgrounds/moto.mp4')
}
function Massive() {
    const audio = new Audio('Music/what_if.mp3')
    audio.loop = true
    audio.play()
    function fade(event) {
        if (event.key.toUpperCase() != 'F') return
        const other = new Audio('Music/fade.mp3')
        other.play()
        audio.pause()
        other.onended = () => {
            audio.play()
        }
    }
    document.addEventListener('keypress',fade)
    return () => {
        audio.pause()
        audio.remove()
        document.removeEventListener('keypress',fade)
    }
}
function ThickOfIt() {
    return playLoopingAudio('Music/thick_of_it.mp3')
}

function Skibidi() {
    return playLoopingAudio('Music/skibidi.mp3')
}
function Subnautica() {
    return playLoopingAudio('Music/subnautica.mp3')
}
function Daniella() {
    try {
    let StopMusic = PlayNutsMusic()
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
function GoatEdit() {
    let last_bron = 1
    function getNum(min,max) {
        let num = badrng(min,max)
        if (num == last_bron) {
            return getNum(min,max)
        }
        return num
    }
    function newBronnie() {
        let num = getNum(1,10)
        last_bron = num
        document.body.style.backgroundImage = 'url(Backgrounds/Lebrons/' + num.toString() + '.gif)'
    }
    newBronnie()

    let interval = setInterval(newBronnie,(badrng(10,20) / 10) * 2000)
    return () => {
        clearInterval(interval)
    }
     
}
const specialThemes = {
    'Christmas': Christmas,
    'Cranberry': Cranberry,
    'Daniella': Daniella,
    'Halloween': PlaySkeletonsMusic,
    'Thanksgiving': Thanksgiving,
    'Tales': Tales,
    'Paige': Monkey,
    'KneeSurgery': KneeSurgery,
    'Subnautica': Subnautica,
    'Massive': Massive,
    'Skibidi': Skibidi,
    'ThickOfIt':ThickOfIt,
    'JordanN': JordanN,
    'Goat Edit': GoatEdit,
    'EthanRe': EthanRe,
    "WRX-STI": WRXSTI,
    'Moto': Moto,
}
let clickedScreen = false
function onDocClicked() {
    clickedScreen = true
}
document.addEventListener('click',onDocClicked)
async function Clicked() {
    return new Promise(resolve => {
        if (clickedScreen) {
            resolve()
            return
        }
        const handleClick = () => {
            clickedScreen = true
            resolve()
        }
        document.addEventListener('click', handleClick, { once: true })
    })
}
let stopSpecial = null
let fxStartToken = 0
let presetStartToken = 0
function stopBackgroundVideo() {
    const video = document.getElementById("video")
    if (!video) return
    video.pause()
    video.currentTime = 0
    video.style.display = "none"
}
async function checkForSpecial(name,override=false) {
    const startToken = ++presetStartToken
    if (stopSpecial) { 
        stopSpecial()
        stopSpecial = false
    }
    stopBackgroundVideo()
    if (!specialThemes[name]) return
    await Clicked() 
    if (startToken !== presetStartToken) return
    const keys = Object.keys(presets)
    if (keys[selectedPreset] != name && override) return
    stopSpecial = specialThemes[name]()
}
function usePreset(name) {
    try {
        const keys = Object.keys(presets)
        selectedPreset = keys.indexOf(name)
    presetList.value = name
    if (name == 'None') {
        loadBGColor()
        loadFont()
        loadNavColor()
        loadTextColor()
        removeBGImg()
        loadBGImage()
        setIconColor(icoChanger.value)
    }
    checkForSpecial(name)
    applyPreset(name)
    } catch (err) {
        con.innerHTML = err
    }
}
async function changeFX(element) {
    const fx = element.value
    const startToken = ++fxStartToken
    localStorage.setItem("fx", fx)
    if (stopSpecial) { 
        stopSpecial()
        stopSpecial = false
    }
    if (!specialThemes[fx]) return
    await Clicked() 
    if (startToken !== fxStartToken || element.value !== fx || fx === "None") return
    stopSpecial = specialThemes[fx]()
}

function applyPreset(name) {
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
    setIconColor(preset['ic'] || 'white')
    if (Object.prototype.hasOwnProperty.call(preset, 'bi')) {
        if (preset['bi']) {
            setBG64(preset['bi'])
            localStorage['bgImage'] = preset['bi']
        } else {
            removeBGImg()
            localStorage['bgImage'] = ""
        }
    }
    colorBG = preset['bg']
    sText.style.color = preset['fc']
    sText.className = preset['fn']
    counter.className = preset['fn']
    fontName = preset['fn']
    if (preset['no'] || preset['no'] == 0) {
        space.style.opacity = preset['no']
        actualNavBar.style.opacity = preset['no']
        const navbarOpacity = document.getElementById("navbar-opacity")
        if (navbarOpacity) navbarOpacity.value = preset['no']
    }
    if (preset['ss'] && preset['ss'] != 'custom') {
        setSizing(preset['ss'])
        sizing.value = preset['ss'].replace(/^./, char => char.toUpperCase())
    } else if (preset['ss'] == 'custom') {
        sizing.value = 'Custom'
        valX.value = preset['cw']
        changeCustomSize()
    }

    if (preset['rs']) {
        setRepeating(preset['rs'])
        repeating.value = preset['rs']
    }
    if (preset['ctc']) {
        if (countdownColor) countdownColor.value = preset['ctc']
        updateCountdownColor(preset['ctc'])
    }
    if (preset['cbc']) {
        if (countdownBackgroundColor) countdownBackgroundColor.value = preset['cbc']
        updateCountdownBackgroundColor(preset['cbc'])
    }
    if (preset['ic']) setIconColor(preset['ic'])
    if (preset['no'] !== undefined) {
        const navbarOpacity = document.getElementById("navbar-opacity")
        if (navbarOpacity) {
            navbarOpacity.value = preset['no']
            saveNavbarOpacity(navbarOpacity)
        }
    }
    if (preset['fx']) {
        const fxSelect = document.getElementById("fx")
        if (fxSelect) {
            fxSelect.value = preset['fx']
            changeFX(fxSelect)
        }
    }
    for (let x = 0; x < setTexts.length; x++) {
        const t = setTexts[x]
        t.style.color = preset['bg']
    }
}

let selectedPreset = 0
const savedPreset = localStorage.getItem("preset")
if (savedPreset && presets[savedPreset]) {
    presetVal.value = savedPreset
    applyPreset(savedPreset)
}
const savedFX = localStorage.getItem("fx")
if (savedFX) {
    const fxSelect = document.getElementById("fx")
    if (fxSelect && Array.from(fxSelect.options).some(option => option.value === savedFX)) {
        fxSelect.value = savedFX
        if (savedFX !== "None") {
            document.addEventListener("click", () => changeFX(fxSelect), { once: true })
        }
    }
}
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
// setTimeout(() => {
//     usePreset('KneeSurgery')
// },250)