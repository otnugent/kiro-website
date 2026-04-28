/**
 * Navigation module: mobile hamburger toggle, active section tracking,
 * and footer year update.
 */

export function initNavigation() {
  initHamburgerToggle();
  initActiveSectionTracking();
  updateFooterYear();
}

/**
 * Toggles the mobile nav menu open/closed when the hamburger button is clicked.
 * Also closes the menu when the user clicks outside the header.
 */
function initHamburgerToggle() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('#nav-menu');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
  });

  // Close the menu when clicking outside the header
  document.addEventListener('click', (event) => {
    const header = document.querySelector('header');
    if (header && !header.contains(event.target)) {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Uses IntersectionObserver to track which section is currently in view
 * and applies the `active` class to the corresponding nav link.
 * Gracefully degrades if IntersectionObserver is not available.
 */
function initActiveSectionTracking() {
  if (!('IntersectionObserver' in window)) return;

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;

          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '-80px 0px -20% 0px',
    }
  );

  sections.forEach((section) => observer.observe(section));
}

/**
 * Sets the footer year to the current year.
 */
function updateFooterYear() {
  const yearEl = document.querySelector('#current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
