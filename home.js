let budayaData = [];
let currentIndex = 0;
const visibleCards = 3;
let currentHeroId = 1;

// ambil data JSON
async function loadBudaya() {
  try {
    const res = await fetch("budaya.json");
    const data = await res.json();
    budayaData = data.budaya;
    if (budayaData.length > 0) {
      changeBackground(budayaData[0].nama, budayaData[0].images[0], budayaData[0].id);
    }
    renderCarousel();
    renderDestinations();
  } catch (error) {
    console.error("Gagal mengambil data JSON:", error);
  }
}

// buat carousel
function renderCarousel() {
  const carousel = document.getElementById("carousel");
  if (!carousel || budayaData.length === 0) return;

  carousel.innerHTML = "";

  budayaData.forEach((d) => {
    const card = document.createElement("div");
    card.className = "carousel-card";
    card.dataset.name = d.nama.toLowerCase();
    card.onclick = () => changeBackground(d.nama, d.images[0], d.id);
    card.innerHTML = `<img src="${d.images[0]}" alt="${d.nama}">`;
    carousel.appendChild(card);
  });

  updateCarousel();
}

function updateCarousel() {
  const carousel = document.getElementById("carousel");
  if (!carousel) return;

  const cards = carousel.querySelectorAll(".carousel-card");
  if (!cards.length) return;

  // reset semua
  cards.forEach(card => card.classList.remove("active", "near"));

  const totalCards = cards.length;
  const centerIndex = (currentIndex + 1) % totalCards; // kartu tengah dari 3 besar
  const prevIndex = (centerIndex - 1 + totalCards) % totalCards;
  const nextIndex = (centerIndex + 1) % totalCards;

  cards[prevIndex].classList.add("near");
  cards[centerIndex].classList.add("active");
  cards[nextIndex].classList.add("near");

  // hitung transform supaya kartu tengah selalu di tengah carousel-wrapper
  const wrapper = carousel.parentElement;
  const wrapperWidth = wrapper.offsetWidth;
  const centerCard = cards[centerIndex];
  const cardLeft = centerCard.offsetLeft + centerCard.offsetWidth / 2;
  const translateX = wrapperWidth / 2 - cardLeft;

  carousel.style.transform = `translateX(${translateX}px)`;
}

// tombol next & prev
function nextSlide() {
  currentIndex = (currentIndex + 1) % budayaData.length;
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + budayaData.length) % budayaData.length;
  updateCarousel();
}

// ubah background hero & update tombol
function changeBackground(title, imgUrl, id) {
  const heroImg = document.getElementById("heroImg");
  const heroTitle = document.getElementById("heroTitle");
  if (heroImg) heroImg.style.opacity = 0;
  setTimeout(() => {
    if (heroImg) heroImg.src = imgUrl;
    if (heroImg) heroImg.style.opacity = 1;
    if (heroTitle) heroTitle.innerText = title;
    currentHeroId = id;
  }, 200);
}

// ke halaman detail
function goDetail(id) {
  window.location.href = `detailbudaya.html?id=${id}`;
}

// daftar destinasi
function renderDestinations(filteredData = null) {
  const list = document.getElementById("budayasList");
  if (!list) return;

  list.innerHTML = "";

  const dataToRender = filteredData || budayaData;

  dataToRender.forEach((d) => {
    const item = document.createElement("div");
    item.className = "budaya-card";
    item.innerHTML = `
      <img src="${d.images[0]}" alt="${d.nama}">
      <h3>${d.nama}</h3>
      <p>${d.deskripsi}</p>
      <button onclick="goDetail(${d.id})">Pelajari</button>
    `;
    list.appendChild(item);
  });
}

// SEARCH FUNCTION
function searchBudaya() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const filtered = budayaData.filter(d => d.nama.toLowerCase().includes(input));
  renderDestinations(filtered);
}

document.addEventListener("DOMContentLoaded", loadBudaya);
