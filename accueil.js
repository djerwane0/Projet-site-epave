document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
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

    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');

    function changeSlide(direction) {
        if (slides.length === 0) return;
        
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const threshold = 100; 
        return (
            rect.top >= -threshold &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) + threshold
        );
    }

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

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });

 
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

    animateServiceCards();
    animateProcessSteps();
    animateTestimonials();

    window.changeSlide = changeSlide;
    window.toggleMenu = toggleMenu;
    window.closeMenu = closeMenu;
});



document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".testimonial-track");
    const testimonials = Array.from(track.children);
    testimonials.forEach((testimonial) => {
        let clone = testimonial.cloneNode(true);
        track.appendChild(clone);
    });
});

