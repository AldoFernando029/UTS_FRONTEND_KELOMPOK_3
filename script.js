//  ACARA SPESIAL 
const events = {
    "2025-03-21": { title: "Nyepi : 21 Maret", img:"img/bali.jpg", details: "Hari raya Nyepi di Bali, suasana hening seharian penuh.", place: "Bali" },
    "2025-06-01": { title: "Festival Danau Toba : 1 Juni", img:"img/danautoba1.jpg", details: "Pertunjukan budaya Batak, musik, dan lomba perahu tradisional.", place: "Danau Toba" },
    "2025-07-15": { title: "Yadnya Kasada : 15 Juli", details: "Upacara adat Suku Tengger di Gunung Bromo.", place: "Gunung Bromo" },
    "2025-09-25": { title: "Festival Komodo : 25 September", details: "Pawai budaya dan atraksi di Labuan Bajo.", place: "Labuan Bajo" },
    "2025-11-10": { title: "Festival Banyuwangi : 10 November", details: "Acara seni dan budaya khas Banyuwangi dekat Kawah Ijen.", place: "Kawah Ijen" }
};

let destinations = [];
let wishlist = [];


// NAVIGASI HALAMAN
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    const selected = document.getElementById(page);
    if (selected) selected.style.display = "block";

    if (page === "wishlist") renderWishlist();
    if (page === "calendar") renderCalendar();
}


// CAROUSEL 
function renderCarousel() {
    const car = document.getElementById("carousel");
    if (!car || !destinations.length) return;

    car.innerHTML = "";
    destinations.forEach(d => {
        const card = document.createElement("div");
        card.className = "carousel-card";
        card.onclick = () => changeBackground(d.name, d.img);
        card.innerHTML = `<img src="${d.img}" alt="${d.name}"><h3>${d.name}</h3>`;
        car.appendChild(card);
    });
}

function changeBackground(title, imgUrl) {
    const heroImg = document.getElementById("heroImg");
    const hero = document.getElementById("hero");
    const heroTitle = document.getElementById("heroTitle");
    const heroSubtitle = document.getElementById("heroSubtitle");

    if (heroImg) heroImg.src = imgUrl;
    if (hero) hero.style.setProperty("--bg", `url('${imgUrl}')`);
    if (heroTitle) heroTitle.innerText = title;
    if (heroSubtitle) heroSubtitle.innerText = "Destinasi Impianmu 🌴✨";
}


//  PENCARIAN DESTINASI
function searchDestinasi() {
    const q = document.getElementById("search").value.toLowerCase();
    if (q === "") {
        document.getElementById("destinations").style.display = "none";
        showPage('home');
        return;
    }

    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById('destinations').style.display = 'block';

    const filtered = destinations.filter(d => d.name.toLowerCase().includes(q));
    renderDestinations(filtered);
}


// RENDER DESTINASI 
function renderDestinations(list) {
    const container = document.getElementById("destinationsList");
    if (!container) return;

    container.innerHTML = "";
    if (list.length === 0) {
        container.innerHTML = "<p>Tidak ada destinasi ditemukan.</p>";
        return;
    }

    list.forEach(d => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${d.img}" alt="${d.name}">
            <h3>${d.name}</h3>
            <p>${d.desc}</p>
            <button class="wishlist-btn" onclick="addWishlist('${d.name}')">Tambah ke Wishlist</button>
        `;
        container.appendChild(card);
    });
}

// WISHLIST
function addWishlist(name) {
    if (!wishlist.includes(name)) {
        wishlist.push(name);
        renderWishlist();
    }

    const wishlistPage = document.getElementById("wishlist");
    if (wishlistPage) {
        showPage('wishlist');
    } else {
        console.warn("Halaman wishlist tidak ditemukan di HTML.");
    }

    const d = destinations.find(x => x.name === name);
    if (!d) return;

    // Ambil data dari localStorage (kalau belum ada, buat array kosong)
    let storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Cek apakah destinasi sudah ada di wishlist
    if (!storedWishlist.some(item => item.name === d.name)) {
        // Tambahkan destinasi ke localStorage
        storedWishlist.push({
            name: d.name,
            img: d.img,
            desc: d.desc
        });
        localStorage.setItem('wishlist', JSON.stringify(storedWishlist));
        alert(`${d.name} ditambahkan ke wishlist!`);
    } else {
        alert(`${d.name} sudah ada di wishlist.`);
    }

    // Arahkan ke halaman wishlist.html
    window.location.href = "wishlist.html";
}



function renderWishlist() {
    const container = document.getElementById("wishlistList");
    if (!container) {
        console.warn("Elemen wishlistList tidak ditemukan di HTML.");
        return;
    }

    container.innerHTML = "";

    if (wishlist.length === 0) {
        container.innerHTML = "<p>Belum ada destinasi di wishlist kamu.</p>";
        return;
    }

    wishlist.forEach(name => {
        const d = destinations.find(x => x.name === name);
        if (d) {
            const event = Object.values(events).find(e => e.place === name);
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <img src="${d.img}" alt="${d.name}">
                <h3>${d.name}</h3>
                <p>${d.desc}</p>
                ${event ? `<p><b>Acara Spesial:</b> ${event.title}</p>` : ""}
                <button onclick="removeWishlist('${d.name}')">Hapus</button>
            `;
            container.appendChild(card);
        }
    });
}


// KALENDER
let currentDate = new Date();

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

    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.className = "empty";
        daysContainer.appendChild(emptyDiv);
    }

    for (let day = 1; day <= lastDate; day++) {
        const div = document.createElement("div");
        div.className = "day";
        div.textContent = day;

        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        if (events[dateStr]) {
            div.classList.add("event-day");
            div.onclick = () => showPopup(events[dateStr]);
        }

        const today = new Date();
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            div.classList.add("today");
        }

        daysContainer.appendChild(div);
    }
}

document.getElementById("prevMonth")?.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});
document.getElementById("nextMonth")?.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});


// POPUP EVENT 
function showPopup(event) {
    const popup = document.getElementById("popup");
    if (!popup) return;

    document.getElementById("eventTitle").textContent = event.title;
    document.getElementById("eventDetails").textContent = event.details;
    document.getElementById("eventImage").src = event.img || "bali.png";

    const mainImg = document.getElementById("mainEventImage");
    if (mainImg && event.img) mainImg.src = event.img;

    popup.style.display = "flex";
}

document.getElementById("closePopup")?.addEventListener("click", () => {
    document.getElementById("popup").style.display = "none";
});


//  INISIALISASI
document.addEventListener('DOMContentLoaded', () => {

    // destinasi.html
    if (window.location.pathname.includes("destinasi.html")) {
        fetch("destinasi.json")
            .then(res => res.json())
            .then(data => {
                destinations = data;
                renderDestinations(destinations);
            })
            .catch(err => console.error("Gagal memuat destinasi.json:", err));
        return;
    }

    // halaman utama (home)
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) getStartedBtn.onclick = window.handleGetStarted;

    renderCarousel();
    renderWishlist();
    renderCalendar();

    const heroImg = document.getElementById("heroImg");
    if (heroImg) {
        document.getElementById("hero").style.setProperty("--bg", `url('${heroImg.src}')`);
    }

    showPage('hero');
});

