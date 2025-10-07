const destinations = [
  {name:"Borobudur", img:"img/borobudur.jpg", desc:"Candi megah, sejarah Buddha, dan sunrise ikonik."},
  {name:"Labuan Bajo", img:"img/labuanbajo.jpg", desc:"Gerbang Pulau Komodo, laut biru, dan sunset indah."},
  {name:"Danau Toba", img:"img/danautoba.jpg", desc:"Danau vulkanik terbesar, Pulau Samosir, dan budaya Batak."},
  {name:"Bali", img:"img/bali.png", desc:"Pantai, budaya, dan festival unik."},
  {name:"Lombok", img:"img/lombok.jpg", desc:"Pantai eksotis, Gunung Rinjani, dan tradisi Sasak."},
  {name:"Raja Ampat", img:"img/rajaampat.jpg", desc:"Surga bawah laut di Papua Barat."},
  {name:"Gunung Bromo", img:"img/gunungbromo.jpg", desc:"Lautan pasir, sunrise spektakuler, dan kawah aktif."},
  {name:"Kawah Ijen", img:"img/kawahijen.jpg", desc:"Api biru, danau asam, dan penambang belerang."},
  {name:"Pulau Komodo", img:"img/pulaukomodo.png", desc:"Habitat komodo, trekking alam, dan panorama savana."},
  {name:"Bunaken", img:"img/bunaken.jpg", desc:"Taman laut, terumbu karang, dan surga snorkeling-diving."}
];

let currentIndex = 0;
const visibleCards = 3;

function renderCarousel() {
  const carousel = document.getElementById("carousel");
  if (!carousel) return;
  carousel.innerHTML = "";

  destinations.forEach((d) => {
    const card = document.createElement("div");
    card.className = "carousel-card";
    card.onclick = () => changeBackground(d.name, d.img);
    card.innerHTML = `<img src="${d.img}" alt="${d.name}"><h3>${d.name}</h3>`;
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
  const totalCards = destinations.length;
  if (currentIndex < totalCards - visibleCards) {
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

function changeBackground(title, imgUrl) {
  const heroImg = document.getElementById("heroImg");
  const heroTitle = document.getElementById("heroTitle");
  const heroSubtitle = document.getElementById("heroSubtitle");
  heroImg.src = imgUrl;
  heroTitle.innerText = title;
  heroSubtitle.innerText = "Destinasi Impianmu 🌴✨";
}

document.addEventListener("DOMContentLoaded", renderCarousel);
