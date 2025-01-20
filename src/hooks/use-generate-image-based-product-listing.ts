import { useState } from "react";

import {
  type InputGenerateImageBasedProductListing,
  type OutputGenerateImageBasedProductListing,
} from "@/generated";

export function useGenerateImageBasedProductListing() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateListing = async ({
    productName,
    image,
  }: InputGenerateImageBasedProductListing) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/tasks/product-listing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_name: productName,
          image: image,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: { response: OutputGenerateImageBasedProductListing } =
        await response.json();
      return data;
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateListing,
    isLoading,
    error,
  };
}
