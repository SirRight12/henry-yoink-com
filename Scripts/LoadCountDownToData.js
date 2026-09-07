window.selectedCSVOption = "";
const resizeDropdown = s => {
    const c = document.createElement("canvas").getContext("2d");
    c.font = window.getComputedStyle(s).font || "16px sans-serif";
    s.style.width = `${c.measureText(s.options[s.selectedIndex]?.text || "").width + 35}px`;
};
document.addEventListener('DOMContentLoaded', async () => {
    const e = document.getElementById('myDropdown'), d = document.getElementById('rowCountDisplay');
    e.style.boxSizing = "border-box";
    e.addEventListener('change', x => { window.selectedCSVOption = x.target.value; resizeDropdown(e); });
    try {
        const txt = loadDatabaseText('Databases Local/CountDownToDate.csv', 'countdown');
        txt.split('\n').map(r => r.trim()).filter(Boolean).forEach(r => {
            const v = r.split(',')[0]?.trim();
            if (v && v !== 'Name') e.insertAdjacentHTML('beforeend', `<option class="optionSettings Mason" value="${v}">${v}</option>`);
        });
        resizeDropdown(e);
    } catch { if (d) d.textContent = 'Error loading CSV.'; }
});
