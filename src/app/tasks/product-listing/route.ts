import { getAccessToken } from "@/utils/access-token";
import { RightBrainClient } from "@/generated";

export async function POST(request: Request) {
  const accessToken = await getAccessToken();

  try {
    const formData = await request.formData();
    const product_name = formData.get("product_name") as string;
    const taskFile = formData.get("taskFile") as File;

    if (!product_name || !taskFile) {
      return new Response("Missing product_name or taskFile in request body", {
        status: 400,
      });
    }

    const rightbrain = new RightBrainClient({
      accessToken: accessToken.token.access_token as string,
      baseUrl: process.env.RB_API_URL as string,
      organizationId: process.env.RB_ORG_ID as string,
      projectId: process.env.RB_PROJECT_ID as string,
    });

    // Convert File to Blob for the API
    const fileBlob = new Blob([await taskFile.arrayBuffer()], {
      type: taskFile.type,
    });

    const response = await rightbrain.runGenerateImageBasedProductListing({
      inputs: { product_name },
      files: [fileBlob as File],
    });

    return Response.json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response("Error processing form data", { status: 400 });
  }
}
