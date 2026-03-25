document.addEventListener('DOMContentLoaded', function () {

    var navbar = document.getElementById('navbar');
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');
    var navLinks = document.querySelectorAll('.nav-link');
    var whatsappFloat = document.getElementById('whatsappFloat');
    var particles = document.getElementById('goldParticles');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 400) {
            whatsappFloat.classList.add('visible');
        } else {
            whatsappFloat.classList.remove('visible');
        }

        updateActiveNav();
    });

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    function updateActiveNav() {
        var sections = document.querySelectorAll('section, header');
        var scrollPos = window.scrollY + 200;

        sections.forEach(function (section) {
            var id = section.getAttribute('id');
            if (!id) return;
            var top = section.offsetTop;
            var height = section.offsetHeight;

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (l) { l.classList.remove('active'); });
                var activeLink = document.querySelector('.nav-link[href="#' + id + '"]');
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }

    function createParticles() {
        for (var i = 0; i < 25; i++) {
            var particle = document.createElement('div');
            particle.classList.add('gold-particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            particle.style.width = (1 + Math.random() * 2) + 'px';
            particle.style.height = particle.style.width;
            particles.appendChild(particle);
        }
    }
    createParticles();

    var reveals = document.querySelectorAll('.reveal');

    var observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    setTimeout(function () {
                        entry.target.classList.add('active');
                    }, parseInt(delay));
                } else {
                    entry.target.classList.add('active');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(function (el) {
        observer.observe(el);
    });

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            var target = document.querySelector(href);
            if (target) {
                var offset = navbar.offsetHeight + 20;
                var pos = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    });

    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            var nombre = document.getElementById('nombre');
            var email = document.getElementById('email');
            var mensaje = document.getElementById('mensaje');

            if (!nombre.value.trim() || !email.value.trim() || !mensaje.value.trim()) {
                e.preventDefault();
                return;
            }

            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value)) {
                e.preventDefault();
                return;
            }
        });
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                var parallaxBg = document.querySelector('.parallax-bg');
                if (parallaxBg) {
                    var section = document.querySelector('.parallax-divider');
                    var rect = section.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        var speed = 0.3;
                        var yPos = (rect.top * speed);
                        parallaxBg.style.transform = 'translateY(' + yPos + 'px)';
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    });

});