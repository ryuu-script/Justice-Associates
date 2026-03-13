const THEME_KEY = 'ja-theme';
const toggle = document.getElementById('theme-toggle');

function setTheme(name) {
  document.documentElement.dataset.theme = name;
  localStorage.setItem(THEME_KEY, name);

  if (!toggle) return;

  // show the icon for the theme that will be enabled next
  toggle.textContent = name === 'light' ? '' : '';
  toggle.setAttribute('aria-label', `Switch to ${name === 'light' ? 'dark' : 'light'} mode`);
}

function initTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  setTheme(theme);
}

if (toggle) {
  toggle.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    setTheme(current === 'light' ? 'dark' : 'light');
  });
}

// Mobile navigation
const mobileMenuOpen = document.getElementById('mobile-menu-open');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileSidebar = document.getElementById('mobile-sidebar');
const mobileThemeToggle = document.getElementById('theme-toggle-mobile');

function setSidebarOpen(isOpen) {
  if (!mobileSidebar) return;
  mobileSidebar.classList.toggle('open', isOpen);
  mobileSidebar.setAttribute('aria-hidden', String(!isOpen));
  if (mobileMenuOpen) mobileMenuOpen.setAttribute('aria-expanded', String(isOpen));
}

if (mobileMenuOpen) {
  mobileMenuOpen.addEventListener('click', () => setSidebarOpen(true));
}

if (mobileMenuClose) {
  mobileMenuClose.addEventListener('click', () => setSidebarOpen(false));
}

if (mobileThemeToggle) {
  mobileThemeToggle.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    setTheme(current === 'light' ? 'dark' : 'light');
  });
}

// Close mobile menu on outside click
document.addEventListener('click', (event) => {
  if (!mobileSidebar || !mobileSidebar.classList.contains('open')) return;
  const target = event.target;
  if (target === mobileMenuOpen || mobileSidebar.contains(target)) return;
  setSidebarOpen(false);
});

// Ensure theme is initialized whether or not DOMContentLoaded has already fired
document.addEventListener('DOMContentLoaded', initTheme);
if (document.readyState !== 'loading') {
  initTheme();
}

// mobile scrolling
document.querySelectorAll('.mobile-sidebar nav a').forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('open');
  });
});