# Content Guide

Step-by-step instructions for updating the website content. All changes are made in `src/index.html` unless otherwise noted.

---

## 1. Update Your Name and Bio

**Name** — appears in three places:
1. `<title>` tag in `<head>`: change `Alex Johnson | Developer`
2. `.nav-logo` link text: change `Alex Johnson`
3. `<h1 id="home-heading">`: change `Alex Johnson`
4. `<footer>` copyright: change `Alex Johnson`
5. Open Graph tags: update `og:title` and `og:description` content attributes

**Tagline** — find `.hero__tagline` and update the text:
```html
<p class="hero__tagline">Your Tagline Here</p>
```

**Bio paragraphs** — find the `#about` section and update the `<p>` tags inside `.about__bio`.

**Skills** — find `.skills__list` and update the `<li>` items with your actual skills.

---

## 2. Update the Profile Image

1. Prepare your photo as a WebP file, ideally 400×400px or larger (square crop works best).
2. Save it as `src/images/profile.webp`.
3. In `src/index.html`, find the hero `<img>` and update the `src`:
   ```html
   <img src="images/profile.webp" alt="Your Name, your title" width="200" height="200" class="hero__avatar">
   ```
4. Update the `alt` attribute with your name and role.

---

## 3. Add or Remove Project Cards

Each project card lives inside `<div class="projects__grid">` in the `#projects` section.

**To add a project**, copy this template and paste it inside `.projects__grid`:
```html
<article class="project-card">
  <img src="images/projects/your-project.webp"
       alt="Brief description of what the screenshot shows"
       width="400" height="225" loading="lazy">
  <div class="project-card__content">
    <h3 class="project-card__title">Project Name</h3>
    <p class="project-card__description">1–3 sentence description of the project.</p>
    <div class="project-card__links">
      <a href="https://your-demo-url.com" class="btn btn--primary"
         target="_blank" rel="noopener noreferrer">Live Demo</a>
      <a href="https://github.com/you/repo" class="btn btn--secondary"
         target="_blank" rel="noopener noreferrer">Source Code</a>
    </div>
  </div>
</article>
```

**Project images** — save as WebP at max 800px wide in `src/images/projects/`. Name them descriptively (e.g., `weather-app.webp`).

**To remove a project**, delete the entire `<article class="project-card">...</article>` block.

---

## 4. Update Social Links

Find the `.contact__social` div in the `#contact` section:
```html
<div class="contact__social">
  <a href="https://github.com/YOUR_USERNAME" target="_blank" rel="noopener noreferrer"
     aria-label="GitHub profile">GitHub</a>
  <a href="https://linkedin.com/in/YOUR_USERNAME" target="_blank" rel="noopener noreferrer"
     aria-label="LinkedIn profile">LinkedIn</a>
</div>
```

Replace `YOUR_USERNAME` with your actual usernames. To add more platforms (Twitter/X, Dribbble, etc.), copy one of the `<a>` tags and update the `href`, `aria-label`, and link text.

---

## 5. Update the Contact Email

Find the email link in the `#contact` section:
```html
<a href="mailto:alex@example.com" class="contact__email">alex@example.com</a>
```

Replace both `alex@example.com` instances with your actual email address.

---

## 6. Configure the Contact Form (Formspree)

The contact form uses [Formspree](https://formspree.io) to handle submissions without a server.

1. Create a free account at [formspree.io](https://formspree.io).
2. Create a new form and copy your form endpoint URL (looks like `https://formspree.io/f/abcdefgh`).
3. In `src/index.html`, find the `<form>` tag and update the `action` attribute:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" ...>
   ```
4. Replace `YOUR_FORM_ID` with your actual form ID.

---

## 7. Update the Open Graph Image

The Open Graph image appears when your site is shared on social media.

1. Create a 1200×630px image (PNG or WebP) representing your site.
2. Save it as `src/images/og-image.webp`.
3. Update the `og:image` meta tag in `<head>`:
   ```html
   <meta property="og:image" content="images/og-image.webp">
   ```
4. Update `og:url` with your actual GitHub Pages URL:
   ```html
   <meta property="og:url" content="https://yourusername.github.io">
   ```

---

## 8. Update the Favicon

1. Create a 32×32px favicon (SVG recommended for sharpness at all sizes).
2. Save it as `src/images/favicon.svg`.
3. The `<link rel="icon">` in `<head>` already points to `images/favicon.svg` — no change needed unless you use a different format.

For a `.ico` fallback (older browsers), add:
```html
<link rel="icon" href="images/favicon.ico" sizes="any">
<link rel="icon" href="images/favicon.svg" type="image/svg+xml">
```

---

## 9. Add a Downloadable Resume

1. Save your resume as `src/assets/resume.pdf`.
2. Add a download link wherever you'd like it to appear (e.g., in the hero or about section):
   ```html
   <a href="assets/resume.pdf" class="btn btn--secondary" download>Download Resume</a>
   ```

---

## 10. Change the Color Theme

All colors are defined as CSS custom properties in `src/css/variables.css`. Edit the values in the `:root` block to change the theme. The key tokens are:

| Token | Purpose |
|---|---|
| `--color-bg` | Main page background |
| `--color-bg-alt` | Alternate section background |
| `--color-primary` | Accent color (buttons, links, active nav) |
| `--color-text` | Primary text color |
| `--color-text-muted` | Secondary/muted text |

After changing colors, verify contrast ratios remain WCAG AA compliant (4.5:1 for normal text). Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to verify.
