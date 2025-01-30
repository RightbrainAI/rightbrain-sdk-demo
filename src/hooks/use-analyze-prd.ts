import { useState } from "react";
import { InputPrdAnalysis, OutputPrdAnalysis } from "@/generated";

export function useAnalyzePrd() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const analyzePrd = async ({ prd }: InputPrdAnalysis) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("prd", prd);

      const response = await fetch("/tasks/prd-analysis", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: OutputPrdAnalysis = await response.json();
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
    analyzePrd,
    isLoading,
    error,
  };
}
