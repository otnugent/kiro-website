# Implementation Plan: Personal Website

## Overview

Build a static personal/professional website using vanilla HTML, CSS, and JavaScript, deployed to GitHub Pages via GitHub Actions. The implementation proceeds in layers: project scaffold → HTML structure → CSS styling → JavaScript behavior → CI/CD pipeline → testing.

## Tasks

- [x] 1. Set up project scaffold and GitHub Actions deployment pipeline
  - Create the directory structure: `src/`, `src/css/`, `src/js/`, `src/images/`, `src/images/projects/`, `src/assets/`, `.github/workflows/`
  - Create `.github/workflows/deploy.yml` with the GitHub Actions workflow that deploys `./src` as the Pages artifact using `actions/checkout@v4`, `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, and `actions/deploy-pages@v4`
  - Set workflow permissions: `contents: read`, `pages: write`, `id-token: write`
  - Add `concurrency` block with `group: pages` and `cancel-in-progress: false`
  - Create placeholder `src/index.html`, `src/css/styles.css`, and `src/js/main.js` so the artifact upload has content
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Build the HTML structure (`src/index.html`)
  - [x] 2.1 Write the HTML document head
    - Include `<title>`, `<meta name="description">`, and all four Open Graph meta tags (`og:title`, `og:description`, `og:image`, `og:url`)
    - Include `<link rel="icon" href="images/favicon.ico">`
    - Include `<link rel="stylesheet" href="css/styles.css">` and `<script src="js/main.js" defer></script>`
    - Include `<meta name="viewport" content="width=device-width, initial-scale=1">`
    - _Requirements: 12.1, 12.2, 12.4_

  - [x] 2.2 Write the `<header>` and `<nav>` elements
    - Implement the navigation markup from the design: `<nav role="navigation" aria-label="Main navigation">` with logo link, hamburger `<button>` (`aria-expanded="false"`, `aria-controls="nav-menu"`, `aria-label="Toggle navigation menu"`), and `<ul id="nav-menu">` with links to `#home`, `#about`, `#projects`, `#contact`
    - _Requirements: 3.5, 4.1, 4.2, 9.4, 9.5_

  - [x] 2.3 Write the `#home` hero section
    - `<section id="home">` containing an `<h1>` with the owner name, a subtitle/tagline, and a call-to-action anchor link
    - Include the profile image (`<img src="images/profile.webp" alt="..." width="..." height="...">`) without `loading="lazy"` (hero image is in initial viewport)
    - _Requirements: 3.1, 9.1, 9.2, 12.3_

  - [x] 2.4 Write the `#about` section
    - `<section id="about">` with an `<h2>` heading, biographical paragraph(s), and a skills summary list
    - _Requirements: 3.2, 9.1, 12.3_

  - [x] 2.5 Write the `#projects` section with at least 6 project cards
    - `<section id="projects">` with an `<h2>` heading and a grid container
    - Each project rendered as `<article class="project-card">` following the design's card markup: lazy-loaded `<img>` with `alt`, `width`, `height`, `loading="lazy"`; `<h3>` title; `<p>` description; links with `target="_blank" rel="noopener noreferrer"`
    - Include at least 6 project card entries
    - _Requirements: 3.3, 5.1, 5.2, 5.3, 5.4, 9.1, 9.2_

  - [x] 2.6 Write the `#contact` section
    - `<section id="contact">` with an `<h2>` heading, a `mailto:` email link, and at least one social media profile link with `aria-label`
    - Include the contact form markup from the design: `<form id="contact-form">` with `name`, `email`, `message` fields (each with `<label>`, `id`, `aria-required="true"`), a submit button, and `<div id="form-status" role="status" aria-live="polite">`
    - _Requirements: 3.4, 6.1, 6.2, 6.3, 9.1, 9.4, 9.5_

  - [ ]* 2.7 Write unit tests for HTML structure
    - Use jsdom to parse `src/index.html` and assert: `<title>` exists, `<meta name="description">` exists, all four OG tags exist, `<link rel="icon">` exists, sections `#home` / `#about` / `#projects` / `#contact` all exist, `<nav>` is present, contact section has a `mailto:` link and ≥ 1 social link, contact form has name/email/message fields, projects section has ≥ 6 `.project-card` elements
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 5.4, 6.1, 6.2, 6.3, 12.1, 12.2, 12.4_

  - [ ]* 2.8 Write property test for semantic HTML structure (Property 8)
    - **Property 8: Semantic HTML Structure**
    - **Validates: Requirements 9.1**
    - For each major content section (`#home`, `#about`, `#projects`, `#contact`), assert the wrapping element is a semantic HTML element (not a bare `<div>` without a role)

  - [ ]* 2.9 Write property test for heading hierarchy (Property 12)
    - **Property 12: Heading Hierarchy**
    - **Validates: Requirements 12.3**
    - Use fast-check to generate heading-level sequences and verify no level is skipped; also assert the actual document has exactly one `<h1>` and no skipped heading levels

- [x] 3. Create CSS stylesheet architecture
  - [x] 3.1 Create `src/css/variables.css`
    - Define all CSS custom properties in `:root`: color palette (`--color-*`), typography scale (`--font-size-*`, `--font-family-*`), spacing scale (`--space-*`), and border-radius/shadow tokens
    - All color values must be defined here as custom properties; no hardcoded hex/rgb values elsewhere
    - _Requirements: 11.1, 11.2, 11.3_

  - [x] 3.2 Create `src/css/reset.css`
    - Implement a minimal CSS reset/normalize: box-sizing, margin/padding reset, `img { max-width: 100% }`, list-style reset for nav lists
    - _Requirements: 2.1, 11.4_

  - [x] 3.3 Create `src/css/layout.css`
    - Implement mobile-first grid and flexbox layout rules for the page wrapper, section containers, and the projects grid
    - Use `min-width` media queries at 768px, 1024px, and 1440px breakpoints
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [x] 3.4 Create `src/css/components.css`
    - Style the navigation header, hamburger button, project cards, contact form, buttons (`.btn`, `.btn--primary`, `.btn--secondary`), and form groups
    - All color values must reference `var(--color-*)` custom properties
    - _Requirements: 4.1, 5.2, 6.3, 11.1, 11.2, 11.3, 11.4_

  - [x] 3.5 Create `src/css/responsive.css`
    - Add responsive overrides for the navigation (collapse to hamburger on mobile), project grid columns, and typography scaling
    - _Requirements: 2.2, 2.3, 4.4_

  - [x] 3.6 Create `src/css/styles.css` as the entry point
    - Use `@import` to pull in `reset.css`, `variables.css`, `layout.css`, `components.css`, `responsive.css` in that order
    - _Requirements: 10.1, 10.2_

  - [ ]* 3.7 Write property test for CSS custom property usage (Property 11)
    - **Property 11: CSS Custom Property Usage for Colors**
    - **Validates: Requirements 11.1**
    - Parse each CSS file with a CSS AST tool; for every `color`, `background-color`, `border-color`, `fill`, or `stroke` declaration, assert the value references `var(--color-*)` rather than a hardcoded hex, rgb, or named color

  - [ ]* 3.8 Write property test for responsive layout overflow (Property 1)
    - **Property 1: Responsive Layout — No Overflow at Any Viewport Width**
    - **Validates: Requirements 2.1**
    - Use Playwright with `fc.integer({ min: 320, max: 2560 })` to generate viewport widths; at each width assert `document.body.scrollWidth <= window.innerWidth`

- [x] 4. Checkpoint — Ensure HTML and CSS render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement JavaScript modules
  - [x] 5.1 Implement `src/js/smooth-scroll.js`
    - Export a `initSmoothScroll()` function that attaches `click` listeners to all `a[href^="#"]` elements and calls `element.scrollIntoView({ behavior: 'smooth' })` on the target
    - _Requirements: 4.2_

  - [x] 5.2 Implement `src/js/navigation.js`
    - Export `initNavigation()` that handles two behaviors:
      1. Mobile hamburger toggle: click listener on `.nav-toggle` that toggles `aria-expanded` and a CSS class on `#nav-menu`
      2. Active section tracking: `IntersectionObserver` that adds/removes the `active` class on nav links as sections enter/leave the viewport; only one link should have `active` at a time
    - Gracefully degrade if `IntersectionObserver` is not available
    - _Requirements: 4.3, 4.4, 8.3_

  - [x] 5.3 Implement `src/js/contact.js`
    - Export `initContactForm()` that intercepts `#contact-form` submission:
      1. Client-side validation: check name, email (format), and message are non-empty; display inline error messages linked via `aria-describedby`
      2. On valid submission: `fetch` POST to the form's `action` URL with `FormData`
      3. On success (`response.ok`): inject "Thank you! Your message has been sent." into `#form-status` and clear form fields
      4. On network error: inject "Unable to send message. Please try again or email directly." into `#form-status`
      5. On server error (non-2xx): inject "Message could not be delivered. Please try again later." into `#form-status`
    - _Requirements: 6.3, 6.4, 9.4, 9.5_

  - [x] 5.4 Implement `src/js/main.js`
    - Import and call `initSmoothScroll()`, `initNavigation()`, and `initContactForm()` after `DOMContentLoaded`
    - _Requirements: 10.1, 10.2_

  - [ ]* 5.5 Write unit tests for `navigation.js`
    - Use jsdom to simulate the DOM; test hamburger toggle sets `aria-expanded` correctly; test that `initNavigation()` does not throw when `IntersectionObserver` is absent
    - _Requirements: 4.3, 4.4_

  - [ ]* 5.6 Write property test for active navigation state correctness (Property 3)
    - **Property 3: Active Navigation State Correctness**
    - **Validates: Requirements 4.3**
    - Use Playwright to iterate over each section; scroll it into view and assert the corresponding nav link has the `active` class and no other nav link does

  - [ ]* 5.7 Write property test for navigation completeness (Property 2)
    - **Property 2: Navigation Completeness**
    - **Validates: Requirements 3.5**
    - Parse the DOM; for every `<section id="...">` element, assert the nav contains an `<a href="#<id>">` link

  - [ ]* 5.8 Write unit tests for `contact.js`
    - Use jsdom + fetch mock; test each error scenario (validation failure, network error, server error, success) and assert `#form-status` is updated with the correct non-empty message
    - _Requirements: 6.4_

  - [ ]* 5.9 Write property test for contact form submission feedback (Property 5)
    - **Property 5: Contact Form Submission Feedback**
    - **Validates: Requirements 6.4**
    - Use fast-check to generate valid and invalid form payloads (`fc.record({ name, email, message })` with validity variants); for each, assert `#form-status` is non-empty after submission and differs from the pre-submission empty state

- [x] 6. Checkpoint — Ensure all JavaScript tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Add images, assets, and accessibility attributes
  - [x] 7.1 Add placeholder/optimized images
    - Place `src/images/profile.webp` (profile photo, optimized WebP) and `src/images/favicon.ico`
    - Place at least one project screenshot as `src/images/projects/*.webp` (max 800px wide)
    - Place `src/assets/resume.pdf` if a resume download is desired
    - _Requirements: 5.2, 7.2_

  - [x] 7.2 Verify all `<img>` elements have explicit `width`, `height`, and correct `loading` attributes
    - Hero/profile image: no `loading="lazy"` (in initial viewport)
    - All other images: `loading="lazy"`
    - All `<script>` elements: have `defer` or `async`
    - _Requirements: 7.2, 7.4_

  - [ ]* 7.3 Write property test for image optimization (Property 6)
    - **Property 6: Image Optimization**
    - **Validates: Requirements 7.2**
    - Traverse all `<img src="...">` elements in the DOM; assert each `src` ends in `.webp` and the element has non-empty `width` and `height` attributes

  - [ ]* 7.4 Write property test for lazy loading (Property 7)
    - **Property 7: Lazy Loading for Non-Hero Images**
    - **Validates: Requirements 7.4**
    - Traverse all `<img>` elements that are not the hero image; assert each has `loading="lazy"`; traverse all `<script>` elements and assert each has `defer` or `async`

  - [ ]* 7.5 Write property test for image alternative text (Property 9)
    - **Property 9: Image Alternative Text**
    - **Validates: Requirements 9.2**
    - Use fast-check with `fc.array(fc.record({ src: fc.string(), alt: fc.string() }))` to generate img scenarios; assert non-decorative images have non-empty `alt`; also traverse the actual document and assert every `<img>` either has a non-empty `alt` or `alt=""` with `role="presentation"`

- [x] 8. Implement accessibility and ARIA enhancements
  - [x] 8.1 Audit and fix color contrast
    - Integrate axe-core into a Playwright test; run against the rendered page and assert zero color-contrast violations (WCAG 2.1 AA: 4.5:1 for normal text, 3:1 for large text)
    - _Requirements: 9.3_

  - [x] 8.2 Verify keyboard navigation and ARIA labels
    - Ensure all interactive elements (nav links, hamburger button, form inputs, submit button, project links) are reachable via Tab and have visible text or `aria-label`
    - _Requirements: 9.4, 9.5_

  - [ ]* 8.3 Write property test for interactive element accessibility (Property 10)
    - **Property 10: Interactive Element Accessibility**
    - **Validates: Requirements 9.4, 9.5**
    - Use Playwright to traverse all `button`, `a`, and `input` elements; assert none have `tabindex="-1"` unless intentional; assert elements with no visible text have a non-empty `aria-label` or `aria-labelledby`

- [x] 9. Create documentation files
  - [x] 9.1 Write `README.md`
    - Include: project overview, how to clone and view locally, how to deploy (GitHub Pages setup steps), and a brief description of the file structure
    - _Requirements: 10.4_

  - [x] 9.2 Write `CONTENT_GUIDE.md`
    - Step-by-step instructions for updating: name/bio text, project cards (adding/removing), profile image, social links, contact email, and Formspree endpoint
    - _Requirements: 10.2, 10.4_

  - [ ]* 9.3 Write unit test asserting `README.md` and `CONTENT_GUIDE.md` exist and are non-empty
    - _Requirements: 10.4_

- [x] 10. Set up test infrastructure
  - Initialize a minimal Node.js test environment: `package.json` with `"type": "module"`, install `fast-check`, `jsdom`, and `playwright` as dev dependencies
  - Configure a test runner (e.g., Vitest or Node's built-in test runner) to discover and run all test files
  - Add a `test` script to `package.json`
  - Add a GitHub Actions job (or step) to `deploy.yml` that runs tests on pull requests
  - _Requirements: 1.2_

- [x] 11. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 12. Wire everything together and verify the full site
  - [x] 12.1 Confirm `src/index.html` references all CSS and JS files correctly and all section `id` values match nav `href` values
    - _Requirements: 3.5, 4.2, 10.1_

  - [x] 12.2 Verify the GitHub Actions workflow file is valid YAML and contains all required steps and permissions
    - _Requirements: 1.1, 1.2, 1.4_

  - [ ]* 12.3 Write integration tests for cross-browser rendering
    - Use Playwright to run the full page in Chromium, Firefox, and WebKit; assert no console errors, all four sections are visible, and the nav is functional
    - _Requirements: 8.1, 8.2_

  - [ ]* 12.4 Write smoke test for file size constraints
    - Assert `src/css/styles.css` (and each partial) and `src/js/main.js` are each under 50KB
    - _Requirements: 7.3_

- [x] 13. Final checkpoint — Full site review
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use fast-check with jsdom (DOM properties) and Playwright (visual/interaction properties)
- Unit tests use jsdom for structural HTML/JS assertions
- All color values in CSS must use `var(--color-*)` custom properties — no hardcoded hex or rgb values outside `variables.css`
- The contact form requires a Formspree account; update the `action` URL in `index.html` before going live
- Test infrastructure (Task 10) can be set up at any point before running the test sub-tasks
