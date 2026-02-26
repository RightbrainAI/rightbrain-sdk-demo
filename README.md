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

## Running the Direct Transport Example

The `direct-transport/` directory contains a standalone Node.js script that uses `DirectTransport` to call a task without a server-side proxy. It requires the same env vars as the Next.js app plus `dotenvx` (already a dependency).

```bash
pnpm direct-transport
```

This reads from `.env` and runs the `GenerateImageBasedProductListing` task against a bundled sample image.

---

## Troubleshooting

**TypeScript errors after setup:**

If you renamed tasks during creation, the generated types may not match. Either:

- Re-run `pnpm generate-tasks` after ensuring task names match
- Update component files to use the correct generated type names

**Missing environment variables:**

Ensure your `.env` file contains all required variables. The `setup-tasks` script populates the `NEXT_PUBLIC_*_TASK_ID` vars automatically. `RB_ORG_ID`, `RB_PROJECT_ID`, and `RB_API_KEY` are written by `npx rightbrain@latest login` and `npx rightbrain@latest init`.

---

## Learn More

- [RightBrain Documentation](https://docs.rightbrain.ai)
- [Next.js Documentation](https://nextjs.org/docs)
