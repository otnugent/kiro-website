# Personal Portfolio Website

A static personal/professional website built with vanilla HTML, CSS, and JavaScript, deployed to GitHub Pages via GitHub Actions.

## Features

- Responsive design supporting viewports from 320px to 2560px
- Dark theme with accessible color contrast (WCAG 2.1 AA)
- Smooth scroll navigation
- Mobile hamburger menu
- Project gallery
- Contact form powered by Formspree
- SEO meta tags and Open Graph support
- WCAG 2.1 AA accessibility

## File Structure

```
/
├── .github/workflows/deploy.yml   # GitHub Actions deployment
├── src/
│   ├── index.html                 # Main HTML file
│   ├── css/
│   │   ├── styles.css             # Entry point (imports all partials)
│   │   ├── variables.css          # CSS custom properties / design tokens
│   │   ├── reset.css              # CSS reset
│   │   ├── layout.css             # Page layout and grid
│   │   ├── components.css         # Component styles
│   │   └── responsive.css         # Responsive breakpoints
│   ├── js/
│   │   ├── main.js                # Entry point
│   │   ├── navigation.js          # Mobile nav + active section tracking
│   │   ├── smooth-scroll.js       # Smooth scroll behavior
│   │   └── contact.js             # Contact form validation + submission
│   ├── images/                    # Image assets
│   └── assets/                    # Other assets (resume, etc.)
├── README.md
└── CONTENT_GUIDE.md               # Guide for updating content
```

## Getting Started

### View Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/<username>/<repo-name>.git
   ```
2. Open `src/index.html` directly in your browser — no build step needed.

Or use a local development server for a closer-to-production experience:

```bash
npx serve src
```

Alternatively, use the [VS Code Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension and open `src/index.html`.

## Deploying to GitHub Pages

1. Push the repository to GitHub.
2. Go to your repository's **Settings → Pages**.
3. Under **Source**, select **GitHub Actions**.
4. Push a commit to the `main` branch — the workflow in `.github/workflows/deploy.yml` will automatically build and deploy the site.
5. Your site will be available at `https://<username>.github.io/<repo-name>`.

## Customizing Content

See [CONTENT_GUIDE.md](CONTENT_GUIDE.md) for step-by-step instructions on updating your name and bio, adding or removing project cards, swapping the profile image, updating social links, changing the contact email, and configuring the Formspree endpoint.

## Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties, grid, flexbox
- **Vanilla JavaScript** — ES modules, no framework
- **GitHub Pages** — static site hosting
- **GitHub Actions** — automated deployment pipeline
- **Formspree** — contact form backend

## License

MIT
