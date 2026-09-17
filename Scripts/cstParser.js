//cst = custom schedule theme
function parseAsCST(bgcolor,fontColor,navbar,fontName) {
    let fileString = ""
    fileString += `${bgcolor}`
    fileString += `,${fontColor}`
    fileString += `,${navbar}`
    fileString += `,${fontName}`
    return fileString
}
function parseCST(string) {
    const values = {}
    let valsArray = string.split(",")
    values['bg'] = valsArray[0]
    values['fc'] = valsArray[1]
    values['nb'] = valsArray[2]
    values['fn'] = valsArray[3]
    return values
}
function downloadCST() {
    let fileText = parseAsCST(colorBG || "black",colorFont || "white",colorNavBar || "black",fontName || "Default")
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
const presetList = document.getElementById("presets")
function addPresetName(name) {
    const option = document.createElement("option")
    option.classList.add("optionSettings","Mason")
    option.innerHTML = name
    presetList.appendChild(option)
}
//cst = custom schedule theme
function parseAsCST(bgcolor,fontColor,navbar,fontName) {
    let fileString = ""
    fileString += `${bgcolor}`
    fileString += `,${fontColor}`
    fileString += `,${navbar}`
    fileString += `,${fontName}`
    return fileString
}
function parseCST(string) {
    const values = {}
    let valsArray = string.split(",")
    values['bg'] = valsArray[0]
    values['fc'] = valsArray[1]
    values['nb'] = valsArray[2]
    values['fn'] = valsArray[3]
    return values
}
function downloadCST() {
    let fileText = parseAsCST(colorBG,colorFont,colorNavBar,fontName)
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