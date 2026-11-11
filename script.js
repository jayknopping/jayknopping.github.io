// Theme preference: saved visitor choice wins; otherwise follow the operating system.
(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const label = document.querySelector('.theme-label');
  const year = document.querySelector('#current-year');
  const storageKey = 'jay-knopping-theme';

  let savedTheme = null;
  try {
    savedTheme = window.localStorage.getItem(storageKey);
  } catch (error) {
    // Storage can be unavailable in private or restricted browsing contexts.
  }

  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme === 'light' || savedTheme === 'dark'
    ? savedTheme
    : (systemPrefersDark ? 'dark' : 'light');

  function applyTheme(theme, savePreference = false) {
    root.dataset.theme = theme;
    const isDark = theme === 'dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    label.textContent = isDark ? 'Light mode' : 'Dark mode';

    if (savePreference) {
      try {
        window.localStorage.setItem(storageKey, theme);
      } catch (error) {
        // The current-page choice still works if storage is unavailable.
      }
    }
  }

  applyTheme(initialTheme);
  toggle.addEventListener('click', () => {
    applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
  });

  if (year) year.textContent = String(new Date().getFullYear());
})();
