# Rightbrain SDK Demo

This repository demonstrates how to integrate the Rightbrain SDK and CLI into a Next.js application. It showcases a simple product listing generator that uses Rightbrain's AI capabilities.

## Prerequisites

- Node.js 18 or later
- pnpm
- A Rightbrain account with API credentials

## Setup

1. Clone this repository
2. Install dependencies:

```bash
pnpm install
```

3. Copy `.env.example` to `.env.local` and fill in your Rightbrain credentials:

```bash
RB_ORG_ID=your_org_id
RB_PROJECT_ID=your_project_id
RB_OAUTH2_URL=your_oauth_url
RB_API_URL=your_api_url
RB_CLIENT_ID=your_client_id
RB_CLIENT_SECRET=your_client_secret
RB_OAUTH2_TOKEN_PATH=/oauth/token
```

You can create an Oauth 2.0 client in your [Rightbrain dash](https://app.rightbrain.ai/preferences?tab=api-clients):

<img width="743" height="789" alt="Screenshot 2025-07-23 at 09 08 45" src="https://github.com/user-attachments/assets/c3bea789-580c-41a8-90e2-a4bd335d4ebd" />

Once created, click the `Client.env` button to copy the details (this will contain the secret for a new client):

<img width="1005" height="512" alt="Screenshot 2025-07-23 at 09 09 47" src="https://github.com/user-attachments/assets/469d1714-6b35-4952-8f33-19f8069699b3" />

4. Run the setup script to create the required Rightbrain tasks:

```bash
pnpm run populate-tasks
```

You will now see 3 new tasks in your Rightbrain dashboard.

5. Run the generate script to generate the rightbrain client via the CLI

```bash
pnpm run generate-sdk
```

6. Run the development server to spin up a local web app that demonstrates tasks working via the SDK:

```bash
pnpm run dev
```

Each time you use one of the demo apps, you will be able to see the raw API call within the task's run interface.

## Key Components

### 1. CLI Configuration

The Rightbrain CLI is configured using `rightbrain.config.ts`. This file specifies your organization details and API credentials:

```typescript
// rightbrain.config.ts
const config: Config = {
  orgId: combinedEnv.RB_ORG_ID as string,
  projectId: combinedEnv.RB_PROJECT_ID as string,
  oauthUrl: combinedEnv.RB_OAUTH2_URL as string,
  apiUrl: combinedEnv.RB_API_URL as string,
  clientId: combinedEnv.RB_CLIENT_ID as string,
  clientSecret: combinedEnv.RB_CLIENT_SECRET as string,
  output: "./src/generated",
};
```

The CLI will use this configuration to generate type-safe SDK code in the `src/generated` directory.

### 2. Authentication

You can use either your RightBrain API key or OAuth2 authentication, which is handled in the `access-token.ts` utility:

```typescript
// src/utils/access-token.ts
export const getAccessToken = async (): Promise<AccessToken> => {
  if (
    !process.env.RB_OAUTH2_URL ||
    !process.env.RB_CLIENT_ID ||
    !process.env.RB_OAUTH2_TOKEN_PATH ||
    !process.env.RB_CLIENT_SECRET
  ) {
    throw new Error(
      "RB_OAUTH2_URL, RB_CLIENT_ID, RB_OAUTH2_TOKEN_PATH, and RB_CLIENT_SECRET must be set"
    );
  }

  if (!accessToken || accessToken.expired()) {
    const client = new ClientCredentials({
      auth: {
        tokenHost: process.env.RB_OAUTH2_URL,
        tokenPath: process.env.RB_OAUTH2_TOKEN_PATH,
      },
      client: {
        id: process.env.RB_CLIENT_ID,
        secret: process.env.RB_CLIENT_SECRET,
      },
      http: { json: "force" },
    });

    accessToken = await client.getToken({});
  }

  return accessToken;
};
```

This implementation uses the client credentials flow and caches the token. In a production environment, you should:

- Add your own authentication layer before allowing access to Rightbrain API routes
- Implement proper token storage and refresh mechanisms
- Add rate limiting and error handling

### 3. API Route Handler

The application uses Next.js App Router to create an API route that interfaces with the Rightbrain SDK:

```typescript
// src/app/tasks/product-listing/route.ts
export async function POST(request: Request) {
  // Add your own auth logic here to ensure the user has access to the project
  const accessToken = await getAccessToken();

  const body = await request.json();
  const product_name = body.product_name;
  const image = body.image;

  if (!product_name || !image) {
    return new Response("Missing product_name or image in request body", {
      status: 400,
    });
  }

  const rightbrain = RightBrainClient.getInstance({
    accessToken: accessToken.token.access_token as string,
    baseUrl: process.env.RB_API_URL as string,
    organizationId: process.env.RB_ORG_ID as string,
    projectId: process.env.RB_PROJECT_ID as string,
  });

  const response = await rightbrain.runGenerateImageBasedProductListing({
    inputs: { product_name },
  });

  return Response.json(response);
}
```

This route handler:

- Validates the incoming request
- Obtains an access token
- Initializes the Rightbrain client
- Makes the API call and returns the response

### 4. React Hook

A custom hook provides a clean interface for components to interact with the API: [useGenerateImageBasedProductListing](./src/hooks/use-generate-image-based-product-listing.ts)

### 5. UI Component

The form component demonstrates how to use the hook and handle the API response:
[ProductListingForm](./src/components/product-listing-form.tsx)

## Development

Run the development server:

```bash
pnpm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Important Notes

1. **Security**: This is a demo implementation. In production:

   - Add proper authentication
   - Implement secure token management
   - Add rate limiting
   - Add proper error handling
   - Add input validation
   - Add proper CORS configuration

2. **Generated Code**: The `src/generated` directory contains SDK code generated by the Rightbrain CLI. Don't modify these files directly.

3. **Environment Variables**: Never commit your `.env.local` file. Keep your credentials secure.

## Learn More

- [Rightbrain Documentation](https://docs.rightbrain.ai/intro)
- [Next.js Documentation](https://nextjs.org/docs)
- [Rightbrain Case Studies](https://rightbrain.ai/#case-studies)
