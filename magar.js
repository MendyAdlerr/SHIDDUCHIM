import { createClient } from "https://esm.sh/@supabase/supabase-js";

// הגדרת Supabase
const supabaseUrl = "https://fannhshmrvgwhqgnzgsp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhbm5oc2htcnZnd2hxZ256Z3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMTczMTgsImV4cCI6MjA1NjU5MzMxOH0.duVlDi7OpY6ZhQ5FLfj76gNi5MTc8Y9sZDK895lf5-Q";
const supabase = createClient(supabaseUrl, supabaseKey);

// משתנים גלובליים
let allData = [];
let currentViewMode = "cards";

// אתחול בטעינת הדף
document.addEventListener("DOMContentLoaded", () => {
  // טען את הנתונים מיד
  fetchData();

  // הגדר מאזיני אירועים
  setupEventListeners();
});

// הגדרת מאזיני אירועים
function setupEventListeners() {
  // חיפוש
  document.getElementById("search-input").addEventListener("input", (e) => {
    filterData(e.target.value);
  });

  // מעבר לתצוגת כרטיסיות
  document.getElementById("cards-view-button").addEventListener("click", () => {
    setViewMode("cards");
  });

  // מעבר לתצוגת טבלה
  document.getElementById("table-view-button").addEventListener("click", () => {
    setViewMode("table");
  });
}

// קבלת נתונים מ-Supabase
async function fetchData() {
  try {
    document.getElementById("loading-indicator").classList.remove("hidden");
    document.getElementById("cards-view").classList.add("hidden");
    document.getElementById("table-view").classList.add("hidden");
    document.getElementById("no-results").classList.add("hidden");

    // שנה את 'your_table' לשם הטבלה שלך בפועל
    const { data, error } = await supabase.from("shidduchim").select("*");

    if (error) throw error;

    allData = data;
    renderData(allData);
  } catch (error) {
    console.error("שגיאה בטעינת נתונים:", error.message);
    // במקרה של שגיאה, אפשר להציג הודעה למשתמש
    showErrorMessage("אירעה שגיאה בטעינת הנתונים. אנא נסה שוב מאוחר יותר.");
  } finally {
    document.getElementById("loading-indicator").classList.add("hidden");
  }
}

// הצגת הודעת שגיאה
function showErrorMessage(message) {
  const noResults = document.getElementById("no-results");
  noResults.textContent = message;
  noResults.classList.remove("hidden");
}

// סינון נתונים לפי מחרוזת חיפוש
function filterData(searchTerm) {
  if (!searchTerm.trim()) {
    renderData(allData);
    return;
  }

  const searchLower = searchTerm.toLowerCase();
  const filteredData = allData.filter((item) =>
    Object.values(item).some(
      (val) => val && val.toString().toLowerCase().includes(searchLower)
    )
  );

  renderData(filteredData);
}

// שינוי מצב תצוגה (כרטיסיות/טבלה)
function setViewMode(mode) {
  currentViewMode = mode;

  // עדכון הכפתורים
  document
    .getElementById("cards-view-button")
    .classList.toggle("active", mode === "cards");
  document
    .getElementById("table-view-button")
    .classList.toggle("active", mode === "table");

  // עדכון התצוגה
  document
    .getElementById("cards-view")
    .classList.toggle("hidden", mode !== "cards");
  document
    .getElementById("table-view")
    .classList.toggle("hidden", mode !== "table");

  // רינדור הנתונים בפורמט הנבחר
  renderData(allData);
}

// הצגת הנתונים לפי מצב התצוגה הנוכחי
function renderData(data) {
  if (data.length === 0) {
    document.getElementById("no-results").classList.remove("hidden");
    document.getElementById("cards-view").classList.add("hidden");
    document.getElementById("table-view").classList.add("hidden");
    return;
  }

  document.getElementById("no-results").classList.add("hidden");

  if (currentViewMode === "cards") {
    renderCardsView(data);
    document.getElementById("cards-view").classList.remove("hidden");
    document.getElementById("table-view").classList.add("hidden");
  } else {
    renderTableView(data);
    document.getElementById("cards-view").classList.add("hidden");
    document.getElementById("table-view").classList.remove("hidden");
  }
}

// הצגת הנתונים בפורמט כרטיסיות
function renderCardsView(data) {
  const cardsContainer = document.getElementById("cards-view");
  cardsContainer.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = item.title || item.name || `פריט ${item.id}`;

    const details = document.createElement("div");
    details.className = "card-details";

    for (const [key, value] of Object.entries(item)) {
      // התעלם מכמה שדות מיוחדים
      if (key === "id" || key === "created_at" || key === "updated_at")
        continue;

      const row = document.createElement("div");
      row.className = "card-row";

      const keySpan = document.createElement("span");
      keySpan.className = "card-key";
      keySpan.textContent = key + ":";

      const valueSpan = document.createElement("span");
      valueSpan.className = "card-value";
      valueSpan.textContent = value?.toString() || "-";

      row.appendChild(keySpan);
      row.appendChild(valueSpan);
      details.appendChild(row);
    }

    card.appendChild(title);
    card.appendChild(details);
    cardsContainer.appendChild(card);
  });
}

// הצגת הנתונים בפורמט טבלה
function renderTableView(data) {
  const tableHeader = document
    .getElementById("table-header")
    .querySelector("tr");
  const tableBody = document.getElementById("table-body");

  tableHeader.innerHTML = "";
  tableBody.innerHTML = "";

  // יצירת כותרות הטבלה
  if (data.length > 0) {
    for (const key of Object.keys(data[0])) {
      // אופציונלי: סינון שדות מיוחדים
      // if (key === 'created_at' || key === 'updated_at') continue;

      const th = document.createElement("th");
      th.textContent = key;
      tableHeader.appendChild(th);
    }
  }

  // יצירת שורות נתונים
  data.forEach((item) => {
    const tr = document.createElement("tr");

    for (const [key, value] of Object.entries(item)) {
      // אופציונלי: סינון שדות מיוחדים
      // if (key === 'created_at' || key === 'updated_at') continue;

      const td = document.createElement("td");
      td.textContent = value?.toString() || "-";
      tr.appendChild(td);
    }

    tableBody.appendChild(tr);
  });
}
