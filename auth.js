<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Kullanıcı Girişi - Parola Güç Göstergesi</title>
<style>
  body {
    font-family: Arial, sans-serif;
    max-width: 400px;
    margin: 20px auto;
    padding: 0 10px;
  }
  h2 {
    text-align: center;
  }
  form {
    margin-top: 20px;
    display: none;
  }
  form.active {
    display: block;
  }
  label {
    display: block;
    margin-top: 15px;
    font-weight: bold;
  }
  input[type="text"], input[type="password"], input[type="email"] {
    width: 100%;
    padding: 8px 40px 8px 10px;
    font-size: 16px;
    box-sizing: border-box;
  }
  .password-container {
    position: relative;
  }
  .toggle-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: #007BFF;
  }
  .strength-meter {
    height: 6px;
    background: #e0e0e0;
    border-radius: 4px;
    margin-top: 6px;
  }
  .strength-meter-fill {
    height: 100%;
    width: 0%;
    border-radius: 4px;
    transition: width 0.3s ease-in-out;
  }
  .strength-weak {
    background-color: #ff4d4d;
  }
  .strength-fair {
    background-color: #ffa500;
  }
  .strength-good {
    background-color: #cddc39;
  }
  .strength-strong {
    background-color: #4caf50;
  }
  .strength-text {
    margin-top: 4px;
    font-size: 13px;
    font-weight: bold;
    height: 18px;
  }
  button.submit-btn {
    margin-top: 15px;
    width: 100%;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
  }
  .switch-link {
    margin-top: 10px;
    text-align: center;
  }
  .switch-link a {
    cursor: pointer;
    color: #007BFF;
    text-decoration: none;
  }
  .switch-link a:hover {
    text-decoration: underline;
  }
  .message {
    margin-top: 10px;
    font-weight: bold;
    display: none;
  }
  .message.success {
    color: green;
  }
  .message.error {
    color: red;
  }
  /* Sosyal medya butonları */
  .social-buttons {
    margin-top: 20px;
    text-align: center;
  }
  .social-btn {
    background-color: #eee;
    border: none;
    padding: 8px 15px;
    margin: 5px;
    cursor: pointer;
    border-radius: 4px;
  }
</style>
</head>
<body>

<h2>Kullanıcı Girişi</h2>

<!-- Giriş Formu -->
<form id="loginForm" class="active" novalidate>
  <label for="username">Kullanıcı Adı veya E-posta</label>
  <input type="text" id="username" name="username" autocomplete="username" />

  <label for="passwordLogin">Parola</label>
  <div class="password-container">
    <input type="password" id="passwordLogin" name="password" autocomplete="current-password" />
    <button type="button" class="toggle-btn" data-target="passwordLogin">Göster</button>
  </div>

  <button type="submit" class="submit-btn">Giriş Yap</button>

  <div id="login-success" class="message success"></div>
  <div id="login-error" class="message error"></div>

  <div class="switch-link">
    Hesabınız yok mu? <a id="showRegister" tabindex="0">Kayıt Ol</a> |
    <a id="showReset" tabindex="0">Şifreni mi unuttun?</a>
  </div>
</form>

<!-- Kayıt Formu -->
<form id="registerForm" novalidate>
  <label for="regUsername">Kullanıcı Adı</label>
  <input type="text" id="regUsername" name="regUsername" autocomplete="username" />

  <label for="regEmail">E-posta</label>
  <input type="email" id="regEmail" name="regEmail" autocomplete="email" />

  <label for="regPassword">Parola</label>
  <div class="password-container">
    <input type="password" id="regPassword" name="regPassword" autocomplete="new-password" />
    <button type="button" class="toggle-btn" data-target="regPassword">Göster</button>
  </div>
  <div class="strength-meter">
    <div id="regStrengthBar" class="strength-meter-fill"></div>
  </div>
  <div id="regStrengthText" class="strength-text"></div>

  <label for="regPasswordConfirm">Parola (Tekrar)</label>
  <div class="password-container">
    <input type="password" id="regPasswordConfirm" name="regPasswordConfirm" autocomplete="new-password" />
    <button type="button" class="toggle-btn" data-target="regPasswordConfirm">Göster</button>
  </div>

  <button type="submit" class="submit-btn">Kayıt Ol</button>

  <div id="register-success" class="message success"></div>
  <div id="register-error" class="message error"></div>

  <div class="switch-link">
    Zaten hesabınız var mı? <a id="showLoginFromRegister" tabindex="0">Giriş Yap</a>
  </div>
</form>

<!-- Şifre Sıfırlama Formu -->
<form id="resetForm" novalidate>
  <label for="resetEmail">E-posta</label>
  <input type="email" id="resetEmail" name="resetEmail" autocomplete="email" />

  <button type="submit" class="submit-btn">Şifre Sıfırlama Linki Gönder</button>

  <div id="reset-success" class="message success"></div>
  <div id="reset-error" class="message error"></div>

  <div class="switch-link">
    Hatırladınız mı? <a id="showLoginFromReset" tabindex="0">Giriş Yap</a>
  </div>
</form>

<!-- Sosyal Medya Butonları (Simülasyon) -->
<div class="social-buttons">
  <button class="social-btn">Google ile Giriş</button>
  <button class="social-btn">Facebook ile Giriş</button>
  <button class="social-btn">Twitter ile Giriş</button>
</div>

<script>
  // Formlar ve elementler
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const resetForm = document.getElementById('resetForm');

  // Geçiş linkleri
  document.getElementById('showRegister').addEventListener('click', () => {
    loginForm.classList.remove('active');
    resetForm.classList.remove('active');
    registerForm.classList.add('active');
    clearMessages();
  });
  document.getElementById('showReset').addEventListener('click', () => {
    loginForm.classList.remove('active');
    registerForm.classList.remove('active');
    resetForm.classList.add('active');
    clearMessages();
  });
  document.getElementById('showLoginFromRegister').addEventListener('click', () => {
    registerForm.classList.remove('active');
    resetForm.classList.remove('active');
    loginForm.classList.add('active');
    clearMessages();
  });
  document.getElementById('showLoginFromReset').addEventListener('click', () => {
    resetForm.classList.remove('active');
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
    clearMessages();
  });

  // Mesajları temizle
  function clearMessages() {
    document.querySelectorAll('.message').forEach(m => {
      m.textContent = '';
      m.style.display = 'none';
    });
  }

  // Email kontrol fonksiyonu
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  // Mesaj gösterme fonksiyonu
  function showMessage(id, message) {
    const el = document.getElementById(id);
    el.textContent = message;
    el.style.display = 'block';
  }

  // Parola güç hesaplama (Kayıt formu için)
  const regPasswordInput = document.getElementById('regPassword');
  const regStrengthBar = document.getElementById('regStrengthBar');
  const regStrengthText = document.getElementById('regStrengthText');

  regPasswordInput.addEventListener('input', () => {
    const val = regPasswordInput.value;
    const strength = calculatePasswordStrength(val);

    regStrengthBar.style.width = strength.percent + '%';
    regStrengthBar.className = 'strength-meter-fill ' + strength.className;
    regStrengthText.textContent = strength.text;
  });

  function calculatePasswordStrength(password) {
    let score = 0;
    if (!password) return { percent: 0, text: '', className: '' };

    if (password.length >= 8) score += 25;
    else if (password.length >= 5) score += 10;

    if (/[A-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password)) score += 20;
    if (/\d/.test(password)) score += 20;
    if (/[^A-Za-z0-9]/.test(password)) score += 15;

    if (score > 100) score = 100;

    if (score < 40) return { percent: score, text: 'Zayıf', className: 'strength-weak' };
    else if (score < 70) return { percent: score, text: 'Orta', className: 'strength-fair' };
    else if (score < 90) return { percent: score, text: 'İyi', className: 'strength-good' };
    else return { percent: score, text: 'Güçlü', className: 'strength-strong' };
  }

  // Parola göster/gizle butonları
  document.querySelectorAll('.toggle-btn').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input.type === 'password') {
        input.type = 'text';
        button.textContent = 'Gizle';
      } else {
        input.type = 'password';
        button.textContent = 'Göster';
      }
    });
  });

  // Login Formu submit
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    clearMessages();

    const username = loginForm.username.value.trim();
    const password = loginForm.password.value;

    if (!username) {
      showMessage('login-error', 'Kullanıcı adı veya e-posta boş olamaz.');
      return;
    }
    if (!password) {
      showMessage('login-error', 'Parola boş olamaz.');
      return;
    }

    // Burada gerçek doğrulama yapılmalı (backend ile)
    // Simülasyon:
    showMessage('login-success', 'Giriş başarılı! (Simülasyon)');
  });

  // Register Formu submit
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    clearMessages();

    const username = registerForm.regUsername.value.trim();
    const email = registerForm.regEmail.value.trim();
    const password = registerForm.regPassword.value;
    const passwordConfirm = registerForm.regPasswordConfirm.value;

    if (!username) {
      showMessage('register-error', 'Kullanıcı adı boş olamaz.');
      return;
    }
    if (!email || !validateEmail(email)) {
      showMessage('register-error', 'Geçerli bir e-posta giriniz.');
      return;
    }
    if (!password) {
      showMessage('register-error', 'Parola boş olamaz.');
      return;
    }
    if (password !== passwordConfirm) {
      showMessage('register-error', 'Parolalar eşleşmiyor.');
      return;
    }
    // Simülasyon kayıt başarılı mesajı
    showMessage('register-success', 'Kayıt başarılı! Giriş yapabilirsiniz.');
    registerForm.reset();
    regStrengthBar.style.width = '0%';
    regStrengthText.textContent = '';
  });

  // Reset Formu submit
  resetForm.addEventListener('submit', e => {
    e.preventDefault();
    clearMessages();

    const email = resetForm.resetEmail.value.trim();
    if (!email || !validateEmail(email)) {
      showMessage('reset-error', 'Geçerli bir e-posta giriniz.');
      return;
    }
    // Simülasyon şifre sıfırlama linki gönderildi
    showMessage('reset-success', 'Şifre sıfırlama linki e-posta adresinize gönderildi.');
    resetForm.reset();
  });
</script>

</body>
</html>
