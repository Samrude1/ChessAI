---
description: Back up the project to a local git repository
---

This workflow will help you initialize a git repository (if needed), stage all files, and create a commit.

1. Initialize git repository if not already done
// turbo
```bash
if not exist .git ( git init )
```

2. Add all files to staging
// turbo
```bash
git add .
```

3. Commit changes (You'll be asked for a commit message, default is "Backup")
```bash
git commit -m "Stable checkpoint: Custom engine with timeouts fix"
```

4. (Optional) Show the status
// turbo
```bash
git status
```
