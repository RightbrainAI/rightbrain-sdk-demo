"use client";

import { useState, useRef } from "react";
import { useVerifyProfilePhoto } from "@/hooks/use-verify-profile-photo";
import { type OutputProfileImageVerification } from "@/generated";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Upload } from "lucide-react";

export function ProfilePhotoVerificationForm() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const { verifyPhoto, isLoading, error } = useVerifyProfilePhoto();
  const [result, setResult] = useState<
    OutputProfileImageVerification["response"] | null
  >(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return;

    const response = await verifyPhoto({
      taskFile: image,
    });

    setResult(response.response);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-6 w-full"
    >
      <Input
        type="file"
        id="image"
        name="taskFile"
        required
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        className="hidden"
      />

      <div
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative w-40 h-40 sm:w-64 sm:h-64 rounded-full overflow-hidden cursor-pointer",
          "ring-4 ring-indigo-500 ring-offset-2 ring-offset-background",
          !previewUrl && "bg-muted flex items-center justify-center",
          "hover:ring-indigo-400 transition-all",
          !result && "hover:opacity-90"
        )}
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt="Profile preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Upload className="w-12 h-12" />
            <span className="text-sm">Click to upload</span>
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {result && (
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              "bg-background/80 backdrop-blur-sm"
            )}
          >
            {result.valid ? (
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            ) : (
              <XCircle className="w-16 h-16 text-destructive" />
            )}
          </div>
        )}
      </div>

      {image && !result && (
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify Photo"}
        </Button>
      )}

      {result && (
        <div className="flex flex-col items-center gap-4 text-center">
          <h3
            className={cn(
              "text-lg font-semibold",
              result.valid ? "text-green-500" : "text-destructive"
            )}
          >
            {result.valid ? "Photo Verified" : "Verification Failed"}
          </h3>
          <p className="text-muted-foreground">{result.reason}</p>
          <Button
            variant="secondary"
            onClick={() => {
              setImage(null);
              setPreviewUrl("");
              setResult(null);
            }}
          >
            Upload Another Photo
          </Button>
        </div>
      )}

      {error && (
        <p className="text-destructive text-sm">Error: {error.message}</p>
      )}
    </form>
  );
}
