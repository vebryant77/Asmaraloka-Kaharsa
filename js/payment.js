document.addEventListener("DOMContentLoaded", () => {
  // Ambil data dari URL
  const params = new URLSearchParams(window.location.search);
  const nama = params.get("nama");
  const email = params.get("email");
  const no_telp = params.get("no_telp");

  // Jika ada data dari halaman konsultasi, isi otomatis
  if (nama) document.querySelector('input[name="nama"]').value = nama;
  if (email) document.querySelector('input[name="email"]').value = email;
  if (no_telp) document.querySelector('input[name="no_telp"]').value = no_telp;
});




document.addEventListener("DOMContentLoaded", () => {
  const bankSelect = document.getElementById("bank");
  const ewalletSelect = document.getElementById("ewallet");
  const vaInput = document.getElementById("va-number");
  const totalInput = document.querySelector("input[name='total']");
  const packageType = document.getElementById("packageType");
  const packageSelect = document.getElementById("packageSelect");
  const form = document.getElementById("paymentForm");

  const packages = {
    wedding: {
      "Amora Essence (300 Pax)": 55000000,
      "Belle Romance (500 Pax)": 70000000,
      "Eternal Bliss (750 Pax)": 85000000,
      "Celestial Grandeur (1000 Pax)": 95000000,
      "Serenity Heritage (300 Pax)": 55000000,
    },
    venue: {
      "Swiss-Belinn Hotel Surabaya (300 Pax)": [30000000, 65000000],
      "Majapahit Hotel Surabaya (300 Pax)": [55000000, 110000000],
      "Four Points Hotel Surabaya (300 Pax)": [40000000, 90000000],
    },
    custom: {
      "Ethereal Bliss (Basic Package)": 7000000,
      "Luminous Elegance (Mid Package)": 10000000,
      "Celestial Grandeur (Premium Package)": 20000000,
    },
  };

  // Saat jenis paket diubah
  packageType.addEventListener("change", () => {
    const selectedType = packageType.value;
    packageSelect.innerHTML = '<option value="">-- Pilih Paket --</option>';

    if (selectedType && packages[selectedType]) {
      packageSelect.disabled = false;

      Object.entries(packages[selectedType]).forEach(([name, price]) => {
        const option = document.createElement("option");
        option.value = name;
        if (Array.isArray(price)) {
          option.textContent = `${name} (Rp ${formatRupiah(price[0])} - Rp ${formatRupiah(price[1])})`;
        } else {
          option.textContent = `${name} (Rp ${formatRupiah(price)})`;
        }
        packageSelect.appendChild(option);
      });
    } else {
      packageSelect.disabled = true;
      totalInput.value = "";
    }
  });

  // Saat paket dipilih
  packageSelect.addEventListener("change", () => {
    const selectedType = packageType.value;
    const selectedPackage = packageSelect.value;

    if (selectedType && selectedPackage) {
      const price = packages[selectedType][selectedPackage];

      if (Array.isArray(price)) {
        totalInput.value = price[0];
      } else {
        totalInput.value = price;
      }
    } else {
      totalInput.value = "";
    }
  });

  // Saat bank dipilih
  bankSelect.addEventListener("change", () => {
    const selectedBank = bankSelect.value;
    if (selectedBank) {
      vaInput.value = generateVANumber(selectedBank);
      ewalletSelect.value = "";
    } else {
      vaInput.value = "";
    }
  });

  // Saat e-wallet dipilih
  ewalletSelect.addEventListener("change", () => {
    const selectedEwallet = ewalletSelect.value;
    if (selectedEwallet) {
      vaInput.value = generateEwalletNumber(selectedEwallet);
      bankSelect.value = "";
    } else {
      vaInput.value = "";
    }
  });

  // Fungsi generator VA number bank
  function generateVANumber(bank) {
    const prefix = {
      BRI: "002",
      BCA: "014",
      BNI: "009",
      Mandiri: "008",
    }[bank] || "000";

    const randomNum = Math.floor(Math.random() * 10000000000)
      .toString()
      .padStart(10, "0");

    return `${prefix}${randomNum}`;
  }

  // 🔥 Fungsi generator nomor e-wallet otomatis
  function generateEwalletNumber(ewallet) {
    const prefix = {
      GoPay: "0812",
      OVO: "0896",
      DANA: "0857",
      ShopeePay: "0888",
    }[ewallet] || "0810";

    const randomNum = Math.floor(Math.random() * 1000000000)
      .toString()
      .padStart(8, "0");

    return `${prefix}${randomNum}`;
  }

  // Format angka ke Rupiah
  function formatRupiah(angka) {
    return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // Saat form dikirim
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = document.querySelector("input[name='nama']").value;
    const total = totalInput.value || "0";

    Swal.fire({
      title: "🎉 Pembayaran Berhasil!",
      html: `
        <p>Terima kasih, <b>${nama}</b>!</p>
        <p>Pembayaran kamu sebesar <b>Rp ${formatRupiah(total)}</b> akan diproses admin</p>
      `,
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#6C63FF",
      background: "#fefefe",
      color: "#333",
      showClass: {
        popup: "animate__animated animate__fadeInDown"
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp"
      }
    }).then(() => {
      form.submit();
    });
  });
});
