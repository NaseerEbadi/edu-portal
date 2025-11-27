// ==========================
// TRANSLATION DATA
// ==========================
const textB = {
  fa: {
    dir: "rtl",
    lang: "fa",
    centreName: "مرکز آموزشی انجنیر نصیر احمد عبادی",
    centreTag: "با ما در مسیر آموزش معیاری همراه شوید",
    heroTitle: "به مرکز آموزشی انجنیر نصیر احمد عبادی خوش آمدید",
    heroText:
      "آموزش ریاضیات، فزیک، کیمیا، آمادگی کانکور، زبان‌های انگلیسی و آلمانی و مهارت‌های کمپیوتر — با استادان مجرب و روش‌های نوین آموزشی برای رسیدن به بالاترین موفقیت تحصیلی و مهارتی.",
    btnCourses: "مشاهده دوره‌ها",
    btnContact: "درخواست مشاوره رایگان",
    nav: ["خانه", "درباره ما", "دوره‌ها", "گالری", "تماس"],
    contactTitle: "آدرس و راه‌های ارتباطی",
    footerText: "مرکز آموزشی انجنیر نصیر احمد عبادی"
  },

  en: {
    dir: "ltr",
    lang: "en",
    centreName: "Engineer Naseer Ahmad Ebadi Academic Center",
    centreTag: "Join us on the path of quality education",
    heroTitle: "Welcome to the Engineer Naseer Ahmad Ebadi Academic Center",
    heroText:
      "Teaching Mathematics, Physics, Chemistry, university entrance exam preparation, English and German languages, and computer skills — with experienced instructors and modern teaching methods to achieve the highest academic and professional success.",
    btnCourses: "View Courses",
    btnContact: "Book Free Consultation",
    nav: ["Home", "About", "Courses", "Gallery", "Contact"],
    contactTitle: "Address & Contact",
    footerText: "Engineer Naseer Ahmad Ebadi Academic Centre"
  },
};

let lang = localStorage.getItem("siteLang") || "fa";

// ==========================
// APPLY TRANSLATION
// ==========================
function applyBilingual() {
  const L = textB[lang];

  document.documentElement.dir = L.dir;
  document.documentElement.lang = L.lang;

  // Header titles
  const centreNameEl = document.getElementById("heroCentre") || document.getElementById("centreName");
  if (centreNameEl) centreNameEl.textContent = L.centreName;

  const centreTagEl = document.getElementById("centreTag");
  if (centreTagEl) centreTagEl.textContent = L.centreTag;

  // Hero section
  const heroTitle = document.getElementById("heroTitle");
  if (heroTitle) heroTitle.textContent = L.heroTitle;

  const heroText = document.getElementById("heroText");
  if (heroText) heroText.textContent = L.heroText;

  const btnCourses = document.getElementById("btnCourses");
  if (btnCourses) btnCourses.textContent = L.btnCourses;

  const btnContact = document.getElementById("btnContact");
  if (btnContact) btnContact.textContent = L.btnContact;

  // Navigation links
  document.querySelectorAll("#mainMenu [data-scroll]").forEach((a, i) => {
    if (L.nav[i]) a.textContent = L.nav[i];
  });

  // About, courses titles
  const aboutTitle = document.getElementById("aboutTitle");
  if (aboutTitle) aboutTitle.textContent = L.nav[1] === "درباره ما" ? aboutTitle.textContent = (lang === "fa" ? "درباره ما" : "About") : aboutTitle.textContent = (lang === "fa" ? "درباره ما" : "About");

  const coursesTitle = document.getElementById("coursesTitle");
  if (coursesTitle) coursesTitle.textContent = L.nav[2] === "دوره‌ها" ? coursesTitle.textContent = (lang === "fa" ? "دوره‌های ما" : "Courses") : coursesTitle.textContent = (lang === "fa" ? "دوره‌های ما" : "Courses");

  // Contact/aside
  const contactTitle = document.getElementById("contactTitle");
  if (contactTitle) contactTitle.textContent = L.contactTitle;

  // Footer
  const footerText = document.getElementById("footerText");
  if (footerText) footerText.textContent = L.footerText;

  // toggleLang button text
  const toggleBtn = document.getElementById("toggleLang");
  if (toggleBtn) toggleBtn.textContent = lang === "fa" ? "EN" : "FA";

  // Save choice
  localStorage.setItem("siteLang", lang);
}

// ==========================
// IMAGE ZOOM OVERLAY
// ==========================
function enableImageZoom() {
  const zoom = document.createElement("div");
  zoom.id = "zoomOverlay";
  zoom.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.65);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 2000;
  `;

  zoom.innerHTML = `
      <img id="zoomImg" style="max-width: 90%; max-height: 90%; border-radius: 12px;">
      <div style="position:absolute; top:20px; right:20px; cursor:pointer; font-size:32px; color:white;">✖</div>
  `;

  document.body.appendChild(zoom);

  // Open zoom
  document.querySelectorAll("#galleryGrid img").forEach((img) => {
    img.addEventListener("click", () => {
      document.getElementById("zoomImg").src = img.getAttribute("data-src") || img.src;
      zoom.style.display = "flex";
    });
  });

  // Close zoom
  zoom.addEventListener("click", (e) => {
    if (e.target.id === "zoomOverlay" || e.target.textContent === "✖") {
      zoom.style.display = "none";
    }
  });

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") zoom.style.display = "none";
  });
}

// ==========================
// SMOOTH SCROLL
// ==========================
function enableSmoothScroll() {
  document.querySelectorAll("[data-scroll]").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;

      window.scrollTo({
        top: target.offsetTop - 90,
        behavior: "smooth",
      });

      // Close navbar on mobile
      const menu = document.getElementById("mainMenu");
      if (menu && menu.classList.contains("show")) new bootstrap.Collapse(menu).hide();
    });
  });
}

// ==========================
// SCROLL REVEAL (IntersectionObserver)
// ==========================
function enableScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // optional: unobserve after reveal to reduce work
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });
}

// ==========================
// DARK MODE TOGGLE
// ==========================
function initThemeToggle() {
  const themeBtn = document.getElementById("toggleTheme");
  const saved = localStorage.getItem("siteTheme");

  if (saved === "dark") document.body.classList.add("dark-mode");

  function updateButton() {
    if (document.body.classList.contains("dark-mode")) {
      if (themeBtn) themeBtn.textContent = "☀️";
    } else {
      if (themeBtn) themeBtn.textContent = "🌙";
    }
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem("siteTheme", document.body.classList.contains("dark-mode") ? "dark" : "light");
      updateButton();
    });
  }

  updateButton();
}

// ==========================
// INITIALIZE
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  applyBilingual();
  enableImageZoom();
  enableSmoothScroll();

  // Toggle language (existing button)
  const toggler = document.getElementById("toggleLang");
  if (toggler) {
    toggler.addEventListener("click", () => {
      lang = lang === "fa" ? "en" : "fa";
      applyBilingual();
    });
  }

  // Initialize dark mode toggle
  initThemeToggle();

  // Scroll reveal
  enableScrollReveal();
});

// ==========================
// WHATSAPP FORM SENDER
// ==========================

  function sendToWhatsApp(event) {
    event.preventDefault(); // prevent default form submission

    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;
    const subject = document.getElementById("subjectInput").value;
    const message = document.getElementById("messageInput").value;

    const phone = "93780603090"; // WhatsApp number without '+'
    const text = `نام: ${name}\nایمیل: ${email}\nموضوع: ${subject}\nپیام: ${message}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
  }



