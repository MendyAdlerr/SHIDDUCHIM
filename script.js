// התחברות
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    if (password.length < 6) {
      alert('הסיסמה צריכה להיות לפחות 6 תווים');
      return;
    }
    console.log('שליחת בקשת התחברות:', { email, password });
  });
}

// הרשמה
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    if (password.length < 6 || password !== confirm) {
      alert('בדוק שהסיסמה באורך מתאים ותואמת לאימות');
      return;
    }
    console.log('שליחת בקשת הרשמה:', { name, email, password });
  });
}

// איפוס סיסמה
const forgotForm = document.getElementById('forgot-form');
if (forgotForm) {
  forgotForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;
    console.log('בקשה לשחזור סיסמה ל:', email);
  });
}
