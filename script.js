document.addEventListener('DOMContentLoaded', function() {
    // --- Typewriter Effect ---
    const typewriterTextElement = document.querySelector('.typewriter-text');
    if (typewriterTextElement) {
        const text = typewriterTextElement.textContent;
        typewriterTextElement.textContent = ''; // Clear content
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typewriterTextElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 70); // Adjust typing speed
            } else {
                // Optional: Remove cursor after typing if needed
                typewriterTextElement.style.borderRight = 'none';
            }
        }
        typeWriter();
    }

    // --- Sticky Nav Bar & Active Link Highlighting ---
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]'); // Get all sections with an ID

    function updateStickyNav() {
        if (window.scrollY > 150) { // Adjust scroll threshold as needed
            mainNav.classList.add('sticky');
        } else {
            mainNav.classList.remove('sticky');
        }

        let currentActive = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - mainNav.offsetHeight - 20; // Adjust for sticky nav height
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentActive = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(currentActive)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateStickyNav);
    updateStickyNav(); // Call on load to set initial state

    // --- Hamburger Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('.nav-links');

    if (hamburger && navUl) {
        hamburger.addEventListener('click', () => {
            navUl.classList.toggle('active');
        });

        // Close nav menu when a link is clicked (for mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) { // Only close on mobile
                    navUl.classList.remove('active');
                }
            });
        });
    }

    // --- Scroll to Top Button ---
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    window.addEventListener("scroll", function() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    });

    scrollToTopBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // --- Copy Email Button ---
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const copyMessage = document.getElementById('copyMessage');
    // IMPORTANT: Replace 'your.email@example.com' with your actual email
    const emailToCopy = 'your.email@example.com'; // <--- **CHANGE THIS TO YOUR EMAIL**

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(emailToCopy)
                .then(() => {
                    copyMessage.style.display = 'inline';
                    setTimeout(() => {
                        copyMessage.style.display = 'none';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy email: ', err);
                });
        });
    }

    // --- Dark/Light Mode Toggle ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.add(currentTheme);
    } else {
        // Default to dark mode if no preference saved
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        document.body.classList.toggle('dark-mode');

        let theme = 'dark-mode';
        if (document.body.classList.contains('light-mode')) {
            theme = 'light-mode';
        }
        localStorage.setItem('theme', theme);
    });
});