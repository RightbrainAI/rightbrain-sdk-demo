/* eslint-disable @typescript-eslint/no-require-imports */
const { Client, DirectTransport } = require("@rightbrain/sdk");

const fs = require("fs");
const path = require("path");

/** @type {import("../src/generated/index").Tasks} */
const rb = new Client({
  transport: new DirectTransport({
    orgId: process.env.RB_ORG_ID,
    projectId: process.env.RB_PROJECT_ID,
    accessToken: process.env.RB_API_KEY,
    baseUrl: process.env.RB_API_BASE_URL,
  }),
});

/** @type {{ prdAnalysis: import("../src/generated/index").TaskIds["PRDAnalysis"]; profileImageVerification: import("../src/generated/index").TaskIds["ProfileImageVerification"]; generateImageBasedProductListing: import("../src/generated/index").TaskIds["GenerateImageBasedProductListing"] }} */
const taskIds = {
  prdAnalysis: process.env.NEXT_PUBLIC_PRD_ANALYSIS_TASK_ID,
  profileImageVerification:
    process.env.NEXT_PUBLIC_PROFILE_IMAGE_VERIFICATION_TASK_ID,
  generateImageBasedProductListing:
    process.env.NEXT_PUBLIC_GENERATE_IMAGE_BASED_PRODUCT_LISTING_TASK_ID,
};

async function main() {
  if (!taskIds.generateImageBasedProductListing) {
    throw new Error("Generate Image-Based Product Listing task ID is not set");
  }

  console.log("Running task...", taskIds.generateImageBasedProductListing);

  const imagePath = path.join(
    __dirname,
    "airpods-max-select-202409-starlight.jpeg",
  );
  const imageBuffer = fs.readFileSync(imagePath);
  const imageFile = new File([imageBuffer], path.basename(imagePath), {
    type: "image/jpeg",
  });

  const result = await rb[taskIds.generateImageBasedProductListing].run({
    files: [imageFile],
    inputs: {
      product_name: "AirPods Max Select 2024",
    },
  });

  console.dir(result, { depth: null });
}

main().catch(console.error);
