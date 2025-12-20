document.addEventListener('DOMContentLoaded', () => {
    // Menu Hamburger
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animation des liens du menu
        const menuItems = navMenu.querySelectorAll('li');
        menuItems.forEach((item, index) => {
            if (navMenu.classList.contains('active')) {
                item.style.animation = `slideIn 0.5s ease forwards ${index * 0.1}s`;
            } else {
                item.style.animation = '';
            }
        });
    }
    
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        const menuItems = navMenu.querySelectorAll('li');
        menuItems.forEach(item => {
            item.style.animation = '';
        });
    }
    
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    
    const navLinks = document.querySelectorAll('#nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    document.addEventListener('click', (event) => {
        const isClickInside = navMenu.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInside && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');

    function changeSlide(direction) {
        if (slides.length === 0) return;
        
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Fonction améliorée pour vérifier si un élément est visible
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const threshold = 100; // Pixels avant que l'élément soit visible
        return (
            rect.top >= -threshold &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) + threshold
        );
    }

// Animation des cartes de service au scroll
function animateServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
        if (isElementInViewport(card)) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}

    // Animation des étapes du processus améliorée
    function animateProcessSteps() {
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            if (isElementInViewport(step)) {
                step.classList.add('animate');
            } else {
                step.classList.remove('animate');
            }
        });
    }

    // Animation des témoignages améliorée
    function animateTestimonials() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        testimonials.forEach((testimonial, index) => {
            if (isElementInViewport(testimonial)) {
                testimonial.classList.add('animate');
            } else {
                testimonial.classList.remove('animate');
            }
        });
    }

    // Animation douce du scroll
    function smoothScroll(event) {
        if (event.target.hash) {
            event.preventDefault();
            const targetId = event.target.hash;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                closeMenu();
            }
        }
    }

    // Activation du scroll fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });

    // Écouteur de scroll optimisé
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(() => {
            animateServiceCards();
            animateProcessSteps();
            animateTestimonials();
        });
    });

    // Déclencher les animations initiales
    animateServiceCards();
    animateProcessSteps();
    animateTestimonials();

    // Exposer les fonctions nécessaires globalement
    window.changeSlide = changeSlide;
    window.toggleMenu = toggleMenu;
    window.closeMenu = closeMenu;
});



/* JavaScript pour cloner les témoignages et assurer un défilement fluide */
document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".testimonial-track");
    const testimonials = Array.from(track.children);
    testimonials.forEach((testimonial) => {
        let clone = testimonial.cloneNode(true);
        track.appendChild(clone);
    });
});
