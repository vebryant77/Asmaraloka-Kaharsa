// venue.js - render venue items on venue.html
(function(){
  'use strict';

  var venues = [
    {
      id: 'v-001',
      title: 'Swiss-Belinn Hotel',
      image: '../images/swissbelinn.jpg',
      location: 'Surabaya',
      capacity: '300 Pax',
      price: 'Rp. 30.000.000 - Rp. 65.000.000'
    },
    {
      id: 'v-002',
      title: 'Majapahit Hotel',
      image: '../images/HotelMajapahit.jpg',
      location: 'Surabaya',
      capacity: '300 Pax',
      price: 'Rp. 55.000.000 - Rp. 110.000.000'
    },
    {
      id: 'v-003',
      title: 'Four Points Hotel',
      image: '../images/fp.jpeg',
      location: 'Suarabaya',
      capacity: '300 Pax',
      price: 'Rp. 40.000.000 - Rp. 90.000.000'
    }
  ];

  function createVenueCard(v){
    var col = document.createElement('div');
    col.className = 'col-md-4 col-sm-6';

    var item = document.createElement('div');
    item.className = 'fh5co-listing-item';

    var img = document.createElement('div');
    img.className = 'image';
    img.style.backgroundImage = 'url(' + v.image + ')';
    item.appendChild(img);

    var content = document.createElement('div');
    content.className = 'listing-content';

    var h3 = document.createElement('h3'); h3.innerText = v.title; content.appendChild(h3);
    var meta = document.createElement('p'); meta.className = 'meta'; meta.innerText = v.location + ' • ' + v.capacity; content.appendChild(meta);
    var price = document.createElement('p'); price.className = 'price'; price.innerText = v.price; content.appendChild(price);

    var btn = document.createElement('a');
    var waMessage = 'Saya tertarik dengan venue ' + v.title + ' dengan kapasitas ' + v.capacity;
    btn.href = 'https://wa.me/+6281252264470?text=' + encodeURIComponent(waMessage);
    btn.target = '_blank';
    btn.className = 'btn btn-primary';
    btn.innerHTML = '<i class="icon-whatsapp"></i> Lihat Detail';
    content.appendChild(btn);

    item.appendChild(content);
    col.appendChild(item);
    return col;


  }

  function renderVenues(){
    var container = document.getElementById('services-container');
    if (!container) return;
    container.innerHTML = '';
    venues.forEach(function(v){
      container.appendChild(createVenueCard(v));
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    // only render when on venue.html to avoid collision with services rendering
    var path = window.location.pathname.toLowerCase();
    if (path.indexOf('venue') !== -1 || path.indexOf('venue.html') !== -1) {
      renderVenues();
      // expose for debugging
      window.VENUES = venues;
      window.renderVenues = renderVenues;
    }
  });

})();
