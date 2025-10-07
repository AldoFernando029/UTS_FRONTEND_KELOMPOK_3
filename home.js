let budayaData = []; // Menyimpan data dari JSON
let currentIndex = 0;
const visibleCards = 3;

// Ambil data JSON
async function loadBudaya() {
  try {
    const res = await fetch('budaya.json'); // path ke file JSON
    const data = await res.json();
    budayaData = data.budaya;
    renderCarousel();
    renderDestinations();
  } catch (error) {
    console.error("Gagal mengambil data JSON:", error);
  }
}

// carousel
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
  const card = carousel.querySelector(".carousel-card");
  if (!card) return;

  const gap = 20;
  const cardWidth = card.offsetWidth + gap;
  carousel.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
}

function nextSlide() {
  if (currentIndex < budayaData.length - visibleCards) {
    currentIndex++;
    updateCarousel();
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
}

// Ubah background hero
function changeBackground(title, imgUrl) {
  const heroImg = document.getElementById("heroImg");
  const heroTitle = document.getElementById("heroTitle");
  const heroSubtitle = document.getElementById("heroSubtitle");

  heroImg.src = imgUrl;
  heroTitle.innerText = title;
  heroSubtitle.innerText = "Destinasi Impianmu 🌴✨";
}

// daftar destinasi
function renderDestinations() {
  const list = document.getElementById("destinationsList");
  if (!list) return;

  list.innerHTML = "";

  budayaData.forEach(d => {
    const item = document.createElement("div");
    item.className = "destination-item";
    item.innerHTML = `
      <h3>${d.nama}</h3>
      <p><strong>Lokasi:</strong> ${d.lokasi}</p>
      <p>${d.deskripsi}</p>
      <img src="${d.images[0]}" alt="${d.nama}" width="300">
    `;
    list.appendChild(item);
  });
}

// Scroll ke search
function scrollToSearch() {
  const destSection = document.getElementById("destinations");
  if(destSection) destSection.scrollIntoView({ behavior: "smooth" });
}

// Inisialisasi
document.addEventListener("DOMContentLoaded", loadBudaya);
