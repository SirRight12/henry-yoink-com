const presets = {
    "Coolest": {
        "bg": "#000000",
        "nb": "#000000",
        "fc": "#ffffff",
        "fn": "Minecraft",
    },
    "Christopher": {
        "bg": "#ffff00",
        "nb": "#0000ff",
        "fc": "#0000ff",
        "fn": "Enchanting",
    },
    "Isaiah": {
        "bg": "#000000",
        "nb": "#e7c104",
        "fc": "#ffffff",
        "fn": "LOTR",
    },
    "EnchantingTable": {
      "bg": "#0b0029",
      "nb":"#8a6500",
      "fc": "#00c795" ,
      "fn": "Enchanting" 
    },
}
const con = document.getElementById("sub-console")
const sText = document.getElementById("prompt")
const actualNavBar = document.querySelector("#navbar.navbar")
let isAutoUpdBg = false
let isAutoUpdText = false
let isAutoUpdNav = false
const setTexts = document.getElementsByClassName("setText")
const settingsMenu = document.getElementById("settingsMenu")
let fontName = ""
let colorBG = ""
let colorNavBar = ""
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
    }
}
function cancelUpdNavBar() {
    saveNavColor()
    isAutoUpdNav = false
    actualNavBar.style.transitionDuration = "350ms"
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
function saveBGColor() {
    localStorage['bgColor'] = bg.value
}
function saveTextColor() {
    localStorage['textColor'] = textChanger.value
}
function saveNavColor() {
    localStorage['navbar'] = navbar.value
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
function loadNavColor() {
    if (!localStorage['navbar']) return
    navbar.value = localStorage['navbar']
    colorNavBar = localStorage['navbar']
    actualNavBar.style.backgroundColor = navbar.value
}
loadFont()
loadNavColor()
loadBGColor()
loadTextColor()
function clearFonts() {
    localStorage['imported-fonts'] = ""
    localStorage['font-names'] = ""
    localStorage['font'] = "Default"
    location.reload()
}
function usePreset(name) {
    saveBGColor()
    saveNavColor()
    saveTextColor()
    let preset = presets[name]
    actualNavBar.style.backgroundColor = preset['nb'] 
    settingsMenu.style.backgroundColor = preset['bg']
    document.body.style.backgroundColor = preset['bg']
    colorBG = preset['bg']
    sText.style.color = preset['fc']
    sText.className = preset['fn']
    fontName = val
    for (let x = 0; x < setTexts.length; x++) {
        const t = setTexts[x]
        t.style.color = preset['bg']
    }
}