# RightBrain SDK Demo

A Next.js App Router example demonstrating `@rightbrain/sdk` integration with TypeScript.

---

## Project Structure

```
src/
  app/
    api/tasks/route.ts    # Server-side proxy endpoint
    page.tsx              # Demo UI
  components/
    prd-analysis-form.tsx           # Text-only task example
    profile-photo-verification-form.tsx  # Image task example
    product-listing-form.tsx        # Text + image task example
  lib/
    rightbrain.ts         # SDK client setup
    use-task.ts           # React hook for task execution
rb-tasks/                 # YAML task definitions
rightbrain.json           # CLI configuration
```

---

## Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Authenticate with RightBrain

```bash
npx rightbrain@latest login
```

### 3. Create demo tasks

```bash
pnpm setup-tasks
```

Creates three tasks in your RightBrain project and appends task IDs to `.env`.

### 4. Initialize configuration

```bash
npx rightbrain@latest init
```

Select the tasks created in step 3. Ignore the warning about existing config file.

### 5. Start development server

```bash
pnpm dev
```

---

**TypeScript errors after setup:**

If you renamed tasks during creation, the generated types may not match. Either:

- Re-run `npx rightbrain@latest generate` after ensuring task names match
- Update component files to use the correct generated type names

---

## Learn More

- [RightBrain Documentation](https://docs.rightbrain.ai)
- [Next.js Documentation](https://nextjs.org/docs)
