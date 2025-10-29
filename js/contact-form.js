// Tunggu halaman selesai load
document.addEventListener("DOMContentLoaded", function () {
  // Cari form di halaman
  const form = document.querySelector("form");

  // Ketika form dikirim
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop form refresh

    // Ambil data dari input
    const nama = document.getElementById("namalengkap").value;
    const whatsapp = document.getElementById("whatsapp").value;
    const tanggal = document.getElementById("tanggal").value;
    const tempat = document.getElementById("tempat").value;

    // Cek apakah semua terisi
    if (nama && whatsapp && tanggal && tempat) {
      // Tampilkan alert sukses
      alert("Appointment Anda sudah terkirim!");

      // Reset form
      form.reset();
    } else {
      // Tampilkan alert error
      alert("Harap isi semua data!");
    }
  });
});
