// Data destinasi
const destinations = [
  {name:"Borobudur", img:"borobudur.jpg", desc:"Candi megah, sejarah Buddha, dan sunrise ikonik."},
  {name:"Labuan Bajo", img:"labuanbajo.jpg", desc:"Gerbang Pulau Komodo, laut biru, dan sunset indah."},
  {name:"Danau Toba", img:"danautoba.jpg", desc:"Danau vulkanik terbesar, Pulau Samosir, dan budaya Batak."},
  {name:"Bali", img:"bali.png", desc:"Pantai, budaya, dan festival unik."},
  {name:"Lombok", img:"lombok.jpg", desc:"Pantai eksotis, Gunung Rinjani, dan tradisi Sasak."},
  {name:"Raja Ampat", img:"rajaampat.jpg", desc:"Surga bawah laut di Papua Barat."},
  {name:"Gunung Bromo", img:"gunungbromo.jpg", desc:"Lautan pasir, sunrise spektakuler, dan kawah aktif."},
  {name:"Kawah Ijen", img:"kawahijen.jpg", desc:"Api biru, danau asam, dan penambang belerang."},
  {name:"Pulau Komodo", img:"pulaukomodo.png", desc:"Habitat komodo, trekking alam, dan panorama savana."},
  {name:"Bunaken", img:"bunaken.jpg", desc:"Taman laut, terumbu karang, dan surga snorkeling-diving."}
];

// Acara spesial
const events = {
  "2025-03-21": {title:"Nyepi : 21 Maret", details:"Hari raya Nyepi di Bali, suasana hening seharian penuh.", place:"Bali"},
  "2025-06-01": {title:"Festival Danau Toba : 1 juni", details:"Pertunjukan budaya Batak, musik, dan lomba perahu tradisional.", place:"Danau Toba"},
  "2025-07-15": {title:"Yadnya Kasada : 15 Juli", details:"Upacara adat Suku Tengger di Gunung Bromo.", place:"Gunung Bromo"},
  "2025-09-25": {title:"Festival Komodo : 25 september", details:"Pawai budaya dan atraksi di Labuan Bajo.", place:"Labuan Bajo"},
  "2025-11-10": {title:"Festival Banyuwangi : 10 november", details:"Acara seni dan budaya khas Banyuwangi dekat Kawah Ijen.", place:"Kawah Ijen"}
};

let wishlist = [];

// Navigasi
function showPage(page) {
  // Sembunyikan semua page
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');

  // Sembunyikan hero & carousel default
  document.getElementById("home").style.display = "none";

  if (page === "home") {
    document.getElementById("home").style.display = "block"; // hero + carousel
  } else {
    document.getElementById(page).style.display = "block";   // wishlist / calendar / destinations
  }

  if(page === "wishlist") renderWishlist();
  if(page === "calendar") renderCalendar();
}

// Carousel
function renderCarousel() {
  const car = document.getElementById("carousel");
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
  document.getElementById("heroImg").src = imgUrl;
  document.getElementById("hero").style.setProperty("--bg", `url('${imgUrl}')`);
  document.getElementById("heroTitle").innerText = title;
  document.getElementById("heroSubtitle").innerText = "Destinasi Impianmu 🌴✨";
}

// Search destinasi
function searchDestinasi() {
  const q = document.getElementById("search").value.toLowerCase();
  if(q === ""){
    document.getElementById("destinations").style.display="none";
    return;
  }
  showPage('destinations');
  const filtered = destinations.filter(d => d.name.toLowerCase().includes(q));
  renderDestinations(filtered);
}
function renderDestinations(list) {
  const container = document.getElementById("destinationsList");
  container.innerHTML = "";
  if(list.length === 0){
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

// wishlist
function addWishlist(name) {
  if (!wishlist.includes(name)) {
    wishlist.push(name);
    renderWishlist();
  }
}
function renderWishlist() {
  const container = document.getElementById("wishlistList");
  container.innerHTML = "";
  wishlist.forEach(name => {
    const d = destinations.find(x => x.name === name);
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
  });
}
function removeWishlist(name) {
  wishlist = wishlist.filter(x => x !== name);
  renderWishlist();
}

//kalender
let currentDate = new Date();
function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  document.getElementById("monthYear").textContent =
    currentDate.toLocaleDateString("id-ID", { month:"long", year:"numeric" });
  const daysContainer = document.getElementById("days");
  daysContainer.innerHTML = "";

  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const lastDate = new Date(year, month+1, 0).getDate();

  for (let i=0; i<firstDay; i++) {
    daysContainer.appendChild(document.createElement("div"));
  }

  for (let day=1; day<=lastDate; day++) {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const div = document.createElement("div");
    div.className = "day";
    div.textContent = day;
    if (events[dateStr]) {
      div.classList.add("event-day");
      div.onclick = () => showPopup(events[dateStr]);
    }
    daysContainer.appendChild(div);
  }
}
function prevMonth(){ currentDate.setMonth(currentDate.getMonth()-1); renderCalendar(); }
function nextMonth(){ currentDate.setMonth(currentDate.getMonth()+1); renderCalendar(); }

// popup
function showPopup(event) {
  document.getElementById("eventTitle").textContent = event.title;
  document.getElementById("eventDetails").textContent = event.details;
  document.getElementById("popup").style.display = "flex";
}
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// inisialisasi
window.onload = () => {
  renderCarousel();
  renderWishlist();
  renderCalendar();
  const hero = document.getElementById("hero");
  const heroImg = document.getElementById("heroImg");
  hero.style.setProperty("--bg", `url('${heroImg.src}')`);
};
