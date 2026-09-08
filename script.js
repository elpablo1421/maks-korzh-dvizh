document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    // Only enable custom cursor on desktop
    if (window.matchMedia("(min-width: 992px)").matches) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        
        // Smooth follower animation
        function animateFollower() {
            let distX = mouseX - followerX;
            let distY = mouseY - followerY;
            
            followerX += distX * 0.15;
            followerY += distY * 0.15;
            
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateFollower);
        }
        animateFollower();
        
        // Interactive hover effects
        const interactiveElements = document.querySelectorAll('a, .btn, .gallery-item');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                follower.classList.remove('active');
            });
        });
    }

    // Scroll Animations using Intersection Observer
    const fadeUpElements = document.querySelectorAll('.fade-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeUpElements.forEach(el => {
        observer.observe(el);
    });

    // Parallax effect on scroll for images
    const parallaxImages = document.querySelectorAll('.parallax-img');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        
        parallaxImages.forEach(img => {
            let rect = img.parentElement.getBoundingClientRect();
            // Check if element is in viewport
            if(rect.top < window.innerHeight && rect.bottom > 0) {
                let speed = 0.05;
                let yPos = (rect.top - window.innerHeight / 2) * speed;
                img.style.transform = `translateY(${yPos}px) scale(1.1)`;
            }
        });
    });
});
