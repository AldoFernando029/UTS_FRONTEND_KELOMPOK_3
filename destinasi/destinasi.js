let destinations = [];
let wishlist = [];

// PENCARIAN DESTINASI
// filter searchnya
function searchDestinasi() {
    const q = document.getElementById("search").value.toLowerCase();
    const container = document.getElementById("destinationsList");
    if (!container) return;

    const filtered = destinations.filter(d => d.name.toLowerCase().includes(q));
    renderDestinations(filtered);
}

// RENDER DESTINASI
function renderDestinations(list) {
    const container = document.getElementById("destinationsList");
    if (!container) return;

    // kalau destinasi gak ketemu
    container.innerHTML = "";
    if (list.length === 0) {
        container.innerHTML = "<p>Tidak ada destinasi ditemukan.</p>";
        return;
    }

    // untuk membuat card
    // terdapat panggilan dari json yaitu nama, desc, dan imagenya
    list.forEach(d => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="../${d.img}" alt="${d.name}"> 
            <h3>${d.name}</h3>
            <p>${d.desc}</p>
            <button onclick="addWishlist('${d.name}')">Tambah ke Wishlist</button>
        `;
        container.appendChild(card);
    });
}

// WISHLIST
// menambahkan destinasinya ke page wishlist.html
function addWishlist(name) {
    if (!wishlist.includes(name)) wishlist.push(name);

    const d = destinations.find(x => x.name === name);
    if (!d) return;

    // kalau destinasi belum pernah ditambahkan
    let storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!storedWishlist.some(item => item.name === d.name)) {
        storedWishlist.push({ name: d.name, img: d.img, desc: d.desc });
        localStorage.setItem('wishlist', JSON.stringify(storedWishlist));
        alert(`${d.name} ditambahkan ke wishlist!`);
    } else { // kalaudestinasi sudah pernah ditambahkan
        alert(`${d.name} sudah ada di wishlist.`);
    }
    // nyambunfin ke wishlist.html
}

// INISIALISASI TAMPILAN AWALNYA
document.addEventListener('DOMContentLoaded', () => {
    // Load destinasinya dari destinasi.json
    fetch("../destinasi.json")
        .then(res => res.json())
        .then(data => {
            destinations = data;
            renderDestinations(destinations);
        })
        .catch(err => console.error("Gagal memuat destinasi.json:", err));
});