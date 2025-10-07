let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistList = document.getElementById("wishlistList");

function renderWishlist(items) {
  wishlistList.innerHTML = "";

  if (items.length === 0) {
    wishlistList.innerHTML = `
      <div class="empty-message">
        <h2>Wishlist kamu masih kosong 😢</h2>
        <p>Yuk, tambahkan destinasi favoritmu sekarang!</p>
        <button onclick="window.location.href='destinasi.html'">Tambah Wishlist</button>
      </div>
    `;
    return;
  }

  items.forEach((item, index) => {
    const rating = item.rating || 0; // default rating

    const card = document.createElement("div");
    card.classList.add("card");

    // Buat elemen bintang dinamis
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
      starsHTML += `
        <span 
          class="star ${i <= rating ? "active" : ""}" 
          onclick="setRating(${index}, ${i})"
        >★</span>
      `;
    }

    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.desc || ""}</p>
      <div class="rating">${starsHTML}</div>
      <div class="btn-group">
        <button class="remove-btn" onclick="removeItem(${index})">Hapus</button>
      </div>
    `;

    wishlistList.appendChild(card);
  });
}

function removeItem(index) {
  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderWishlist(wishlist);
}

function setRating(index, ratingValue) {
  wishlist[index].rating = ratingValue;
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderWishlist(wishlist);
}

renderWishlist(wishlist);
