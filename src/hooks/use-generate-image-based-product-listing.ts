import { useState } from "react";

import {
  type InputGenerateImageBasedProductListing,
  type OutputGenerateImageBasedProductListing,
} from "@/generated";

export function useGenerateImageBasedProductListing() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateListing = async ({
    product_name,
    taskFile,
  }: InputGenerateImageBasedProductListing) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("product_name", product_name);
      if (taskFile) {
        formData.append("taskFile", taskFile);
      }

      const response = await fetch("/tasks/product-listing", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: OutputGenerateImageBasedProductListing =
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
