// Theme initialization script
document.addEventListener('DOMContentLoaded', () => {
  // Get the current theme
  const getTheme = () => {
    if (typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Initialize theme
  const initializeTheme = () => {
    const theme = getTheme();
    document.documentElement.classList.toggle('dark', theme === 'dark');
    return theme;
  };

  // Initialize theme
  initializeTheme();
}); 