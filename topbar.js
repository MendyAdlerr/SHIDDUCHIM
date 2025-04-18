// טעינת סרגל עליון דינמי עם תמונה וכותרת
fetch("topbar.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("topbar-placeholder").innerHTML = html;
  });





    // שלב 1: זיהוי שם הקובץ (למשל "profile.html")
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf("/") + 1);

    // שלב 2: טבלה של כותרות לפי דף
    const titles = {
      "UNDEX.html": "הפרופיל שלי",
      "home.html": "עמוד הבית",
      "Suggestions.html": "מערכת הצגת נתונים",
      "messages.html": "הודעות"
    };

    // שלב 3: הכנסה לסרגל
    const titleEl = container.querySelector("#page-title");
    if (titleEl && titles[filename]) {
      titleEl.textContent = titles[filename];
    }



    // גלילה מעלימה את הסרגל העליון
    let lastScrollTop = 0;
    window.addEventListener("scroll", function() {
      let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const topbar = document.querySelector(".topbar");
      if (currentScroll > lastScrollTop && currentScroll > 30){
        topbar.style.top = "-70px";
      } else {
        topbar.style.top = "0";
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, false);
  });
