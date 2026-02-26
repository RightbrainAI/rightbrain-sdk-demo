import { Client, PublicTransport } from "@rightbrain/sdk";
import { type Tasks, TaskIds } from "../generated";

export const rb = new Client<Tasks>({
  transport: new PublicTransport({ baseUrl: "/api/tasks" }),
});

export const taskIds = {
  prdAnalysis: process.env
    .NEXT_PUBLIC_PRD_ANALYSIS_TASK_ID as TaskIds["PRDAnalysis"],
  profileImageVerification: process.env
    .NEXT_PUBLIC_PROFILE_IMAGE_VERIFICATION_TASK_ID as TaskIds["ProfileImageVerification"],
  generateImageBasedProductListing: process.env
    .NEXT_PUBLIC_GENERATE_IMAGE_BASED_PRODUCT_LISTING_TASK_ID as TaskIds["GenerateImageBasedProductListing"],
} as const;
