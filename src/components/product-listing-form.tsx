"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { rb, taskIds } from "@/lib/rightbrain";
import useTask from "@/lib/use-task";
import { useState } from "react";

export function ProductListingForm() {
  const [image, setImage] = useState<File | null>(null);
  const generateListing = useTask(
    rb[taskIds.generateImageBasedProductListing].run,
  );

  return (
    <>
      {generateListing.data?.response ? (
        <ProductCardView
          product={{
            name: generateListing.data?.response?.product_title ?? "",
            description:
              generateListing.data?.response?.product_description ?? "",
            image: image ? URL.createObjectURL(image) : "",
            categories:
              generateListing.data?.response?.product_categories ?? [],
          }}
          clearData={() => generateListing.reset()}
        />
      ) : (
        <form
          className="flex flex-col gap-4 w-full max-w-md px-2 mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);

            const product_name = formData.get("product_name");
            const taskFile = formData.get("taskFile") as File;

            if (!product_name || !taskFile) {
              return;
            }

            generateListing.runTask({
              inputs: { product_name: product_name.toString() },
              files: [taskFile],
            });
            setImage(taskFile);
          }}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="product_name">Product Name</Label>
            <Input
              type="text"
              id="product_name"
              name="product_name"
              required
              placeholder="Enter product name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="image">Product Image</Label>
            <Input
              type="file"
              id="image"
              name="taskFile"
              required
              accept="image/*"
            />
          </div>

          <Button type="submit" disabled={generateListing.isPending}>
            {generateListing.isPending
              ? "Generating..."
              : "Generate Product Listing"}
          </Button>

          {generateListing.error && (
            <p>Error: {generateListing.error.message}</p>
          )}
        </form>
      )}
    </>
  );
}

interface ProductCardViewProps {
  product: {
    name: string;
    description: string;
    image: string;
    categories: string[];
  };
  clearData: () => void;
}

function ProductCardView({ product, clearData }: ProductCardViewProps) {
  const locale =
    typeof window !== "undefined" ? window.navigator.language : "en-US";
  return (
    <Card className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8 relative p-2">
      <div className="sm:col-span-4 lg:col-span-5 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={product.name}
          src={product.image}
          className="aspect-square w-full rounded-lg object-cover"
        />
      </div>
      <div className="sm:col-span-8 lg:col-span-7">
        <h2 className="text-2xl sm:pr-12 text-primary">{product.name}</h2>

        <section aria-labelledby="information-heading" className="mt-3">
          <h3 id="information-heading" className="sr-only">
            Product information
          </h3>

          <div className="flex items-center gap-2">
            <p className="text-2xl text-muted line-through">
              {(120).toLocaleString(locale, {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <p className="text-2xl ">
              {(80).toLocaleString(locale, {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <Badge variant="destructive" className="uppercase bg-red-500 ">
              Sale
            </Badge>
          </div>

          <div className="mt-6">
            <h4 className="sr-only">Description</h4>

            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>
        </section>

        <section aria-labelledby="options-heading" className="mt-6">
          <h3 id="options-heading" className="sr-only">
            Product details
          </h3>

          <form>
            {/* Colors */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Categories
              </h4>

              <div className="flex flex-wrap items-center gap-2 mt-2">
                {product.categories.map((category) => (
                  <Badge key={category} variant={"secondary"}>
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <Button type="button">Add to bag</Button>
              <Button variant="secondary" onClick={() => clearData()}>
                Back to Form
              </Button>
            </div>
          </form>
        </section>
      </div>
    </Card>
  );
}
