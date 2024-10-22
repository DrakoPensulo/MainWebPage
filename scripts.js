document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    let currentSectionIndex = 0;
    let isScrolling = false;

    const scrollToSection = (index) => {
        if (index < 0 || index >= sections.length) return;
        isScrolling = true;
        sections[index].scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            isScrolling = false;
            currentSectionIndex = index;
        }, 1000); // Adjust timeout to match the smooth scroll duration
    };

    window.addEventListener('wheel', (event) => {
        if (isScrolling) return;
        if (event.deltaY > 0) {
            // Scrolling down
            scrollToSection(currentSectionIndex + 1);
        } else {
            // Scrolling up
            scrollToSection(currentSectionIndex - 1);
        }
    });

    const links = document.querySelectorAll('nav a');
    links.forEach((link, index) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            scrollToSection(index);
        });
    });
});

function copyToClipboard() {
    const text = document.getElementById('copy-text').textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function calculateDaysUntil(targetDate) {
    const today = new Date();
    const timeDiff = targetDate - today;
    const daysDiff = Math.ceil(timeDiff / (8.64e7));
    return daysDiff;
}

function updateDaysCounter() {
    const targetDate = new Date('October 18, 2025');
    const daysCounterElement = document.getElementById('days-counter');
    const daysUntil = calculateDaysUntil(targetDate);
    daysCounterElement.textContent = daysUntil;
}

// Update the counter when the page loads
updateDaysCounter();
