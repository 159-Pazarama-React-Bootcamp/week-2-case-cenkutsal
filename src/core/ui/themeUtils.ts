import { AppTheme } from '../context/AppContext';

function getInitialTheme() {
    let initialTheme: AppTheme;

    try {
        //checks the browser theme and sets the theme in localStorage to the browser's current theme
        const isBrowserDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const storedTheme = localStorage.getItem('theme') as AppTheme | null;

        if (storedTheme && (storedTheme === 'white' || storedTheme === 'dark')) {
            initialTheme = storedTheme;
        } else {
            initialTheme = isBrowserDarkTheme ? 'dark' : 'white';
        }
    } catch (error) {
        initialTheme = 'white';
    }

    return initialTheme;
}
export { getInitialTheme };
