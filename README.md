# Sew Smart Creations — Static Website

Responsive, dark/light-mode static site for Sew Smart Creations (mobile sewing classes in Utah & Salt Lake Counties). Built for GitHub Pages.

## Local Preview
Open `index.html` in your browser.

## Structure
- `index.html` — Home
- `about.html` — About
- `contact.html` — Contact with mailto form
- `assets/styles.css` — Styles (responsive + theme)
- `assets/script.js` — Theme toggle + form handling
- `404.html` — GitHub Pages 404 fallback
- `assets/favicon.svg` — Favicon
- `.nojekyll` — Disable Jekyll processing on GitHub Pages

## Deploy to GitHub Pages
1. Create a new GitHub repository (user site `sewsmartcreations.github.io` or any repo for project pages).
2. Push this folder's contents to the repository root.
3. In GitHub → Settings → Pages:
   - If user/organization site: Served from the default branch root automatically.
   - If project site: Choose "Deploy from a branch" and select `main` and `/ (root)`.
4. Your site will be available at `https://<username>.github.io/` (user site) or `https://<username>.github.io/<repo>/` (project site).

### Project Pages note
Internal links are relative (`index.html`, `about.html`, etc.), so subpaths are supported.

## Contact Form
The form uses a `mailto:` link to open the user's email client with structured details. For a hosted form backend, replace the JS with your provider's endpoint.

## License
All content © Sew Smart Creations. Code MIT.
