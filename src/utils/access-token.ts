import { type AccessToken, ClientCredentials } from "simple-oauth2";

declare global {
  // eslint-disable-next-line no-var
  var RB_ACCESS_TOKEN: AccessToken | null;
}
let accessToken: AccessToken | null = global?.RB_ACCESS_TOKEN;

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
