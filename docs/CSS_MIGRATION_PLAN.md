# Migrate from Tailwind CDN to Pure CSS

## Problem
Tailwind CDN is blocked on itch.io. Manual polyfilling is fragile and incomplete.

## Solution
Create a standalone `style.css` with all required styles. Remove Tailwind CDN.

## Approach
**Keep existing class names** in components but define them in `style.css`. This minimizes code changes while eliminating the CDN dependency.

## Steps
1. Create `public/style.css` with all Tailwind utility classes used in the project
2. Remove `<script src="cdn.tailwindcss.com">` from `index.html`
3. Add `<link rel="stylesheet" href="style.css">` to `index.html`
4. Move all inline styles from `index.html` to `style.css`
5. Build and test

## Status
**PENDING** - Ready to implement when you return.

## Command to Resume
Just say: "Implement the CSS migration plan" and I'll proceed.
