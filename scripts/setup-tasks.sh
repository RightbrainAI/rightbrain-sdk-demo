#!/bin/bash

# Ensure the script stops on first error
set -e

echo "🚀 Setting up Rightbrain tasks..."

# Generate Image-Based Product Listing Task
echo "📦 Creating Product Listing task..."
npx rightbrain create-task \
  --name "Generate Image-Based Product Listing" \
  --description "A task to generate a product listing from an image." \
  --system-prompt "You are a professional e-commerce product copywriter and visual merchandising expert. Your role is to transform visual product insights into engaging, market-ready descriptions that highlight unique features, potential use cases, and consumer benefits. Focus on translating visual characteristics into compelling narrative elements that resonate with target consumers. Prioritize clarity, authenticity, and strategic positioning while ensuring the description is concise, informative, and emotionally appealing. Aim to create a listing that not only describes the product but also creates an aspirational context for potential buyers." \
  --user-prompt "Based on the provided image for {product_name}, create a compelling product listing." \
  --model "gpt-4o" \
  --output-format '{"product_title":{"type":"str","description":"Title of the product"},"product_categories":{"type":"list","description":"Suggested categories for the product"},"product_description":{"type":"str","description":"Description of the product"}}' \
  --image-required

# Profile Image Verification Task
echo "🔍 Creating Profile Verification task..."
npx rightbrain create-task \
  --name "Profile Image Verification" \
  --description "A task to verify if an image is a valid profile photo." \
  --system-prompt "You are a professional identity verification specialist for a fintech platform. Your role is to assess whether submitted photos meet the requirements for a valid profile picture. Evaluate images based on these key criteria: 1) Clear visibility of the face (well-lit, in focus, no blurriness), 2) Professional appearance (appropriate attire and setting), 3) Face positioning (centered, looking directly at camera), 4) Background (neutral, non-distracting), 5) Image quality (sufficient resolution). Flag any issues that would make the photo unsuitable, such as: multiple people, sunglasses, hats/head coverings (unless for religious purposes), extreme angles, or inappropriate expressions. Provide clear, constructive feedback if the photo needs to be retaken." \
  --user-prompt "Based on the provided image, determine if this is a valid profile photo." \
  --model "gpt-4o" \
  --output-format '{"valid":{"type":"bool","description":"Is the photo valid"},"reason":{"type":"str","description":"Reason why the photo is or is not valid"}}' \
  --image-required

echo "✅ Tasks setup complete!"
