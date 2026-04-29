import { initSmoothScroll } from './smooth-scroll.js';
import { initNavigation } from './navigation.js';
import { initContactForm } from './contact.js';
import { initBlogCalendar } from './blog-calendar.js';

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initNavigation();
  initContactForm();
  initBlogCalendar();
});
