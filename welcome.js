// Navigasi tombol hero -> about
document.getElementById('toAboutBtn')?.addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

// Navigasi tombol about -> welcome/homepage (opsional)
document.getElementById('getStartedBtn')?.addEventListener('click', () => {
    window.location.href = 'homepage.html'; // ganti ke halaman utama
});

// Inisialisasi halaman welcome 
document.addEventListener('DOMContentLoaded', () => {
    // Bisa tambah animasi atau efek jika ingin
    console.log("Welcome page loaded.");
});
