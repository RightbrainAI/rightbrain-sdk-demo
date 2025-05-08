import { type Config } from "@rightbrain/cli";

const config: Config = {
  orgId: process.env.RB_ORG_ID as string,
  projectId: process.env.RB_PROJECT_ID as string,
  oauthUrl: process.env.RB_OAUTH2_URL as string,
  apiUrl: process.env.RB_API_URL as string,
  clientId: process.env.RB_CLIENT_ID as string,
  clientSecret: process.env.RB_CLIENT_SECRET as string,
  output: "./src/generated",
};

export default config;
