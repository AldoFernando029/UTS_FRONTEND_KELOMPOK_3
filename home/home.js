let budayaData = [];
let currentIndex = 0;
let currentHeroId = 1;

// ambil data JSON
async function loadBudaya() {
  try {
    const res = await fetch("../budaya.json");
    const data = await res.json();
    budayaData = data.budaya;

    if (budayaData.length > 0) {
      changeBackground(budayaData[0].nama, budayaData[0].images[0], budayaData[0].id);
    }

    renderCarousel();
    renderDestinations();
    updateNavButtons(); // update tombol next/prev
  } catch (error) {
    console.error("Gagal mengambil data JSON:", error);
  }
}

// RENDER CAROUSEL
function renderCarousel() {
  const carousel = document.getElementById("carousel");
  if (!carousel || budayaData.length === 0) return;

  carousel.innerHTML = "";

  budayaData.forEach((d, index) => {
    const card = document.createElement("div");
    card.className = "carousel-card";
    card.dataset.index = index;
    card.onclick = () => changeBackground(d.nama, d.images[0], d.id);
    card.innerHTML = `<img src="../${d.images[0]}" alt="${d.nama}">`;
    carousel.appendChild(card);
  });

  updateCarousel();
}

// UPDATE CAROUSEL
function updateCarousel() {
  const carousel = document.getElementById("carousel");
  if (!carousel) return;

  const cards = carousel.querySelectorAll(".carousel-card");
  if (!cards.length) return;

  cards.forEach(card => card.classList.remove("active"));
  const activeCard = cards[currentIndex];
  if (activeCard) activeCard.classList.add("active");

  const wrapper = carousel.parentElement;
  const wrapperWidth = wrapper.offsetWidth;
  const cardCenter = activeCard.offsetLeft + activeCard.offsetWidth / 2;
  const translateX = wrapperWidth / 2 - cardCenter;

  carousel.style.transform = `translateX(${translateX}px)`;

  updateNavButtons();
}

// NEXT & PREV
function nextSlide() {
  if (currentIndex < budayaData.length - 1) {
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

// CHANGE HERO
function changeBackground(title, imgUrl, id) {
  const heroImg = document.getElementById("heroImg");
  const heroTitle = document.getElementById("heroTitle");

  if (heroImg) heroImg.style.opacity = 0;

  setTimeout(() => {
    if (heroImg) heroImg.src = `../${imgUrl}`;
    if (heroImg) heroImg.style.opacity = 1;
    if (heroTitle) heroTitle.innerText = title;
    currentHeroId = id;
  }, 200);
}

// GO TO DETAIL
function goDetail(id) {
  window.location.href = `../detail/detailbudaya.html?id=${id}`;
}

// DAFTAR DESTINASI
function renderDestinations(filteredData = null) {
  const list = document.getElementById("budayasList");
  if (!list) return;

  list.innerHTML = "";
  const dataToRender = filteredData || budayaData;

  dataToRender.forEach(d => {
    const item = document.createElement("div");
    item.className = "budaya-card";
    item.innerHTML = `
      <img src="../${d.images[0]}" alt="${d.nama}">
      <h3>${d.nama}</h3>
      <p>${d.deskripsi}</p>
      <button onclick="goDetail(${d.id})">Pelajari</button>
    `;
    list.appendChild(item);
  });
}

// SEARCH BAR
function searchBudaya() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const filtered = budayaData.filter(d => d.nama.toLowerCase().includes(input));
  renderDestinations(filtered);
}

function updateNavButtons() {
  const btnPrev = document.getElementById("prevBtn");
  const btnNext = document.getElementById("nextBtn");

  if (btnPrev) btnPrev.disabled = currentIndex === 0;
  if (btnNext) btnNext.disabled = currentIndex === budayaData.length - 1;
}

document.addEventListener("DOMContentLoaded", loadBudaya);
