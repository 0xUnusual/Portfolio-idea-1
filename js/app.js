document.addEventListener('DOMContentLoaded', () => {
    // Force scroll to top on refresh
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // 1. Tech Banner Logic (Lightweight)
    const techStack = [
        { name: 'HTML5', icon: 'Html5' }, { name: 'CSS3', icon: 'Css3' },
        { name: 'JavaScript', icon: 'Js' }, { name: 'Node.js', icon: 'Node' },
        { name: 'Supabase', icon: 'Database' }, { name: 'PostgreSQL', icon: 'Mysql' },
        { name: 'Docker', icon: 'Docker' }, { name: 'GitHub', icon: 'Github' },
        { name: 'Grommet', icon: 'Grommet' }, { name: 'React', icon: 'Reactjs' },
        { name: 'TypeScript', icon: 'Code' }
    ];

    const techBanner = document.getElementById('tech-banner');
    if (techBanner) {
        let content = '';
        techStack.forEach(tech => {
            const svgUrl = `https://unpkg.com/grommet-icons/img/${tech.icon}.svg`;
            content += `<div class="tech-item"><img src="${svgUrl}" class="icon" alt="${tech.name}"><span>${tech.name}</span></div>`;
        });
        techBanner.innerHTML = content + content;
    }

    // 2. Optimized Scroll Reveal (Minimal distance for performance)
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '40px',
        duration: 800,
        delay: 100,
        mobile: true
    });
    sr.reveal('.glass-panel');
    sr.reveal('.project-card', { interval: 80 });

    // 3. Optimized Scroll Handler (Throttled with requestAnimationFrame)
    const navbar = document.querySelector('.navbar');
    const bg = document.querySelector('.fixed-background');
    let scrollTimeout;
    let isNavbarVisible = false;

    const toggleNavbar = () => {
        const scY = window.scrollY;
        
        // Navbar reveal
        if (scY > 100 && !isNavbarVisible) {
            navbar.classList.add('visible');
            isNavbarVisible = true;
        } else if (scY <= 100 && isNavbarVisible) {
            navbar.classList.remove('visible');
            isNavbarVisible = false;
        }

        // Background Opacity on scroll for readability
        if (scY > 150) {
            bg.classList.add('scrolled');
        } else {
            bg.classList.remove('scrolled');
        }
        
        scrollTimeout = null;
    };

    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = requestAnimationFrame(toggleNavbar);
        }
    }, { passive: true });

    // 4. WhatsApp Integration
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const message = document.getElementById('message').value;
            if (name && message) {
                const whatsappMsg = `¡Hola Junior! Soy ${name}. ${message}`;
                window.open(`https://wa.me/18091234567?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
            }
        });
    }

    // 5. Hamburger Menu Logic
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            hamburger.parentElement.parentElement.classList.toggle('active'); // Navbar state
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.querySelector('.navbar').classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            document.querySelector('.navbar').classList.remove('active');
        }
    });
});
