// Navigation functionality for side panel
export function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetSection = link.getAttribute('data-section');
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link and corresponding section
            link.classList.add('active');
            document.getElementById(`${targetSection}-section`).classList.add('active');
        });
    });
}