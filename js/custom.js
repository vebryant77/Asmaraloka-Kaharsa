// custom.js - handle selection and redirect to form page with selected services
(function(){
    document.addEventListener('DOMContentLoaded', function(){
        var btn = document.getElementById('btn-confirm-custom');
        if (!btn) return;
        btn.addEventListener('click', function(){
            var checked = Array.prototype.slice.call(document.querySelectorAll('#custom-select-form input[name="service"]:checked'))
                .map(function(i){ return i.value; });
            if (checked.length === 0) {
                alert('Pilih minimal satu layanan');
                return;
            }
            // save to sessionStorage and redirect
            sessionStorage.setItem('custom_selected_services', JSON.stringify(checked));
            // optionally save user info later
            window.location.href = 'custom-form.html';
        });
    });
})();
