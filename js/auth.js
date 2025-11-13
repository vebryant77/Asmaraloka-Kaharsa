document.addEventListener('DOMContentLoaded', function () {
  // Simple client-side auth simulation using localStorage
  function escapeHtml(s){ return String(s).replace(/[&<>\"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }

  var user = null;
  try { user = JSON.parse(localStorage.getItem('asmaralokaUser')); } catch(e){ user = null; }

  var navAuth = document.getElementById('nav-auth');
  if(navAuth){
    navAuth.style.position = 'relative';
    if(user && user.username){
      // show user avatar image + username with dropdown
  var avatarSrc = (user.avatar && typeof user.avatar === 'string') ? user.avatar : 'images/user-icon.svg';
      navAuth.innerHTML = '' +
        '<a href="#" class="nav-user">' +
          '<span class="nav-user-avatar"><img src="'+ escapeHtml(avatarSrc) +'" alt="avatar"></span>' +
          '<span class="nav-user-name">'+ escapeHtml(user.username) +'</span>' +
        '</a>' +
        '<ul class="nav-user-dropdown">' +
          '<li><a href="profile.html">Profile</a></li>' +
          '<li><a href="#" id="logoutLink">Logout</a></li>' +
        '</ul>';

      var togg = navAuth.querySelector('.nav-user');
      var dropdown = navAuth.querySelector('.nav-user-dropdown');
      togg.addEventListener('click', function(e){ e.preventDefault(); dropdown.classList.toggle('open'); });
      document.addEventListener('click', function(e){ if(!navAuth.contains(e.target)) dropdown.classList.remove('open'); });
      var logout = navAuth.querySelector('#logoutLink');
      logout.addEventListener('click', function(e){ e.preventDefault(); localStorage.removeItem('asmaralokaUser'); location.reload(); });
    } else {
      // show 'Login' text linking to login page
      navAuth.innerHTML = '<a href="login.html">Login</a>';
    }
  }

  // Login form handling (if we're on login page)
  var loginForm = document.getElementById('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', function(e){
      e.preventDefault();
      var usernameEl = document.getElementById('username');
      var uname = usernameEl ? usernameEl.value.trim() : '';
      if(!uname){ alert('Masukkan Username'); if(usernameEl) usernameEl.focus(); return; }
      // store lightweight user object
      localStorage.setItem('asmaralokaUser', JSON.stringify({ username: uname }));
  // set a flash message for the next page load
  try { localStorage.setItem('asmaralokaFlash', JSON.stringify({ type: 'success', text: 'Selamat datang, ' + uname + '!' })); } catch(e){}
  // redirect after login — prefer form's data-redirect if provided (e.g., indexlog.html)
  var redirectTarget = 'index.html';
  try { if(loginForm && loginForm.dataset && loginForm.dataset.redirect) redirectTarget = loginForm.dataset.redirect; } catch(e){}
  window.location.href = redirectTarget;
    });
  }

  // show any flash message stored in localStorage (then remove)
  (function showFlashIfAny(){
    try{
      var f = JSON.parse(localStorage.getItem('asmaralokaFlash'));
      if(f && f.text){
        var toast = document.createElement('div');
        toast.className = 'auth-toast ' + (f.type || 'info');
        toast.innerText = f.text;
        document.body.appendChild(toast);
        setTimeout(function(){ toast.classList.add('visible'); }, 50);
        setTimeout(function(){ toast.classList.remove('visible'); setTimeout(function(){ document.body.removeChild(toast); },300); }, 4200);
      }
    }catch(e){}
    try{ localStorage.removeItem('asmaralokaFlash'); }catch(e){}
  })();
});
