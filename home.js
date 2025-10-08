let budayaData = [];
let currentIndex = 0;
const visibleCards = 3; // tampilkan 3 kartu sekaligus

// Ambil data JSON
async function loadBudaya() {
  try {
    const res = await fetch("budaya.json");
    const data = await res.json();
    budayaData = data.budaya;
    renderCarousel();
    renderDestinations();
  } catch (error) {
    console.error("Gagal mengambil data JSON:", error);
  }
}

// Buat carousel
function renderCarousel() {
  const carousel = document.getElementById("carousel");
  if (!carousel || budayaData.length === 0) return;

  carousel.innerHTML = "";

  budayaData.forEach((d) => {
    const card = document.createElement("div");
    card.className = "carousel-card";
    card.dataset.name = d.nama;
    card.onclick = () => changeBackground(d.nama, d.images[0]);
    card.innerHTML = `<img src="${d.images[0]}" alt="${d.nama}">`;
    carousel.appendChild(card);
  });

  updateCarousel();
}

function updateCarousel() {
  const carousel = document.getElementById("carousel");
  if (!carousel) return;

  const cards = carousel.querySelectorAll(".carousel-card");
  if (cards.length === 0) return;

  // reset semua efek
  cards.forEach((card) => card.classList.remove("active", "near"));

  // tentukan posisi tengah supaya 3 kartu aktif berada di tengah
  const centerOffset = Math.floor(visibleCards / 2);

  for (let i = 0; i < visibleCards; i++) {
    const index = (currentIndex + i) % cards.length;
    cards[index].classList.add("active");
  }

  // buat efek kecil kanan kiri dari cluster aktif
  const leftIndex = (currentIndex - 1 + cards.length) % cards.length;
  const rightIndex = (currentIndex + visibleCards) % cards.length;
  cards[leftIndex].classList.add("near");
  cards[rightIndex].classList.add("near");

  // posisi supaya cluster 3 kartu aktif selalu di tengah
  const cardWidth = cards[0].offsetWidth + 25;
  const totalCards = cards.length;
  const offset =
    (totalCards * cardWidth) / 2 -
    ((currentIndex + centerOffset + 0.5) * cardWidth);

  carousel.style.transform = `translateX(${offset}px)`;
}

// tombol next & prev (muter terus)
function nextSlide() {
  currentIndex = (currentIndex + 1) % budayaData.length;
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + budayaData.length) % budayaData.length;
  updateCarousel();
}

// Ubah background hero
function changeBackground(title, imgUrl) {
  const heroImg = document.getElementById("heroImg");
  const heroTitle = document.getElementById("heroTitle");

  if (heroImg) heroImg.src = imgUrl;
  if (heroTitle) heroTitle.innerText = title;
}

// daftar destinasi
function renderDestinations() {
  const list = document.getElementById("budayasList");
  if (!list) return;

  list.innerHTML = "";

  budayaData.forEach((d) => {
    const item = document.createElement("div");
    item.className = "budaya-card";
    item.innerHTML = `
      <img src="${d.images[0]}" alt="${d.nama}">
      <h3>${d.nama}</h3>
      <p>${d.deskripsi}</p>
      <button>Pelajari</button>
    `;
    list.appendChild(item);
  });
}

// Scroll ke search
function scrollToSearch() {
  const destSection = document.getElementById("budaya");
  if (destSection)
    destSection.scrollIntoView({ behavior: "smooth" });
}

// Inisialisasi
document.addEventListener("DOMContentLoaded", loadBudaya);
