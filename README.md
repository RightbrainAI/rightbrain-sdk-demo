# RightBrain SDK Demo

A Next.js App Router example demonstrating `@rightbrain/sdk` integration with TypeScript (via a server-side proxy) and JavaScript (via a direct Node.js client).

---

## Project Structure

```
src/
  app/
    api/tasks/route.ts                    # Server-side proxy endpoint
    page.tsx                              # Demo UI
  components/
    prd-analysis-form.tsx                 # Text-only task example
    profile-photo-verification-form.tsx   # Image task example
    product-listing-form.tsx              # Text + image task example
  generated/
    index.ts                              # Auto-generated types from task definitions
  lib/
    rightbrain.ts                         # SDK client setup (PublicTransport)
    use-task.ts                           # React hook for task execution
direct-transport/
  index.js                                # Standalone Node.js example (DirectTransport)
rb-tasks/                                 # YAML task definitions
scripts/
  setup-tasks.mjs                         # Task creation script
rightbrain.json                           # CLI configuration
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

Creates three tasks in your RightBrain project and appends their IDs to `.env`.

### 4. Initialize configuration

```bash
npx rightbrain@latest init
```

Select the tasks created in step 3. Ignore the warning about an existing config file.

Generates `src/generated/index.ts` with fully-typed task interfaces based on your task definitions.

### 5. Start the development server

```bash
pnpm dev
```

---

## Troubleshooting

**TypeScript errors after setup:**

If you renamed tasks during creation, the generated types may not match. Either:

- Re-run `npx rightbrain@latest generate` after ensuring task names match
- Update component files to use the correct generated type names

**Missing environment variables:**

Ensure your `.env` file contains all required variables. The `setup-tasks` script should populate task IDs automatically, but `RB_ORG_ID`, `RB_PROJECT_ID`, and `RB_API_KEY` must be set via `npx rightbrain@latest login` and then `npx rightbrain@latest init`.

---

## Learn More

- [RightBrain Documentation](https://docs.rightbrain.ai)
- [Next.js Documentation](https://nextjs.org/docs)
