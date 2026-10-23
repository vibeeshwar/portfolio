// ===== THEME TOGGLE =====
const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("vibeeshwar-theme");

if (savedTheme === "light") {
  document.body.classList.add("light-mode");
}
updateThemeButton();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const theme = document.body.classList.contains("light-mode") ? "light" : "dark";
  localStorage.setItem("vibeeshwar-theme", theme);
  updateThemeButton();
});

function updateThemeButton() {
  const isLight = document.body.classList.contains("light-mode");
  themeToggle.textContent = isLight ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  themeToggle.title = isLight ? "Switch to dark mode" : "Switch to light mode";
}

// ===== MOBILE NAVIGATION =====
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// ===== SCROLL REVEAL ANIMATIONS =====
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 450);
}, { passive: true });

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
}

// ===== CURRENT YEAR =====
document.getElementById("current-year").textContent = new Date().getFullYear();
