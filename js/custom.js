function showNotification(message) {
  const notif = document.getElementById("notification");
  notif.textContent = message;
  notif.classList.add("show");

  // Hilang otomatis setelah 3 detik
  setTimeout(() => {
    notif.classList.remove("show");
  }, 3000);
}

const form = document.getElementById("custom-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Tampilkan notifikasi
  showNotification("Custom Package berhasil dikirim!");

  // Reset form
  form.reset();
});
