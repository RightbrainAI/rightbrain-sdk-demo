import { getAccessToken } from "@/utils/access-token";
import { RightBrainClient } from "@/generated";

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
    product_name,
  });

  return Response.json(response);
}
