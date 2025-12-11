---
description: Back up the project to a local git repository
---

1. Check current git status
git status

2. Add all changes (respecting .gitignore)
git add .

3. Commit with a timestamped backup message
// PROMPT: Enter commit message (or press Enter for default timestamp):
git commit -m "Backup: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"

4. Push changes (if remote is configured)
git push
