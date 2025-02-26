const normalNav = document.querySelector('.flex');
const mobileNav = document.querySelector('.grid.hidden');
const menuIcon = document.querySelector('.fa-bars');
const closeIcon = document.querySelector('.fa-x');
const iconsContainer = document.querySelector('.col-span-2.flex');

// // Add click event for menu icon to open mobile nav
menuIcon.addEventListener("click", function() {
    mobileNav.classList.remove('hidden');
    menuIcon.classList.add('fa-sr-only');
    closeIcon.classList.remove('fa-sr-only');
    // Adjust icons position when menu is open
    iconsContainer.classList.add('-top-1');
});

// Add click event for close icon to close mobile nav
closeIcon.addEventListener("click", function() {
    mobileNav.classList.add('hidden');
    menuIcon.classList.remove('fa-sr-only');
    closeIcon.classList.add('fa-sr-only');
    // Reset icons position when menu is closed
    iconsContainer.classList.remove('-top-1');
});

// Function to handle responsive navigation
function handleResponsiveNav() {
    if (window.innerWidth <= 1043) { 
        normalNav.classList.add('hidden');
        menuIcon.classList.remove('fa-sr-only');
        mobileNav.classList.add('grid-cols-1', 'gap-4', 'p-4');
        iconsContainer.classList.remove('hidden');
    } else {
        normalNav.classList.remove('hidden');
        mobileNav.classList.add('hidden');
        menuIcon.classList.add('fa-sr-only');
        closeIcon.classList.add('fa-sr-only');
        mobileNav.classList.remove('grid-cols-1', 'gap-4', 'p-4');
        iconsContainer.classList.add('hidden');
    }
}

// Run on page load
handleResponsiveNav();

// Run whenever window is resized
window.addEventListener('resize', handleResponsiveNav);

