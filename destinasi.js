let destinations = [];
let wishlist = [];

// PENCARIAN DESTINASI
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
            <button onclick="addWishlist('${d.name}')">Tambah ke Wishlist</button>
        `;
        container.appendChild(card);
    });
}

// WISHLIST
function addWishlist(name) {
    if (!wishlist.includes(name)) wishlist.push(name);

    const d = destinations.find(x => x.name === name);
    if (!d) return;

    let storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!storedWishlist.some(item => item.name === d.name)) {
        storedWishlist.push({ name: d.name, img: d.img, desc: d.desc });
        localStorage.setItem('wishlist', JSON.stringify(storedWishlist));
        alert(`${d.name} ditambahkan ke wishlist!`);
    } else {
        alert(`${d.name} sudah ada di wishlist.`);
    }

    window.location.href = "wishlist.html";
}

// INISIALISASI
document.addEventListener('DOMContentLoaded', () => {
    // Load destinasi dari destinasi.json
    fetch("destinasi.json")
        .then(res => res.json())
        .then(data => {
            destinations = data;
            renderDestinations(destinations);
        })
        .catch(err => console.error("Gagal memuat destinasi.json:", err));
});