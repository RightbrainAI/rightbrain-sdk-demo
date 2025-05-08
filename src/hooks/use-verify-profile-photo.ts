import { useState } from "react";
import { type OutputProfileImageVerification } from "@/generated";

export function useVerifyProfilePhoto() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const verifyPhoto = async ({ file }: { file: File }) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("taskFile", file);

      const response = await fetch("/tasks/profile-verification", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: OutputProfileImageVerification = await response.json();
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
    verifyPhoto,
    isLoading,
    error,
  };
}
