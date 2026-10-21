/* ========================================
   SAMUEL ODHIAMBO - PREMIUM PORTFOLIO SCRIPTS
   Animations, Interactions, and Effects (v2)
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== PAGE LOADER =====
  const pageLoader = document.getElementById('pageLoader');
  
  // Wait a small amount of time to simulate a loading sequence, or wait for window.load
  window.addEventListener('load', () => {
    setTimeout(() => {
      pageLoader.classList.add('hidden');
    }, 4500); // 4.5s delay for intro text animation
  });

  // ===== CUSTOM CURSOR =====
  const customCursor = document.getElementById('customCursor');
  
  if (customCursor && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
      customCursor.style.left = e.clientX + 'px';
      customCursor.style.top = e.clientY + 'px';
    });

    // Add hover effect to links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .project-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => customCursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => customCursor.classList.remove('hovering'));
    });
  }

  // ===== PARTICLES BACKGROUND =====
  const canvas = document.getElementById('particlesCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function initCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5 + 0.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.15)'; // Accent color with low opacity
        ctx.fill();
      }
    }

    function createParticles() {
      particles = [];
      const numParticles = Math.floor((width * height) / 15000); // Responsive amount
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Draw lines between close particles
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.1 - (dist / 120) * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }

    initCanvas();
    createParticles();
    animateParticles();

    window.addEventListener('resize', () => {
      initCanvas();
      createParticles();
    });
  }

  // ===== TYPEWRITER EFFECT =====
  const typewriterElement = document.getElementById('typewriterName');
  if (typewriterElement) {
    const nameText = "Samuel Odhiambo";
    let charIndex = 0;
    let isDeleting = false;
    
    // We delay the start to let the page loader finish (4.5s)
    setTimeout(() => {
      type();
    }, 4500);

    function type() {
      const currentText = nameText.substring(0, charIndex);
      typewriterElement.textContent = currentText;

      let typeDelay = 150;

      if (!isDeleting && charIndex < nameText.length) {
        // Typing forward
        charIndex++;
        typeDelay = Math.random() * 50 + 100; // Realistic typing variance
      } else if (isDeleting && charIndex > 0) {
        // Deleting
        charIndex--;
        typeDelay = 60; // Faster delete speed
      } else {
        // End of word or fully deleted
        isDeleting = !isDeleting;
        typeDelay = isDeleting ? 4000 : 800; // Pause 4s when fully typed, 800ms before re-typing
      }

      setTimeout(type, typeDelay);
    }
  }

  // ===== NAVBAR SCROLL EFFECT & ACTIVE LINKS =====
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  const navLinks = document.getElementById('navLinks');
  
  function updateScrollState() {
    const scrollY = window.scrollY;

    // Navbar shrink
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top visibility
    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link highlight
    const sections = document.querySelectorAll('section[id]');
    const navLinkElements = navLinks.querySelectorAll('a:not(.nav-cta)');
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinkElements.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateScrollState);
  updateScrollState(); // Initialize

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== MOBILE MENU =====
  const menuToggle = document.getElementById('menuToggle');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // ===== SCROLL REVEAL ANIMATIONS =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // Only trigger once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== STAT COUNTER ANIMATION =====
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const suffix = element.dataset.suffix || '';
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  // ===== SKILL BAR ANIMATION =====
  const skillBars = document.querySelectorAll('.skill-bar-fill[data-width]');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width;
        // Small timeout for better visual effect after reveal
        setTimeout(() => {
          entry.target.style.width = width + '%';
        }, 300);
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(el => skillObserver.observe(el));

  // ===== TESTIMONIAL CAROUSEL =====
  const testimonials = [
    {
      quote: '"Working with Samuel was an absolute pleasure! Their keen eye for detail and user-centric approach truly elevated our project. From concept to execution, they guided us seamlessly through the design and branding process, delivering results that exceeded our expectations."',
      name: 'VMORE Gift Shop',
      role: 'Brand Identity Client',
      avatar: 'V',
      stars: 5
    },
    {
      quote: '"Samuel transformed our social media presence completely. Engagement went up 300% in just two months. His strategic thinking combined with creative flair is exactly what our brand needed. Highly recommended for anyone looking to level up their digital marketing."',
      name: 'Tech Startup CEO',
      role: 'Digital Marketing Client',
      avatar: 'T',
      stars: 5
    },
    {
      quote: '"The logo Samuel designed for us perfectly captures our brand\'s essence. Professional, creative, and incredibly responsive throughout the entire process. He delivered multiple concepts and iterated based on our feedback until it was perfect."',
      name: 'Creative Agency',
      role: 'Logo Design Client',
      avatar: 'C',
      stars: 5
    }
  ];

  let currentTestimonial = 0;
  const testimonialCard = document.getElementById('testimonialCard');
  const testimonialQuote = document.getElementById('testimonialQuote');
  const testimonialName = document.getElementById('testimonialName');
  const testimonialRole = document.getElementById('testimonialRole');
  const testimonialAvatar = document.getElementById('testimonialAvatar');
  const testimonialStars = document.getElementById('testimonialStars');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');

  if (testimonialCard) {
    function showTestimonial(index) {
      currentTestimonial = index;
      const t = testimonials[index];

      // Fade out
      testimonialCard.style.opacity = '0';
      testimonialCard.style.transform = 'scale(0.98)';

      setTimeout(() => {
        testimonialQuote.textContent = t.quote;
        testimonialName.textContent = t.name;
        testimonialRole.textContent = t.role;
        testimonialAvatar.textContent = t.avatar;
        testimonialStars.textContent = '★'.repeat(t.stars) + '☆'.repeat(5 - t.stars);

        // Fade in
        testimonialCard.style.opacity = '1';
        testimonialCard.style.transform = 'scale(1)';
      }, 400);

      // Update dots
      testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    // Dot click handlers
    testimonialDots.forEach(dot => {
      dot.addEventListener('click', () => {
        showTestimonial(parseInt(dot.dataset.index));
      });
    });

    // Auto-rotate testimonials
    setInterval(() => {
      showTestimonial((currentTestimonial + 1) % testimonials.length);
    }, 6000);
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===== CONTACT FORM =====
  window.handleFormSubmit = function(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('.form-submit');
    const originalContent = submitBtn.innerHTML;

    // Show sending state
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
      <span>Sending...</span>
    `;
    submitBtn.style.pointerEvents = 'none';

    // Simulate sending (API interaction)
    setTimeout(() => {
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Message Sent!</span>
      `;
      submitBtn.style.background = '#22c55e'; // Success green

      setTimeout(() => {
        submitBtn.innerHTML = originalContent;
        submitBtn.style.background = '';
        submitBtn.style.pointerEvents = 'auto';
        form.reset();
      }, 3000);
    }, 1500);
  };

  // Add CSS for spin animation programmatically if needed
  if (!document.querySelector('#spinStyle')) {
    const style = document.createElement('style');
    style.id = 'spinStyle';
    style.textContent = `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }

});
