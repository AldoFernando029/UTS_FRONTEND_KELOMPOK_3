// Ambil ID dari URL
const params = new URLSearchParams(window.location.search);
const budayaId = params.get("id");

// fungsi ubah format tanggal jadi ke "15 September"
function formatTanggal(tanggal) {
  const [day, month] = tanggal.split("-"); // Hanya day dan month
  const bulanIndo = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  return `${parseInt(day)} ${bulanIndo[parseInt(month) - 1]}`;
}

// Fetch data dari JSON
fetch("../budaya.json")
  .then(response => response.json())
  .then(data => {
    const budaya = data.budaya.find(item => item.id == budayaId);
// kalau ketemu datanya yang di fetch tampilin di halaman sesuai dengan budayanya
    if (budaya) {
      const tanggalFormatted = formatTanggal(budaya.tanggal_terjadi);
      document.getElementById("detail-container").innerHTML = `
        <div class="hero">
          <img src="../${budaya.images[0]}" alt="${budaya.nama}" />
        </div>
        <div class="content">
          <h1>${budaya.nama}</h1>
          <div class="meta">
            📍 ${budaya.lokasi} &nbsp;|&nbsp; 📅 ${tanggalFormatted}
          </div>
          <p class="desc">${budaya.deskripsi}</p>
        </div>
        <div class="image2">
          <img src="../${budaya.images[1]}" alt="${budaya.nama}" />
        </div>
        <div class="mini-history">
          <strong>Sejarah Singkat:</strong><br>
          ${budaya.mini_history}
        </div>
        <a href="../home/homepage.html" class="back-btn">← Kembali</a>
      `;
    } else { //kalau ga ketemu 
      document.getElementById("detail-container").innerHTML = `
        <p style="padding: 40px; text-align: center;">Data budaya tidak ditemukan 😔</p>
      `;
    }
  })
  .catch(err => { //kalau fetch gagal
    document.getElementById("detail-container").innerHTML = `
      <p style="padding: 40px; text-align: center;">Terjadi kesalahan saat memuat data 😢</p>
    `;
    console.error("Error fetching JSON:", err);
  });
