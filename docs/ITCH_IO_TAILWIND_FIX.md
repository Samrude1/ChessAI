# Itch.io Deployment & Tailwind CSS Guide

## The Problem: "Broken Layout / Unstyled Menu"
When deploying to itch.io (especially as an HTML5 embed), you might encounter an issue where the game looks perfect on `localhost` but appears broken online:
-   **Symptoms:**
    -   Transparent or unstyled text/buttons.
    -   Layouts collapsing (e.g., chessboard becoming tiny).
    -   Mobile styles triggering on desktop.
-   **Cause:** Itch.io serves games in an `iframe` with a strict **Content Security Policy (CSP)**.
    -   This policy often **blocks external scripts**, including the Tailwind Play CDN (`<script src="https://cdn.tailwindcss.com"></script>`).
    -   Since the script never runs, the utility classes (like `flex`, `p-4`, `bg-black`) are never generated, leaving elements unstyled.

## The Fix: "The Manual Polyfill"

### Solution 1: The "Hacker" Fix (Safe fallback for current project)
Because we used the CDN, we solved this by **manually injecting specific CSS** into `index.html`. This "tricks" the browser into rendering the styles even if Tailwind fails.

**What we added to `<style>` in `index.html`:**
1.  **Layout Utilities:** `.flex`, `.flex-col`, `.w-full`, `.h-full`.
2.  **Sizing Constraints:** `.aspect-square` (critical for boards!), `.min-w-[600px]` (prevents squashing).
3.  **Visuals:** `.bg-black`, `.border-2`, `.text-green-500`.

**Code Example:**
```css
/* Safety CSS polyfill */
.aspect-square { aspect-ratio: 1 / 1 !important; }
.flex { display: flex !important; }
.w-full { width: 100% !important; }
/* ... and so on for every used class */
```

### Solution 2: The "Professional" Fix (Recommended for future projects)
To avoid this completely in future games, **do not use the CDN link**. Instead, install Tailwind locally so it compiles into a standard `.css` file before upload.

**Steps:**
1.  Initialize project: `npm install -D tailwindcss postcss autoprefixer`
2.  Configure `tailwind.config.js`.
3.  Add directives to your CSS file:
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
4.  **Result:** When you run `npm run build`, Vite/Webpack generates a single `style.css` file. Itch.io **will not block this**, and your game will work perfectly 100% of the time.

## Quick Checklist for Itch.io
-   [ ] **No External CDNs:** Ensure all libraries (Tailwind, Fonts) are either bundled or confirmed to work.
-   [ ] **Viewport:** Use `width=device-width` but handle `min-width` in CSS to prevent mobile view on embedded iframes.
-   [ ] **Background:** Ensure the root `body` has a background color (iframe transparency can leak plain white).
