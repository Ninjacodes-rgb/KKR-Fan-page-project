document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor Logic
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const interactiveElements = document.querySelectorAll('a, button, .player-card');

    if (window.innerWidth > 900) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Add a slight delay for the follower
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 50);
        });

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                follower.classList.remove('active');
            });
        });
    }

    // 2. Parallax Effect on Hero Section
    const parallaxEl = document.querySelector('[data-parallax]');
    const parallaxReverseEl = document.querySelector('[data-parallax-reverse]');

    if (window.innerWidth > 900) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;

            if (parallaxEl) {
                parallaxEl.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
            }
            if (parallaxReverseEl) {
                parallaxReverseEl.style.transform = `translate(${-xAxis * 1.5}px, ${-yAxis * 1.5}px)`;
            }
        });
    }

    // 3. Scroll Reveal Animations with Intersection Observer
    const revealElements = document.querySelectorAll('.fade-in-scroll');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 4. Reveal Text Animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = 0;
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
            heroTitle.style.opacity = 1;
            heroTitle.style.transform = 'translateY(0)';
        }, 200);
    }
});
