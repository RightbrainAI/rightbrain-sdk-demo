import { Client, PublicTransport } from "@rightbrain/sdk";
import { TaskIds, tasks } from "@rightbrain/sdk/generated";

const client = new Client({
  transport: new PublicTransport({ baseUrl: "/api/tasks" }),
});

export const rb = tasks(client);

export const taskIds = {
  prdAnalysis: process.env
    .NEXT_PUBLIC_PRD_ANALYSIS_TASK_ID as TaskIds["PRDAnalysis"],
  profileImageVerification: process.env
    .NEXT_PUBLIC_PROFILE_IMAGE_VERIFICATION_TASK_ID as TaskIds["ProfileImageVerification"],
  generateImageBasedProductListing: process.env
    .NEXT_PUBLIC_GENERATE_IMAGE_BASED_PRODUCT_LISTING_TASK_ID as TaskIds["GenerateImageBasedProductListing"],
} as const;
