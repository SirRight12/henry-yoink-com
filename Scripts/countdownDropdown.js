window.selectedCSVOption = "";
const savedCountdown = localStorage.getItem("countdownSelection") || "";
const resizeDropdown = (s, useLongestOption = false) => {
    if (!s || !s.options || !s.options.length) return;
    const c = document.createElement("canvas").getContext("2d");
    const selectedText = s.options[s.selectedIndex]?.text || s.options[0]?.text || "";
    const longestText = Array.from(s.options).reduce((longest, option) => {
        return option.text.length > longest.length ? option.text : longest;
    }, "");
    const textToMeasure = useLongestOption ? longestText : selectedText;
    const menu = document.getElementById("settingsMenu");
    const maxWidth = Math.max(140, (menu?.clientWidth || 420) * 0.62);
    let fontSize = parseFloat(window.getComputedStyle(s).fontSize) || 16;
    let textWidth;

    do {
        c.font = `${fontSize}px ${window.getComputedStyle(s).fontFamily || "sans-serif"}`;
        textWidth = c.measureText(textToMeasure).width + 35;
        if (textWidth <= maxWidth || fontSize <= 12) break;
        fontSize -= 1;
    } while (fontSize > 12);

    s.style.fontSize = `${fontSize}px`;
    s.style.width = `${Math.min(textWidth, maxWidth)}px`;
};

const resizeAllDropdowns = () => {
    const selects = Array.from(document.querySelectorAll('select'));
    selects.forEach(select => {
        if (!select.closest('#settingsMenu')) return;
        select.style.boxSizing = "border-box";
        resizeDropdown(select);
        select.addEventListener('focus', () => resizeDropdown(select, true));
        select.addEventListener('click', () => resizeDropdown(select, true));
        select.addEventListener('blur', () => resizeDropdown(select), { once: false });
        select.addEventListener('change', () => resizeDropdown(select), { once: false });
    });
};

const resizeFileInput = input => {
    if (!input) return;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const menu = document.getElementById("settingsMenu");
    const maxWidth = Math.max(160, (menu?.clientWidth || 420) * 0.55);
    const text = input.files[0]?.name || "Choose File";
    let fontSize = parseFloat(window.getComputedStyle(input).fontSize) || 16;
    let textWidth;

    do {
        context.font = `${fontSize}px ${window.getComputedStyle(input).fontFamily || "sans-serif"}`;
        textWidth = context.measureText(text).width + 30;
        if (textWidth <= maxWidth || fontSize <= 12) break;
        fontSize -= 1;
    } while (fontSize > 12);

    input.style.fontSize = `${fontSize}px`;
    input.style.width = `${Math.min(textWidth, maxWidth)}px`;
};

const resizeAllFileInputs = () => {
    document.querySelectorAll('#settingsMenu input[type="file"]').forEach(input => {
        resizeFileInput(input);
        input.addEventListener("change", () => resizeFileInput(input));
    });
};

document.addEventListener('DOMContentLoaded', async () => {
    resizeAllDropdowns();
    resizeAllFileInputs();
    const e = document.getElementById('myDropdown');
    e.style.boxSizing = "border-box";
    const updateCountdownSelection = x => {
        window.selectedCSVOption = x.target.value;
        localStorage.setItem("countdownSelection", x.target.value);
        resizeDropdown(e);
        if (typeof calculateTimeToEnd === "function") calculateTimeToEnd();
        if (typeof window.restartScheduleTimer === "function") window.restartScheduleTimer();
    };
    e.addEventListener('input', updateCountdownSelection);
    e.addEventListener('change', updateCountdownSelection);
    try {
        const txt = loadDatabaseText('data/CountDownToDate.csv', 'countdown');
        const rows = txt.split('\n').map(r => r.trim()).filter(Boolean).map(parseDelimitedRow).filter(rowMatchesSelectedSchedule);
        rows.forEach(columns => {
            const value = columns[0]?.trim();
            const label = getLocalizedCsvValue(columns, 0, 5);
            if (value && value !== 'Name') e.insertAdjacentHTML('beforeend', `<option class="optionSettings Mason" value="${value}">${label}</option>`);
        });
        if (typeof addSettingsTooltips === "function") addSettingsTooltips();
        if (savedCountdown && Array.from(e.options).some(option => option.value === savedCountdown)) {
            e.value = savedCountdown;
            window.selectedCSVOption = savedCountdown;
        } else if (rows.length === 1) {
            const singleValue = rows[0][0]?.trim();
            if (singleValue) {
                e.value = singleValue;
                window.selectedCSVOption = singleValue;
                localStorage.setItem('countdownSelection', singleValue);
            } else {
                e.value = '';
                window.selectedCSVOption = '';
                localStorage.setItem('countdownSelection', '');
            }
        } else {
            e.value = '';
            window.selectedCSVOption = '';
            localStorage.setItem('countdownSelection', '');
        }
        if (typeof calculateTimeToEnd === "function") calculateTimeToEnd();
        if (typeof window.restartScheduleTimer === "function") window.restartScheduleTimer();
        document.getElementById('span')?.addEventListener('change', () => {
            Array.from(e.options).forEach(option => {
                const row = rows.find(r => r[0]?.trim() === option.value);
                if (row) option.textContent = getLocalizedCsvValue(row, 0, 5);
            });
            resizeDropdown(e);
        });
        resizeDropdown(e);
    } catch {}
});
