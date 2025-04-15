import { createClient } from "https://esm.sh/@supabase/supabase-js";

// יצירת התחברות לSupabase
const supabaseUrl = "https://fannhshmrvgwhqgnzgsp.supabase.co"; // הכנס את כתובת ה-URL של הפרויקט שלך
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhbm5oc2htcnZnd2hxZ256Z3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMTczMTgsImV4cCI6MjA1NjU5MzMxOH0.duVlDi7OpY6ZhQ5FLfj76gNi5MTc8Y9sZDK895lf5-Q"; // הכנס את מפתח ה-API של הפרויקט שלך

const supabase = createClient(supabaseUrl, supabaseKey);

// הגדרת שם הטבלה
const tableName = "shidduchim"; // הכנס את שם הטבלה שאליה תרצה להוסיף רשומות

// בדיקה אם המשתמש מחובר
document.addEventListener("DOMContentLoaded", async function () {
  // בדיקת מצב ההתחברות של המשתמש
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    // המשתמש אינו מחובר, הפניה לדף ההתחברות
    window.location.href = "login.html"; // שנה לדף ההתחברות שלך
    return;
  }

  // עכשיו המשתמש מחובר וניתן להמשיך
});

// טיפול בשליחת הטופס
document
  .getElementById("recordForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // איסוף נתונים מהטופס
    const formData = {
      name: document.getElementById("name").value,
      city: document.getElementById("city").value,
      // phone: document.getElementById("phone").value,
      // comments: document.getElementById("comments").value,
      created_at: new Date(),
      user_id: (await supabase.auth.getUser()).data.user.id, // הוספת מזהה המשתמש לרשומה
    };

    // שליחת נתונים לSupabase
    const { data, error } = await supabase.from(tableName).insert([formData]);

    if (error) {
      // טיפול בשגיאה
      console.error("Error inserting record:", error);
      document.getElementById("errorMessage").style.display = "block";
      document.getElementById("successMessage").style.display = "none";
    } else {
      // הצלחה
      console.log("Record inserted successfully:", data);
      document.getElementById("successMessage").style.display = "block";
      document.getElementById("errorMessage").style.display = "none";
      document.getElementById("recordForm").reset();

      // אפשר להוסיף פה הפניה אוטומטית לדף אחר אחרי כמה שניות
      // setTimeout(function() {
      //     window.location.href = 'success.html';
      // }, 3000);
    }
  });
