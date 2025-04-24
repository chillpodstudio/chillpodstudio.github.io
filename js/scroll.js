document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector('.scroll-container');
    const dots = document.querySelectorAll('.dot');
    const navLinks = document.querySelectorAll('.nav-item');
    const navBar = document.querySelector('nav');
    const body = document.querySelector('body');

    function setActive(index) {
        dots.forEach(dot => dot.classList.remove("active"));
        navLinks.forEach(link => link.classList.remove("active"));

        if (dots[index]) {
            dots[index].classList.add("active");
        }
        if (navLinks[index]) {
            navLinks[index].classList.add("active");
        }
    }

    setActive(0); // on page load

    // Function to check if a vertical scrollbar is present on the body
    // Function to check if the body is scrolled down
    function isScrolled() {
        return body.scrollTop > 1;
    }

    // Function to add or remove the class based on scroll position
    function toggleScrollbarClass() {
        if (isScrolled()) {
            navBar.classList.add('scrolled');
        } else {
            navBar.classList.remove('scrolled');
        }
    }

    // Check on page load
    toggleScrollbarClass();

    // Update on scroll event of the body
    body.addEventListener('scroll', () => {
        toggleScrollbarClass();
    });


    // Update active dot and nav link on scroll
    scrollContainer.addEventListener('scroll', () => {
        const scrollLeft = scrollContainer.scrollLeft;
        const sectionWidth = window.innerWidth;
        const activeIndex = Math.round(scrollLeft / sectionWidth);
        setActive(activeIndex);
    });

    // Nav link click scrolls and updates hash
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // prevent the jump
    
            const targetId = link.getAttribute('href'); // e.g., "#games"
    
            scrollContainer.scrollTo({
                left: window.innerWidth * index,
                behavior: 'smooth'
            });
    
            // Set the hash manually
            history.pushState(null, null, targetId);
        });
    });
    
    

    // Dots are clickable
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollContainer.scrollTo({
                left: window.innerWidth * index,
                behavior: 'smooth'
            });

            // Optional: update hash here too, if your sections have IDs
            const targetLink = navLinks[index];
            if (targetLink) {
                const targetId = targetLink.getAttribute('href');
                history.pushState(null, null, targetId);
            }
        });
    });
});