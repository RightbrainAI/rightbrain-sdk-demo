import { type Config } from "@rightbrain/cli";

import { loadEnvConfig } from "@next/env";

const { combinedEnv } = loadEnvConfig(".");

const config: Config = {
  orgId: combinedEnv.RB_ORG_ID as string,
  projectId: combinedEnv.RB_PROJECT_ID as string,
  oauthUrl: combinedEnv.RB_OAUTH2_URL as string,
  apiUrl: combinedEnv.RB_API_URL as string,
  clientId: combinedEnv.RB_CLIENT_ID as string,
  clientSecret: combinedEnv.RB_CLIENT_SECRET as string,
  output: "./src/generated",
};

export default config;
