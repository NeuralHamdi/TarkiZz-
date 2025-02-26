// Sélecteurs corrigés avec vérification de l'existence
function getSunIcon() {
    return document.querySelector('#sunIcon');
}

function getMoonIcon() {
    return document.querySelector('#moonIcon');
}

// Function to enable dark mode
function enableDarkMode() {
    const sunIcon = getSunIcon();
    const moonIcon = getMoonIcon();
    
    if (sunIcon && moonIcon) {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
    
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
}

// Function to disable dark mode
function disableDarkMode() {
    const sunIcon = getSunIcon();
    const moonIcon = getMoonIcon();
    
    if (sunIcon && moonIcon) {
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    }
    
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
}

// Function to toggle dark mode
function toggleDarkMode() {
    if (document.documentElement.classList.contains('dark')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

// Function to initialize the theme based on localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
}

// Initialize theme when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
});

// Event listeners for both buttons
document.addEventListener('click', function(event) {
    if (event.target.closest('#sunIcon') || event.target.closest('#moonIcon')) {
        toggleDarkMode();
    }
});

// Observer to handle dynamically loaded buttons
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
            const sunIcon = getSunIcon();
            const moonIcon = getMoonIcon();
            
            if ((sunIcon || moonIcon) && !document.querySelector('[data-theme-initialized]')) {
                if (sunIcon) sunIcon.setAttribute('data-theme-initialized', 'true');
                if (moonIcon) moonIcon.setAttribute('data-theme-initialized', 'true');
                initializeTheme();
            }
        }
    });
});

// Start observing the document body for changes
observer.observe(document.body, {
    childList: true,
    subtree: true
});