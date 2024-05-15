let parsedFiles = []
const pickerOpts = {
    multiple:true,
    startIn: "downloads",
    types:[{
        description: "Fonts/CST",
        accept: {
            "font/*": [".ttf",".cst"]
        }
    }],
}
let addedFonts = []
class ParsedFile {
    constructor(file,name) {
        this.name = name
        this.file = file
    }
}
class ParseFileManager {
    constructor() {
        this.onDone = undefined
        this.filesToParse = 0
        this._parsed = 0
    }
    reset(amt=1) {
        this._parsed = 0
        this.filesToParse = amt
        this.onDone = undefined
    }
    add() {
        this._parsed = this.parsed + 1
    }
    set _parsed(val) {
        this.parsed = val
        if (val >= this.filesToParse) {
            if (!this.onDone) return
            this.onDone()
            this.reset()
        }
    }
    get _parsed() {
        return this.parsed
    }
}
async function awaitAllClear() {
    return new Promise((resolve,reject) => {
        let timeout = setTimeout(() => {
            reject("File Parsing exceeded 10000ms")
        },10000)
        function whenDone() {
            resolve(true)
            clearTimeout(timeout)
        }
        parseManager.onDone = whenDone
    })
}
let parseManager = new ParseFileManager() 
function reset() {
    addedFonts.length = 0
    parseManager.reset()
    parsedFiles = []
}
async function importFont() {
        let handles = await showOpenFilePicker(pickerOpts)
        parseManager.reset(handles.length)
        for (let x = 0; x < parseManager.filesToParse; x ++) {
            parseFile(handles[x])
        }
        let doneCb = awaitAllClear()
        let didError = false
        doneCb.catch(() => {
            didError = true 
        })
        await doneCb
        if (didError) {
            reset()
            return
        }
        addFontsToDOM()
    }
async function parseFile(handle) {
    let file = await handle.getFile()
    if (file.name.split(".")[1] == "cst") {
        parseManager.add()
        readCST(file)
        return
    }
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (ev) {
        const base64Data = reader.result.split(",")[1].replace(/\s/g, ''); // Remove whitespace
        files[handle.name] = base64Data
        parsedFiles.push(new ParsedFile(getFile(handle.name),handle.name))
        delete files[handle.name]
        parseManager.add()
    }
}
function getAcceptableName(name) {
    let newName = name.split(".")[0]
    return newName.replace(".","").replace(",","").replace(" ","").replace("[")
}
function addFontFace(name,b64) {
    let css = `@font-face {\n    font-family: "${name}";\n     src: url('${b64}');\n}`
    return css
}
function addClass(name) {
    let css = `.${name} {\n    --font: "${name}" !important;\n    font-family: "${name}" !important;\n}`
    return css
}
function addFontsToDOM() {
    try {

    let e = document.getElementById("imported-fonts")
    let fontSelections = document.getElementById("fonts")
    for (let x = 0; x < parsedFiles.length; x ++) {
        let file = parsedFiles[x]
        let name = getAcceptableName(file.name)
        addedFonts.push(name)
        let option = document.createElement("option")
        option.classList.add("optionSettings",name)
        option.innerHTML = `<p>${name}</p>`
        fontSelections.appendChild(option)
        e.innerHTML += addFontFace(name,file.file)
        e.innerHTML += "\n\n"
        e.innerHTML += addClass(name)
        e.innerHTML += "\n\n"
    }
    let maxFrames = 60
    let frames = 0
    function anim() {
        frames ++
        if (frames > maxFrames) {
            return
        }
        requestAnimationFrame(anim)
        schedulePrompt("Congrats!","The Import was","Successful!")   
    }
    localStorage['imported-fonts'] = e.innerHTML
    localStorage['font-names'] = addedFonts.toString()
    anim()
    reset()
    } catch (err) {
        // con.innerHTML = err
    }
}
let loadedFonts = false
async function loadSavedFonts() {
    if (loadedFonts) return true
    return new Promise((resolve,reject) => {
        const e = document.getElementById("imported-fonts")
        e.innerHTML = localStorage['imported-fonts'] || ""
        let names = localStorage['font-names'].split(",")
        let fontSelections = document.getElementById("fonts")
        for (let x = 0; x < names.length; x++) {
            let name = names[x]
            let option = document.createElement("option")
            option.classList.add("optionSettings",name)
            option.innerHTML = `<p>${name}</p>`
            fontSelections.appendChild(option)
        }
        loadedFonts = true
        resolve(true)
    })
}