async function loadHeader() {
    try {
        const response = await fetch('../layouts/Header.html');
        const html = await response.text();
        document.querySelector('header').innerHTML = html;

        // After loading the header, initialize the responsive menu
        const responsiveScript = document.createElement('script');
        responsiveScript.src = '../scripts/ResponsiveMenu.js';
        document.body.appendChild(responsiveScript);
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadHeader);