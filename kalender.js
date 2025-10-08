let budayaData = [];
let currentDate = new Date();

// Ambil data dari budaya.json
async function loadBudaya() {
    try {
        const res = await fetch("budaya.json");
        const data = await res.json();
        budayaData = data.budaya.map(b => {
            b.dateStr = b.tanggal_terjadi; // format DD-MM
            return b;
        });
        renderCalendar();
    } catch (err) {
        console.error("Gagal memuat budaya.json:", err);
    }
}

// RENDER KALENDER
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthYearEl = document.getElementById("monthYear");
    const daysContainer = document.getElementById("days");

    if (!monthYearEl || !daysContainer) return;

    monthYearEl.textContent = currentDate.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
    daysContainer.innerHTML = "";

    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Kosong sebelum tanggal 1
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.className = "empty";
        daysContainer.appendChild(emptyDiv);
    }

    for (let day = 1; day <= lastDate; day++) {
        const div = document.createElement("div");
        div.className = "day";
        div.textContent = day;

        const dayStr = String(day).padStart(2, '0');
        const monthStr = String(month + 1).padStart(2, '0');
        const dateStr = `${dayStr}-${monthStr}`;

        const event = budayaData.find(b => b.dateStr === dateStr);
        if (event) {
            div.classList.add("event-day");
            div.onclick = () => showPopup(event);
        }

        const today = new Date();
        if (day === today.getDate() && month === today.getMonth()) {
            div.classList.add("today");
        }

        daysContainer.appendChild(div);
    }
}

// POPUP EVENT
function showPopup(event) {
    const popup = document.getElementById("popup");
    if (!popup) return;

    document.getElementById("eventTitle").textContent = event.nama;
    document.getElementById("eventDetails").textContent = event.mini_history;
    document.getElementById("eventImage").src = event.images[0] || "img/nusantara.jpg";

    const mainImg = document.getElementById("mainEventImage");
    if (mainImg) mainImg.src = event.images[0] || "img/nusantara.jpg";

    const popupContent = popup.querySelector(".popup-content");
    let seeDetailsBtn = popupContent.querySelector("#seeDetailsBtn");
    if (!seeDetailsBtn) {
        seeDetailsBtn = document.createElement("button");
        seeDetailsBtn.id = "seeDetailsBtn";
        seeDetailsBtn.textContent = "See Details";
        seeDetailsBtn.style.marginTop = "10px";
        popupContent.appendChild(seeDetailsBtn);
        seeDetailsBtn.onclick = () => {
            window.location.href = `detailbudaya.html?id=${event.id}`;
        };
    }

    popup.style.display = "flex";
}

// Tutup popup
document.getElementById("closePopup")?.addEventListener("click", () => {
    document.getElementById("popup").style.display = "none";
});

// Navigasi bulan
document.getElementById("prevMonth")?.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});
document.getElementById("nextMonth")?.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Inisialisasi
document.addEventListener("DOMContentLoaded", () => {
    loadBudaya();
});
