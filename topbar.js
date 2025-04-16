// טעינת סרגל עליון דינמי עם תמונה וכותרת
fetch("topbar.html")
  .then(res => res.text())
  .then(html => {
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.prepend(container);

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
