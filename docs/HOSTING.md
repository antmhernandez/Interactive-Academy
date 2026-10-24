# Hosting and publishing

## GitHub Pages proof of concept
The site is currently pure HTML, CSS, JavaScript and JSON; there are no build dependencies. Put `index.html`, `styles.css`, `app.js` and `content/` in the repository root.

**Repository rename (manual):** in GitHub, `Settings → General → Repository name → Rename`, change the current name to `Interactive-Academy`. GitHub normally redirects old repository URLs. This connector does not expose repository administration/renaming.

**Pages setup (manual):** `Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save`. After Pages deployment is completed, look in Settings → Pages for the confirmed site URL and Visit site control.

With the proposed name, a *typical* GitHub project Pages URL is `https://antmhernandez.github.io/Interactive-Academy/`. This is an anticipated address, not confirmation that Pages is enabled or live.

### Visibility and plans
- GitHub Free: Pages source repository must be public.
- GitHub Pro, Team and eligible Enterprise plans: a private repository can publish a Pages website.
- **A private source repository does not make a private website.** GitHub Pages sites are publicly accessible even when the source repo is private, except eligible Enterprise private Pages deployments.
- GitHub Pages is not a platform for paid SaaS, checkout or protected student data. Use appropriate hosting for later commercial features.

### Alternatives while the code stays private
Cloudflare Pages may deploy from a private GitHub repository on a free plan, after you authorize the repo in Cloudflare. The site will still be publicly accessible unless separately protected by an authentication layer. Either way keep code in GitHub and hosting independent.

## Local preview
From the checked-out root:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000/`. Double-clicking `index.html` may prevent the lesson JSON from loading, because some browsers disallow `fetch` from local files.

## Deployment verification
1. Check the repository is named correctly.
2. Confirm Pages' source and latest deployment status.
3. Load the actual published URL without GitHub login.
4. Test Home, Physics, Calculus, a lesson, a slider, an example and answer feedback.
5. Re-test at phone width and verify the printables open.
6. Do not describe a guessed `github.io` address as live until verified.

## Commercial migration
When subscriptions or licensed downloads are launched, use an appropriate commercial website and private server-side storage. Keep this repository as the source of truth for original public lessons and UI code. Avoid automatic bills: set strict quotas and verify pricing.
