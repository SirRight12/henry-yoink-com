const presetList = document.getElementById("presets")
//cst = custom schedule theme
function parseAsCST(settings = {}) {
    return JSON.stringify({
        version: 2,
        bg: settings.bg || "#202124",
        fc: settings.fc || "#ffffff",
        nb: settings.nb || "#5c6d81",
        fn: settings.fn || "Default",
        ic: settings.ic || "#ffffff",
        ctc: settings.ctc || "#ffffff",
        cbc: settings.cbc || "#0086ba",
        no: settings.no ?? 1,
        ss: (settings.ss || "cover").toLowerCase(),
        cw: settings.cw || 100,
        rs: settings.rs || "no-repeat",
        fx: settings.fx || "None",
        bi: settings.bi || ""
    })
}
function parseCST(string) {
    try {
        const parsed = JSON.parse(string)
        if (parsed && typeof parsed === "object") return parsed
    } catch {}

    const values = {}
    let valsArray = string.split(",")
    values['bg'] = valsArray[0] || "#202124"
    values['fc'] = valsArray[1] || "#ffffff"
    values['nb'] = valsArray[2] || "#5c6d81"
    values['fn'] = valsArray[3] || "Default"
    values['ic'] = "#ffffff"
    values['ctc'] = "#ffffff"
    values['cbc'] = "#0086ba"
    values['no'] = 1
    values['ss'] = "cover"
    values['cw'] = 100
    values['rs'] = "no-repeat"
    values['fx'] = "None"
    values['bi'] = ""
    return values
}
function downloadCST() {
    let fileText = parseAsCST({
        bg: colorBG || bg.value,
        fc: colorFont || textChanger.value,
        nb: colorNavBar || navbar.value,
        fn: fontName || "Default",
        ic: colorIcon || icoChanger.value,
        ctc: countdownColor?.value,
        cbc: countdownBackgroundColor?.value,
        no: Number(localStorage.getItem("navbarOpacity") || 1),
        ss: sizingStyle,
        cw: sizingWidth,
        rs: repeatingStyle,
        fx: document.getElementById("fx")?.value || "None",
        bi: localStorage.getItem("bgImage") || ""
    })
    let file = new File([fileText],"theme.cst")
    const reader = new FileReader()
    const a = document.createElement("a")
    reader.readAsDataURL(file)
    reader.onload = () => {
        a.download = "theme.cst"
        a.href = reader.result
        a.click()
    }
}
function readCST(file) {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
        let value = parseCST(reader.result)
        presets[file.name.split('.')[0]] = value
        addPresetName(file.name.split('.')[0])
    }
}
function addPresetName(name) {
    const option = document.createElement("option")
    option.classList.add("optionSettings","Mason")
    option.innerHTML = name
    presetList.appendChild(option)
}