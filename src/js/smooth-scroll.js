/**
 * Smooth scroll behavior for anchor links.
 * Attaches click listeners to all `a[href^="#"]` elements and scrolls
 * smoothly to the target section. Also closes the mobile nav if open.
 */

export function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');

      // Edge case: bare "#" with no target — scroll to top
      if (href === '#') {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        closeMobileNav();
        return;
      }

      const target = document.querySelector(href);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMobileNav();
      }
    });
  });
}

/**
 * Closes the mobile navigation menu if it is currently open.
 */
function closeMobileNav() {
  const navMenu = document.querySelector('#nav-menu');
  const navToggle = document.querySelector('.nav-toggle');

  if (navMenu && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
  }

  if (navToggle) {
    navToggle.setAttribute('aria-expanded', 'false');
  }
}
