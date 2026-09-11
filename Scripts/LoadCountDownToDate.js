window.selectedCSVOption = "";
const savedCountdown = localStorage.getItem("countdownSelection") || "";
const resizeDropdown = s => {
    const c = document.createElement("canvas").getContext("2d");
    c.font = window.getComputedStyle(s).font || "16px sans-serif";
    s.style.width = `${c.measureText(s.options[s.selectedIndex]?.text || "").width + 35}px`;
};
document.addEventListener('DOMContentLoaded', async () => {
    const e = document.getElementById('myDropdown'), d = document.getElementById('rowCountDisplay');
    e.style.boxSizing = "border-box";
    e.addEventListener('change', x => {
        window.selectedCSVOption = x.target.value;
        localStorage.setItem("countdownSelection", x.target.value);
        resizeDropdown(e);
    });
    try {
        const txt = loadDatabaseText('Databases Local/CountDownToDate.csv', 'countdown');
        const rows = txt.split('\n').map(r => r.trim()).filter(Boolean);
        rows.forEach(r => {
            const columns = parseDelimitedRow(r);
            const value = columns[0]?.trim();
            const label = getLocalizedCsvValue(columns, 0, 5);
            if (value && value !== 'Name') e.insertAdjacentHTML('beforeend', `<option class="optionSettings Mason" value="${value}">${label}</option>`);
        });
        if (savedCountdown && Array.from(e.options).some(option => option.value === savedCountdown)) {
            e.value = savedCountdown;
            window.selectedCSVOption = savedCountdown;
        }
        document.getElementById('span')?.addEventListener('change', () => {
            Array.from(e.options).forEach(option => {
                const row = rows.find(r => parseDelimitedRow(r)[0]?.trim() === option.value);
                if (row) option.textContent = getLocalizedCsvValue(parseDelimitedRow(row), 0, 5);
            });
            resizeDropdown(e);
        });
        resizeDropdown(e);
    } catch { if (d) d.textContent = 'Error loading CSV.'; }
});
