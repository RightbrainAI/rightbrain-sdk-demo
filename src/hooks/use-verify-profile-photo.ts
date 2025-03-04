import { useState } from "react";
import {
  type Input_profile_image_verification,
  type Output_profile_image_verification,
} from "@/generated";

export function useVerifyProfilePhoto() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const verifyPhoto = async ({
    taskFile,
  }: Input_profile_image_verification) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      if (taskFile) {
        formData.append("taskFile", taskFile);
      }

      const response = await fetch("/tasks/profile-verification", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Output_profile_image_verification = await response.json();
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
