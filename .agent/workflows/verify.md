---
description: Verify project integrity (Lint & Type Check)
---

Run this workflow to check for code quality issues and type errors.

1. Run Type Checking
// turbo
```bash
npx tsc --noEmit
```

2. Run Linter (if configured)
// turbo
```bash
npm run lint
```
