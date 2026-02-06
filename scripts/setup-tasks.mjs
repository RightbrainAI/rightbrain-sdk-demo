#!/usr/bin/env node

import { spawnSync } from "child_process";
import { appendFileSync } from "fs";

const tasks = [
  {
    envVar: "NEXT_PUBLIC_PRD_ANALYSIS_TASK_ID",
    file: "./rb-tasks/create-prd-analysis-task.yaml",
  },
  {
    envVar: "NEXT_PUBLIC_GENERATE_IMAGE_BASED_PRODUCT_LISTING_TASK_ID",
    file: "./rb-tasks/create-product-listing-task.yaml",
  },
  {
    envVar: "NEXT_PUBLIC_PROFILE_IMAGE_VERIFICATION_TASK_ID",
    file: "./rb-tasks/create-profile-verification-task.yaml",
  },
];

console.log("🚀 Setting up Rightbrain tasks...\n");

for (const { envVar, file } of tasks) {
  try {
    const result = spawnSync("rightbrain", ["create-task", "--file", file], {
      encoding: "utf-8",
      stdio: ["inherit", "pipe", "inherit"],
    });

    if (result.status !== 0) {
      throw new Error(`Command exited with code ${result.status}`);
    }

    const taskId = JSON.parse(result.stdout).id;
    appendFileSync(".env", `${envVar}=${taskId}\n`);
    console.log(`✅ ${envVar}=${taskId}`);
  } catch (error) {
    console.error(`❌ Failed: ${file} - ${error.message}`);
  }
}

console.log(`\n📝 Task IDs added to .env`);
