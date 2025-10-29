// services.js - render services list from JS data
(function(){
    'use strict';

    // example data: edit or load from server
    var services = [
        {
            id: 'svc-001',
            title: 'Ethereal Bliss (Basic Package)',
        image: '../images/wo1.jpeg',
            rating: 5,
            price_old: 'Rp. 7.500.000',
            price: 'Rp. 7.000.000',
            features: [
                'Konsultasi konsep dasar pernikahan',
                'Penyusunan rundown dan timeline acara',
                'Koordinasi vendor utama (dekorasi, katering, dokumentasi)',
                '2 orang wedding organizer di hari-H',
                'Gladi bersih dan supervisi acara',
                'Checklist kebutuhan & reminder H-1',
                'Pengawasan jalannya acara hingga selesai',
            ],
            cta: '<i class="icon-whatsapp"></i> Konsultasi Sekarang',
            category: 'Wedding Organizer'
        },
        {
            id: 'svc-002',
            title: 'Luminous Elegance (Mid Package)',
        image: '../images/wo2.jpg',
            rating: 5,
            price_old: 'Rp. 13.000.000',
            price: 'Rp. 10.000.000',
            features: [
                'Semua layanan dari Ethereal Bliss Package',
                'Wedding consultant pribadi',
                '4 orang tim WO di hari-H',
                'Koordinasi semua vendor (dekorasi, MUA, busana, catering, hiburan, dokumentasi, dll.)',
                'Pembuatan konsep tema & palet warna acara',
                'Pendampingan technical meeting vendor',
                'Gladi bersih & simulasi acara detail',
                'Reminder timeline H-30, H-7, H-3, H-1',
                'Pengaturan jadwal dan flow acara lengkap'
            ],
            cta: '<i class="icon-whatsapp"></i> Konsultasi Sekarang',
            category: 'Wedding Organizer '
        },
        {
            id: 'svc-003',
            title: 'Celestial Grandeur (Premium Package',
        image: '../images/wo3.jpg',
            rating: 5,
            price_old: 'Rp. 25.000.000',
            price: 'Rp. 20.000.000',
            features: [
                'Semua layanan dari Luminous Elegance Package',
                'Wedding planner profesional + koordinator utama',
                'Tim WO lengkap (6–8 orang) di hari-H',
                'Konsep dekorasi tematik khusus sesuai impian pengantin',
                'Koordinasi vendor premium + negosiasi harga terbaik',
                'Pengaturan tata letak venue & seating plan digital',
                'Asisten pribadi untuk pengantin pria & wanita',
                'Dokumentasi lengkap (foto, video, drone)',
                'Pengawasan pra-acara hingga pasca-resepsi',
                'Pengaturan after-party (jika diperlukan)',
            ],
            cta: '<i class="icon-whatsapp"></i> Konsultasi Sekarang',
            category: 'Wedding Organizer'
        },
    ];

    function renderStars(n){
        var s = '';
        for(var i=0;i<n;i++) s += '<i class="icon-star"></i>';
        return s;
    }

    function createServiceCard(svc){
        var col = document.createElement('div');
        col.className = 'col-md-4 col-sm-6';

        var box = document.createElement('div');
        box.className = 'fh5co-listing-item';

        var imgWrap = document.createElement('div');
        imgWrap.className = 'image';
        imgWrap.style.backgroundImage = 'url(' + svc.image + ')';
        box.appendChild(imgWrap);

        var content = document.createElement('div');
        content.className = 'listing-content';

        var h3 = document.createElement('h3');
        h3.innerText = svc.title;
        content.appendChild(h3);

        var stars = document.createElement('p');
        stars.className = 'rating';
        stars.innerHTML = renderStars(svc.rating);
        content.appendChild(stars);

        var price = document.createElement('p');
        price.className = 'price';
        price.innerHTML = '<span class="price-now">' + svc.price + '</span> <span class="price-old">' + svc.price_old + '</span>';
        content.appendChild(price);

        var ul = document.createElement('ul');
        ul.className = 'features-list';
        svc.features.forEach(function(f){
            var li = document.createElement('li');
            li.innerText = f;
            ul.appendChild(li);
        });
        content.appendChild(ul);

    var btn = document.createElement('a');
    var waMessage = 'Saya tertarik dengan paket ' + svc.title + ' - ' + svc.price;
    btn.href = 'https://wa.me/+6281252264470?text=' + encodeURIComponent(waMessage);
    btn.target = '_blank';
    btn.className = 'btn btn-primary';
    btn.innerHTML = svc.cta;
    content.appendChild(btn);

        var cat = document.createElement('p');
        cat.className = 'category';
        cat.innerHTML = 'Kategori: ' + svc.category;
        content.appendChild(cat);

        box.appendChild(content);
        col.appendChild(box);
        return col;
    }

    function renderServicesList(){
        var container = document.getElementById('services-container');
        if (!container) return;
        container.innerHTML = '';
        var row;
        services.forEach(function(s, idx){
            // create a card for each service
            var card = createServiceCard(s);
            container.appendChild(card);
        });
    }

    // expose to global for manual re-render or data update
    window.SERVICES = services;
    window.renderServicesList = renderServicesList;

    // auto render on DOM ready (safe if DOMContentLoaded already fired)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderServicesList);
    } else {
        renderServicesList();
    }

})();
