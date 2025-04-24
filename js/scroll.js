document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector('.scroll-container');
    const dots = document.querySelectorAll('.dot');
    const navLinks = document.querySelectorAll('.nav-item');
    const navBar = document.querySelector('nav');
    const body = document.body;
    const html = document.documentElement;

    function setActive(index) {
        dots.forEach(dot => dot.classList.remove("active"));
        navLinks.forEach(link => link.classList.remove("active"));

        if (dots[index]) dots[index].classList.add("active");
        if (navLinks[index]) navLinks[index].classList.add("active");
    }

    function updateBodyBackground(index) {
        switch (index) {
            case 0: // Home
            html.style.background = "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)";
                break;
            case 1: // Games
            case 2: // About
                html.style.background = "#121212";
                break;
            default:
                html.style.background = "";
        }
    }

    function isScrolled() {
        return body.scrollTop > 1;
    }

    function toggleScrollbarClass() {
        navBar.classList.toggle('scrolled', isScrolled());
    }

    // Determine the current section index based on scroll position
    function getActiveIndex() {
        const scrollLeft = scrollContainer.scrollLeft;
        const sectionWidth = window.innerWidth;
        return Math.round(scrollLeft / sectionWidth);
    }

    // Initialize on page load
    const initialIndex = getActiveIndex();
    setActive(initialIndex);
    updateBodyBackground(initialIndex);
    toggleScrollbarClass();

    // Scroll event for vertical scroll on body (if needed)
    body.addEventListener('scroll', toggleScrollbarClass);

    // Horizontal scroll in the scroll-container
    scrollContainer.addEventListener('scroll', () => {
        const activeIndex = getActiveIndex();
        setActive(activeIndex);
        updateBodyBackground(activeIndex);
    });

    // Handle nav link clicks
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            scrollContainer.scrollTo({
                left: window.innerWidth * index,
                behavior: 'smooth'
            });
            history.pushState(null, null, targetId);
        });
    });

    // Handle dot clicks
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollContainer.scrollTo({
                left: window.innerWidth * index,
                behavior: 'smooth'
            });
            const targetLink = navLinks[index];
            if (targetLink) {
                const targetId = targetLink.getAttribute('href');
                history.pushState(null, null, targetId);
            }
        });
    });
});
