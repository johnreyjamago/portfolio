// =========================================
// PORTFOLIO SCRIPT.JS
// Vanilla JavaScript — no dependencies
// =========================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------
     1. NAVBAR: shrink/shadow on scroll
  --------------------------------------- */
  const navbar = document.getElementById('navbar');

  const handleNavbarScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();

  /* ---------------------------------------
     2. MOBILE HAMBURGER MENU
  --------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  const toggleMenu = () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMenu);

  // Close mobile menu when a nav link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  /* ---------------------------------------
     3. SMOOTH SCROLLING FOR ANCHOR LINKS
     (CSS scroll-behavior handles most of it;
     this offsets for the fixed navbar height)
  --------------------------------------- */
  const navbarHeight = () => navbar.offsetHeight;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length <= 1) return; // ignore bare "#"

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - navbarHeight() + 1;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  /* ---------------------------------------
     4. ACTIVE NAV LINK ON SCROLL
  --------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const setActiveLink = () => {
    let currentSectionId = '';
    const scrollPos = window.scrollY + navbarHeight() + 40;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinkEls.forEach(link => {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active-link');
      }
    });
  };

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  /* ---------------------------------------
     5. SCROLL REVEAL ANIMATIONS
     Uses IntersectionObserver for performance
  --------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger cards slightly within the same section
          const delay = (entry.target.dataset.delayIndex || 0) * 80;
          setTimeout(() => {
            entry.target.classList.add('in-view');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  // Assign a stagger index per parent grid group for a nicer cascade effect
  const groupSelectors = ['.works-grid', '.skills-grid', '.soft-skills-grid'];
  groupSelectors.forEach(selector => {
    const group = document.querySelector(selector);
    if (!group) return;
    Array.from(group.children).forEach((child, index) => {
      child.dataset.delayIndex = index % 6;
    });
  });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------------------------------
     6. BACK TO TOP BUTTON
  --------------------------------------- */
  const backToTop = document.getElementById('backToTop');

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------------------------------
     7. CONTACT FORM (front-end only demo)
  --------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill in all fields before sending.';
      formStatus.style.color = '#b5533c';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formStatus.textContent = 'Please enter a valid email address.';
      formStatus.style.color = '#b5533c';
      return;
    }

    // Simulate a successful submission (no backend connected yet)
    formStatus.textContent = `Thanks, ${name}! Your message has been noted. I'll get back to you soon.`;
    formStatus.style.color = '#5c7256';
    contactForm.reset();
  });

  /* ---------------------------------------
     8. BUTTON RIPPLE / SUBTLE PRESS EFFECT
  --------------------------------------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousedown', () => {
      btn.style.transform = 'scale(0.97)';
    });
    btn.addEventListener('mouseup', () => {
      btn.style.transform = '';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

});
