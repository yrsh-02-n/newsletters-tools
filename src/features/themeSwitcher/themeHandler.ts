export const toggleTheme = (currentTheme: string) => {
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  // Save theme
  document.documentElement.className = newTheme;
  document.documentElement.setAttribute('data-theme', newTheme);

  localStorage.setItem('theme', newTheme);

  return newTheme;
};

// Get theme
export const getSavedTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light'; // Для SSR

  const savedTheme = localStorage.getItem('theme');
  return savedTheme === 'dark' ? 'dark' : 'light';
};