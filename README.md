# Rightbrain integration with Next.js App Router (TypeScript)

## Setup

1. Clone this repository & Install dependencies:

```bash
pnpm install
```

2. Authenticate the Rightbrain CLI:

```bash
npx rightbrain@latest login
```

3. Create tasks in your project for demo purposes:

```bash
pnpm setup-tasks
```

This will create 3 tasks in your Rightbrain dashboard and automatically append the task IDs to your `.env` file.

4. Initialize the Rightbrain CLI with your project configuration and select the tasks you just created (It will show warning about config file already existing, you can ignore that):

```bash
npx rightbrain@latest init
```

5. Generate TypeScript types for type-safe task integration:

```bash
npx rightbrain@latest generate
```

> **Warning:** If you set up tasks with different names than the defaults, you may need to fix some TypeScript errors in the component files that reference these task types.

6. Run the development server to spin up a local web app that demonstrates tasks working:

```bash
pnpm run dev
```

Each time you use one of the demo apps, you will be able to see the raw API call within the task's run interface.

## Learn More

- [Rightbrain Documentation](https://docs.rightbrain.ai)
- [Next.js Documentation](https://nextjs.org/docs)
