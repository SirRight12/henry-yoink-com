
const files = {

}

const mime = {
    "ttf": "font/ttf",
    "css": "text/css",
}


function getFile(name) {
        if (files[name] != undefined) {
            if (mime[name.split(".")[1]] != undefined) {
                return "data:" + mime[name.split(".")[1]] + ";base64," + files[name];
            } else {
                console.error("'" + name.split(".")[1] + "' is not in MIME mappings!")
            }
        } else {
            console.error("'" + name + "' is not encoded in your files.js!");
        }
    };