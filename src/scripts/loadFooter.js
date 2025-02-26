async function loadFooter() {
    try {
        
        const response = await fetch('../layouts/Footer.html');
        const html = await response.text();
        document.querySelector('footer').innerHTML = html;

    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadFooter);