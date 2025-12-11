---
description: Build the project for itch.io offline mode (hides .env.local during build)
---

// turbo-all

1. Temporarily rename .env.local to hide API key
mv .env.local _env.local

2. Run the build process
npm run build

3. Restore .env.local
mv _env.local .env.local

4. Confirmation
echo "Build complete! The 'dist' folder is ready for itch.io (Offline Mode)."
