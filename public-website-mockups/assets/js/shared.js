// ==========================================================================
// Shared JavaScript for WWRI Public Website Mockups
// Progressive Disclosure & Scroll Animations
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initAccentMode();
  initScrollAnimations();
  initSmoothScroll();
});

// Accent mode: always solid (gradients disabled per design decision)
function initAccentMode() {
  document.documentElement.setAttribute('data-accent-mode', 'solid');
}

/**
 * Initialize Intersection Observer for scroll-triggered animations
 * Progressive disclosure: elements fade/slide in as they enter viewport
 */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of element is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optionally unobserve after animation to improve performance
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
  animatedElements.forEach(el => observer.observe(el));
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Optional: Parallax effect for hero backgrounds
 * Call this function from theme-specific JS if desired
 */
function initParallax(selector = '.section-hero') {
  const heroSection = document.querySelector(selector);
  if (!heroSection) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
  });
}

/**
 * Optional: Add stagger delay to child elements
 * Usage: staggerChildren('.tile-content', 100)
 */
function staggerChildren(parentSelector, delayMs = 100) {
  const parents = document.querySelectorAll(parentSelector);
  parents.forEach(parent => {
    const children = parent.children;
    Array.from(children).forEach((child, index) => {
      child.style.transitionDelay = `${index * delayMs}ms`;
    });
  });
}

// Export functions for theme-specific use
window.WWRIAnimations = {
  initScrollAnimations,
  initSmoothScroll,
  initParallax,
  staggerChildren
};

