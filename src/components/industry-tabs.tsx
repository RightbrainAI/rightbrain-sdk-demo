"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductListingForm } from "./product-listing-form";
import { ProfilePhotoVerificationForm } from "./profile-photo-verification-form";
import { PrdAnalysisForm } from "./prd-analysis-form";

const industries = [
  {
    id: "fintech",
    label: "Fintech",
    description: "Financial technology solutions powered by AI",
  },
  {
    id: "marketplace",
    label: "Marketplace",
    description: "E-commerce and marketplace automation",
  },
  {
    id: "product",
    label: "Product",
    description: "Product requirement analysis and task generation",
  },
];

export function IndustryTabs() {
  return (
    <Tabs defaultValue="fintech" className="w-full max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-3">
        {industries.map((industry) => (
          <TabsTrigger key={industry.id} value={industry.id}>
            {industry.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="fintech" className="space-y-4 mt-4">
        <div className="flex flex-col items-center pb-4">
          <h3 className="text-lg font-medium">Fintech</h3>
          <p className="text-sm text-muted-foreground">
            Profile photo verification. Upload your profile photo and see if it
            matches the requirements.
          </p>
        </div>
        <ProfilePhotoVerificationForm />
      </TabsContent>
      <TabsContent value="marketplace" className="space-y-4 mt-4">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-medium">Marketplace</h3>
          <p className="text-sm text-muted-foreground">
            E-commerce and marketplace automation. Fill out the form and see
            your product listing in seconds.
          </p>
        </div>

        <ProductListingForm />
      </TabsContent>
      <TabsContent value="product" className="space-y-4 mt-4">
        <div className="flex flex-col items-center pb-4">
          <h3 className="text-lg font-medium">Product Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Analyze your PRD and get suggestions for AI task automation using
            Rightbrain.
          </p>
        </div>
        <PrdAnalysisForm />
      </TabsContent>
    </Tabs>
  );
}
