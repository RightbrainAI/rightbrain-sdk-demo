"use client";

import { useState } from "react";
import {
  type OutputGenerateImageBasedProductListing,
  useGenerateImageBasedProductListing,
} from "@/hooks/use-generate-image-based-product-listing";

export function ProductListingForm() {
  const { generateListing, isLoading, error } =
    useGenerateImageBasedProductListing();
  const [listing, setListing] =
    useState<OutputGenerateImageBasedProductListing | null>(null);

  return (
    <div>
      <form
        className="flex flex-col gap-4 w-full max-w-md"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);

          const product_name = formData.get("product_name");
          const imageFile = formData.get("image") as File;

          if (!product_name || !imageFile) {
            return;
          }

          const response = await generateListing({
            productName: product_name as string,
            image: imageFile,
          });

          setListing(response.response);
        }}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="product_name" className="font-medium">
            Product Name
          </label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            required
            className="border rounded-md px-3 py-2 bg-transparent"
            placeholder="Enter product name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="image" className="font-medium">
            Product Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            required
            accept="image/*"
            className="border rounded-md px-3 py-2 bg-transparent"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors"
        >
          Generate Product Listing
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {listing && (
        <div>
          <h2>Product Listing</h2>
          <p>{listing.product_title}</p>
          <p>{listing.product_categories}</p>
          <p>{listing.product_description}</p>
        </div>
      )}
    </div>
  );
}
