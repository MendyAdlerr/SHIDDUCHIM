import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://fannhshmrvgwhqgnzgsp.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhbm5oc2htcnZnd2hxZ256Z3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMTczMTgsImV4cCI6MjA1NjU5MzMxOH0.duVlDi7OpY6ZhQ5FLfj76gNi5MTc8Y9sZDK895lf5-Q";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signinBtn = document.getElementById("signinBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginForm = document.getElementById("login-form");
const userProfile = document.getElementById("user-profile");
const userEmailElement = document.getElementById("user-email");

// בדיקת מצב משתמש ראשוני
async function checkUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    showUserProfile(user);
  } else {
    showLoginForm();
  }
}

// הצגת טופס כניסה
function showLoginForm() {
  loginForm.classList.remove("hidden");
  userProfile.classList.add("hidden");
}

// הצגת פרופיל משתמש
function showUserProfile(user) {
  loginForm.classList.add("hidden");
  userProfile.classList.remove("hidden");
  userEmailElement.textContent = user.email;
}

// הרשמה
signupBtn.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) throw error;

    alert("אנא בדוק את תיבת הדואר האלקטרוני שלך לאישור");
    console.log("נתוני הרשמה:", data);
  } catch (error) {
    alert("שגיאה בהרשמה: " + error.message);
    console.error("שגיאה בהרשמה:", error);
  }
});

// כניסה
signinBtn.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;

    showUserProfile(data.user);
    alert("התחברת בהצלחה");
    console.log("נתוני כניסה:", data);
  } catch (error) {
    alert("שגיאה בכניסה: " + error.message);
    console.error("שגיאה בכניסה:", error);
  }
});

// קבל הפניה ללחצן החדש
const newRecordBtn = document.getElementById("new-record-btn");

// בדיקה אם המשתמש מחובר כאשר הדף נטען
window.addEventListener("DOMContentLoaded", async () => {
  // אם אתה משתמש ב-Supabase, בדוק את המצב הנוכחי של ההתחברות
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    // המשתמש מחובר, הצג את הלחצן
    newRecordBtn.style.display = "block";
  }


/* 
        // אם אתה משתמש במערכת אחרת, בדוק את המצב הנוכחי בצורה שמתאימה לך
        // לדוגמה, בדיקה לפי localStorage
        if (localStorage.getItem('userToken')) {
            newRecordBtn.style.display = 'block';
        }
        */

});

// הוספת event listener ללחצן שמעביר לדף הטופס החדש
newRecordBtn.addEventListener("click", () => {
  window.location.href = "new-record-form.html";
});

// פונקציה להצגת הכפתור לאחר התחברות מוצלחת
// קרא לפונקציה זו לאחר התחברות מוצלחת בקוד הקיים שלך
function showNewRecordButton() {
  newRecordBtn.style.display = "block";
}


// התנתקות
logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  showLoginForm();
  emailInput.value = "";
  passwordInput.value = "";
});





// בדיקה ראשונית
checkUser();
