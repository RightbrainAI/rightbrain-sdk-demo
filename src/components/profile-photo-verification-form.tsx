"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { rb, taskIds } from "@/lib/rightbrain";
import useTask from "@/lib/use-task";
import { cn } from "@/lib/utils";
import { CheckCircle2, Upload, XCircle } from "lucide-react";
import { useRef, useState } from "react";

export function ProfilePhotoVerificationForm() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const verifyPhoto = useTask(rb[taskIds.profileImageVerification].run);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return;

    verifyPhoto.runTask({
      files: [image],
    });
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
          "relative size-40 sm:size-64 rounded-full overflow-hidden cursor-pointer",
          "ring-4 ring-indigo-500 ring-offset-2 ring-offset-background",
          "m-2", // Account for ring + offset that extends outside bounding box
          !previewUrl && "bg-muted flex items-center justify-center",
          "hover:ring-indigo-400 transition-all",
          !verifyPhoto.data && "hover:opacity-90",
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

        {verifyPhoto.isPending && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {verifyPhoto.data && (
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              "bg-background/80 backdrop-blur-sm",
            )}
          >
            {verifyPhoto.data.response.valid ? (
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            ) : (
              <XCircle className="w-16 h-16 text-destructive" />
            )}
          </div>
        )}
      </div>

      {image && !verifyPhoto.data && (
        <Button type="submit" disabled={verifyPhoto.isPending}>
          {verifyPhoto.isPending ? "Verifying..." : "Verify Photo"}
        </Button>
      )}

      {verifyPhoto.data && (
        <div className="flex flex-col items-center gap-4 text-center">
          <h3
            className={cn(
              "text-lg font-semibold",
              verifyPhoto.data.response.valid
                ? "text-green-500"
                : "text-destructive",
            )}
          >
            {verifyPhoto.data.response.valid
              ? "Photo Verified"
              : "Verification Failed"}
          </h3>
          <p className="text-muted-foreground">
            {verifyPhoto.data.response.reason}
          </p>
          <Button
            variant="secondary"
            onClick={() => {
              setImage(null);
              setPreviewUrl("");
              verifyPhoto.reset();
            }}
          >
            Upload Another Photo
          </Button>
        </div>
      )}

      {verifyPhoto.error && (
        <p className="text-destructive text-sm">
          Error: {verifyPhoto.error.message}
        </p>
      )}
    </form>
  );
}
