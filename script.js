/**
 * Main Application Script
 * Yohanan Luz - Portfolio
 * Modularized and refactored for clean code and performance.
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================
    // 1. Typing Effect Module
    // ==========================================
    const initTypingEffect = () => {
        const typingText = document.querySelector('.typing-text');
        if (!typingText) return;

        const phrases = ['Programador', 'Desenvolvedor Web', 'Criador de Soluções', 'Entusiasta de Tech'];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        const type = () => {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause before typing next
            }

            setTimeout(type, typeSpeed);
        };

        type();
    };

    // ==========================================
    // 2. Smooth Scrolling Module
    // ==========================================
    const initSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                // If the link is just to a section on the same page
                if (targetId.startsWith('#')) {
                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Update active link state
                        document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                        this.classList.add('active');
                    }
                }
            });
        });
    };

    // ==========================================
    // 3. Scroll Reveal Animation Module
    // ==========================================
    const initScrollReveal = () => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observerInstance.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            observer.observe(section);
        });
    };

    // ==========================================
    // 4. Navbar Scroll Effect Module (Throttled)
    // ==========================================
    const initNavbarScroll = () => {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        // Simple throttle to improve scroll performance
        let isScrolling = false;
        
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 50) {
                        navbar.style.background = 'var(--bg-navbar-scrolled)';
                        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
                    } else {
                        navbar.style.background = 'var(--bg-navbar)';
                        navbar.style.boxShadow = 'none';
                    }
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });
    };

    // ==========================================
    // 5. Theme Toggle Module
    // ==========================================
    const initThemeToggle = () => {
        const themeToggleBtn = document.getElementById('theme-toggle');
        if (!themeToggleBtn) return;
        
        const themeIcon = themeToggleBtn.querySelector('i');
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Function to apply theme
        const applyTheme = (theme) => {
            document.documentElement.setAttribute('data-theme', theme);
            if (theme === 'light') {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            } else {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            }
        };

        // Initialize based on saved or system preference
        if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
            applyTheme('light');
        } else {
            applyTheme('dark');
        }
        
        // Toggle event
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    };

    // ==========================================
    // 6. Mobile Menu Toggle
    // ==========================================
    const initMobileMenu = () => {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (!mobileMenuBtn || !navLinks) return;
        
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = navLinks.style.display === 'block';
            navLinks.style.display = isExpanded ? 'none' : 'block';
        });
    };

    // Initialize all modules
    initTypingEffect();
    initSmoothScrolling();
    initScrollReveal();
    initNavbarScroll();
    initThemeToggle();
    initMobileMenu();
});
