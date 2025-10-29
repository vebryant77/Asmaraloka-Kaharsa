// custom-form.js - read selected services and render dropdowns with options
(function(){
    'use strict';

    var options = {
        wo: [ 'WO A', 'WO B', 'WO C' ],
        venue: [ 'Venue A', 'Venue B', 'Venue C' ],
        catering: [ 'Catering A', 'Catering B', 'Catering C' ],
        deco: [ 'Dekor A', 'Dekor B', 'Dekor C' ],
        makeup: [ 'Makeup A', 'Makeup B', 'Makeup C' ],
        docu: [ 'Dokumentasi A', 'Dokumentasi B', 'Dokumentasi C' ]
    };

    function createDropdown(key, label){
        var wrapper = document.createElement('div');
        wrapper.className = 'form-group';
        var lbl = document.createElement('label');
        lbl.innerText = label + ' *';
        wrapper.appendChild(lbl);
        var select = document.createElement('select');
        select.className = 'form-control';
        select.name = key + '_vendor';
        var opt0 = document.createElement('option'); opt0.value=''; opt0.innerText='Select a vendor'; select.appendChild(opt0);
        (options[key] || []).forEach(function(v){
            var o = document.createElement('option'); o.value=v; o.innerText=v; select.appendChild(o);
        });
        wrapper.appendChild(select);

        // detail dropdown
        var selectDetail = document.createElement('select');
        selectDetail.className = 'form-control';
        selectDetail.name = key + '_detail';
        selectDetail.style.marginTop = '10px';
        var o0 = document.createElement('option'); o0.value=''; o0.innerText='Select a detail'; selectDetail.appendChild(o0);
        ['Standard','Premium','VIP'].forEach(function(d){ var o = document.createElement('option'); o.value=d; o.innerText=d; selectDetail.appendChild(o); });
        wrapper.appendChild(selectDetail);

        return wrapper;
    }

    document.addEventListener('DOMContentLoaded', function(){
        var sel = sessionStorage.getItem('custom_selected_services');
        var services = [];
        try { services = JSON.parse(sel) || []; } catch(e){ services = []; }
        var container = document.getElementById('form-fields');
        if (!container) return;
        if (services.length === 0) {
            container.innerHTML = '<p>Tidak ada layanan terpilih. Kembali ke halaman custom untuk memilih.</p>';
            return;
        }
        var mapLabel = { wo: 'Wedding Organizer', venue: 'Venue', catering: 'Catering', deco:'Dekorasi', makeup:'Makeup & Attire', docu:'Dokumentasi' };
        services.forEach(function(s){
            var key = s;
            var label = mapLabel[s] || s;
            var el = createDropdown(key, label);
            container.appendChild(el);
        });

        // simple user info mock (could be stored earlier)
        var nameEl = document.getElementById('user-name');
        var phoneEl = document.getElementById('user-phone');
        var emailEl = document.getElementById('user-email');
        nameEl.innerText = sessionStorage.getItem('custom_user_name') || 'Roger Johnson';
        phoneEl.innerText = sessionStorage.getItem('custom_user_phone') || '08123456789';
        emailEl.innerText = sessionStorage.getItem('custom_user_email') || 'rogerj@gmail.com';

        // handle submit
        var form = document.getElementById('custom-form');
        form.addEventListener('submit', function(e){
            e.preventDefault();
            // gather values
            var data = {};
            services.forEach(function(s){
                var vendor = form.querySelector('[name="'+s+'_vendor"]').value;
                var detail = form.querySelector('[name="'+s+'_detail"]').value;
                data[s] = { vendor: vendor, detail: detail };
            });
            // store or send to server
            sessionStorage.setItem('custom_result', JSON.stringify(data));
            alert('Custom submitted. Data tersimpan (demo).');
        });
    });
})();
