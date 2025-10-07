let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistContainer = document.getElementById("wishlistContainer");
const searchInput = document.getElementById("searchInput");

function renderWishlist(items) {
  wishlistContainer.innerHTML = "";

  if (items.length === 0) {
    wishlistContainer.innerHTML = `
      <div class="empty-message">
        <h2>Wishlist kamu masih kosong 😢</h2>
        <p>Yuk, tambahkan destinasi favoritmu sekarang!</p>
        <button onclick="window.location.href='homepage.html'">Tambah Wishlist</button>
      </div>
    `;
    return;
  }

  items.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("wishlist-item");
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="item-info">
        <h3>${item.name}</h3>
        <div class="item-buttons">
          <button class="detail" onclick="viewDetail('${item.name}')">Lihat Detail</button>
          <button class="remove" onclick="removeItem(${index})">Hapus</button>
        </div>
      </div>
    `;
    wishlistContainer.appendChild(div);
  });
}

function removeItem(index) {
  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderWishlist(wishlist);
}

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = wishlist.filter(item =>
    item.name.toLowerCase().includes(keyword)
  );
  renderWishlist(filtered);
});

function viewDetail(name) {
  localStorage.setItem("selectedDestination", name);
  window.location.href = "detail.html";
}

renderWishlist(wishlist);
