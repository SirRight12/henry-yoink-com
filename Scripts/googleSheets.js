window.databaseSource = localStorage.getItem("databaseSource") || "local";

window.googleSheetsConfig = {
    endpoint: "https://script.google.com/macros/s/AKfycbzf5gB46t5nn84PFmrdvhUU2PT7fa-f6jpjMAfq75RlBnxQah1tbYKWoZ4bU4--yQmo2w/exec",
    enabled: true,
    sheetNames: {
        mainSchedule: "MainSchedule",
        countdown: "CountDownToDate",
        specialScheduleDays: "SpecialScheduleDays",
        periodText: "PeriodText"
    }
};

const googleDataCache = {};
const googleCacheKeys = Object.keys(window.googleSheetsConfig.sheetNames);

googleCacheKeys.forEach(sheetKey => {
    const cachedValue = sessionStorage.getItem(`googleData_${sheetKey}`);
    if (cachedValue) googleDataCache[sheetKey] = cachedValue;
});

function loadDatabaseText(localPath, sheetKey) {
    const config = window.googleSheetsConfig;
    if (window.databaseSource === "google") {
        if (googleDataCache[sheetKey]) return googleDataCache[sheetKey];
    }

    const localRequest = new XMLHttpRequest();
    localRequest.open("GET", localPath, false);
    localRequest.send();
    if (localRequest.status < 200 || localRequest.status >= 300) {
        throw new Error(`Could not load ${localPath}`);
    }
    return localRequest.responseText;
}

function preloadGoogleData() {
    const config = window.googleSheetsConfig;
    if (window.databaseSource !== "google" || !config.enabled || !config.endpoint) {
        if (window.databaseSource === "google") {
            switchToLocalData("Google Sheets endpoint is not configured");
        }
        return;
    }

    const missingSheetKeys = googleCacheKeys.filter(sheetKey => !googleDataCache[sheetKey]);
    if (!missingSheetKeys.length) return;

    Promise.all(missingSheetKeys.map(async sheetKey => {
        const url = new URL(config.endpoint);
        url.searchParams.set("sheet", config.sheetNames[sheetKey]);
        url.searchParams.set("format", "csv");
        url.searchParams.set("cacheBust", Date.now().toString());

        const response = await fetch(url);
        const text = await response.text();
        if (!response.ok || !text.trim()) {
            throw new Error(`Google Sheet ${config.sheetNames[sheetKey]} returned no data`);
        }
        return { sheetKey, text };
    }))
        .then(results => {
            results.forEach(({ sheetKey, text }) => {
                googleDataCache[sheetKey] = text;
                sessionStorage.setItem(`googleData_${sheetKey}`, text);
            });
            window.location.reload();
        })
        .catch(error => switchToLocalData(`Google Sheets preload failed: ${error.message}`));
}

function clearGoogleDataCache() {
    googleCacheKeys.forEach(sheetKey => {
        delete googleDataCache[sheetKey];
        sessionStorage.removeItem(`googleData_${sheetKey}`);
    });
}

function switchToLocalData(reason) {
    window.databaseSource = "local";
    localStorage.setItem("databaseSource", "local");
    const sourceSelect = document.getElementById("database-source");
    if (sourceSelect) sourceSelect.value = "local";
    console.warn(`${reason}; switched to local CSV data.`);
}

const databaseSourceSelect = document.getElementById("database-source");
if (databaseSourceSelect) {
    databaseSourceSelect.value = window.databaseSource === "google" ? "global" : "local";
    databaseSourceSelect.addEventListener("change", () => {
        window.databaseSource = databaseSourceSelect.value === "global" ? "google" : "local";
        localStorage.setItem("databaseSource", window.databaseSource);
        clearGoogleDataCache();
        window.location.reload();
    });
}

preloadGoogleData();
