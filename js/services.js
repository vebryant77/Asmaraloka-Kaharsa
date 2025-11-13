// services.js - render services list from JS data
(function(){
    'use strict';

    // example data: edit or load from server
    var services = [
        {
            id: 'svc-001',
            title: 'Amora Essence 300 Pax',
            image: '../images/amoraessence.jpeg',
            rating: 5,
            price_old: 'Rp. 60.000.000',
            price: 'Rp. 55.000.000',
            features: [
                'Makeup + Attire Pengantin Akad & Resepsi',
                'Makeup + Attire Orang Tua & Penerima Tamu',
                'Dekorasi Pelaminan 6 Meter + Area Gate Masuk',
                'Catering 300 Pax ( 7 Buffet, 3 Stall, 3 Dessert )',
                'Photo 1 Album Magazine & Video Cinematic',
                'Musik 1 Singer, 2 Player + Soundsystem',
                'MC Professional',
                '5 Crew Wedding Organizer',
                'Bonus: Photobooth, Buku Tamu, Kuetart 2 Tingkat'
            ],
            cta: 'Pesan Sekarang',
            category: 'Wedding Package'
        },
        {
            id: 'svc-002',
            title: 'Belle Romance 500 Pax',
            image: '../images/belleromance.jpg',
            rating: 5,
            price_old: 'Rp. 75.000.000',
            price: 'Rp. 70.000.000',
            features: [
                'Makeup + Attire Pengantin Akad & Resepsi',
                'Makeup + Attire Orang Tua & Penerima Tamu',
                'Dekorasi Pelaminan 6 Meter + Area Gate Masuk',
                'Catering 500 Pax ( 7 Buffet, 3 Stall, 3 Dessert )',
                'Photo 1 Album Magazine & Video Cinematic',
                'Musik 1 Singer, 2 Player + Soundsystem',
                'MC Professional',
                '6 Crew Wedding Organizer',
                'Bonus: Photobooth, Preweeding, Buku tamu, Kuetart 3 Tingkat'
            ],
            cta: 'Pesan Sekarang',
            category: 'Wedding Package'
        },
        {
            id: 'svc-003',
            title: 'Eternal Bliss 750 Pax',
            image: '../images/eternalbliss.jpeg',
            rating: 5,
            price_old: 'Rp. 90.000.000',
            price: 'Rp. 85.000.000',
            features: [
                'Makeup + Attire Pengantin Akad & Resepsi',
                'Makeup + Attire Orang Tua & Penerima Tamu',
                'Dekorasi Pelaminan 8 Meter + Area Gate Masuk',
                'Catering 750 Pax ( 7 Buffet, 3 Stall, 3 Dessert )',
                'Photo 2 Album Magazine & Video Cinematic',
                'Musik 1 Singer, 3 Player + Soundsystem',
                'MC Professional',
                '7 Crew Wedding Organizer',
                'Bonus: Photobooth, Preweeding, Buku tamu, Kuetart 4 Tingkat'
            ],
            cta: 'Pesan Sekarang',
            category: 'Wedding Package'
        },
        {
            id: 'svc-004',
            title: 'Celestial Grandeur 1000 Pax',
            image: '../images/celestialgrandeur.jpeg',
            rating: 5,
            price_old: 'Rp. 100.000.000',
            price: 'Rp. 95.000.000',
            features: [
                'Makeup + Attire Pengantin Akad & Resepsi',
                'Makeup + Attire Orang Tua & Penerima Tamu',
                'Dekorasi Pelaminan 10 Meter + Area Gate Masuk',
                'Catering 1000 Pax ( 7 Buffet, 3 Stall, 3 Dessert )',
                'Photo 2 Album Magazine & Video Cinematic',
                'Musik 2 Singer, 3 Player + Soundsystem',
                'MC Professional',
                '7 Crew Wedding Organizer',
                'Bonus: Photobooth, Preweeding, Buku tamu, Coffeebreak 100 pax, kue tart 7 Tingkat '
            ],
            cta: 'Pesan Sekarang',
            category: 'Wedding Package'
        },
        {
            id: 'svc-005',
            title: 'Serenity Heritage 300 Pax',
            image: '../images/serenityheritage.jpg',
            rating: 4,
            price_old: 'Rp. 60.000.000',
            price: 'Rp. 55.000.000',
            features: [
                'Makeup + Attire Pengantin Akad & Resepsi',
                'Makeup + Attire Orang Tua & Penerima Tamu',
                'Dekorasi Pelaminan 6 Meter + Area Gate Masuk',
                'Catering 300 Pax ( 7 Buffet, 3 Stall, 3 Dessert )',
                'Photo 1 Album Magazine & Video Cinematic',
                'Musik 1 Singer, 2 Player + Soundsystem',
                'MC Professional',
                '5 Crew Wedding Organizer',
                'Bonus: Photobooth, Buku Tamu, Kuetart 3 Tingkat'
            ],
            cta: 'Konsultasi Sekarang',
            category: 'Wedding Package'
        },
        {
            id: 'svc-006',
            title: 'Divine Promise (Custom)',
            image: '../images/divinepromise.jpg',
            rating: 4,
            price: 'Contact for price',
            features: [
                'Contact For Custom Features'
            ],
            cta: 'Pesan Sekarang',
            category: 'Wedding Package'
        }
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
        btn.href = 'payment.html?package=' + encodeURIComponent(svc.title) + '&price=' + encodeURIComponent(svc.price) + '&id=' + svc.id;
        btn.className = 'btn btn-primary';
        btn.innerText = svc.cta;
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

    // auto render on DOM ready
    document.addEventListener('DOMContentLoaded', function(){
        renderServicesList();
    });

})();
