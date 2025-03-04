"use client";

import { useState } from "react";
import { useAnalyzePrd } from "@/hooks/use-analyze-prd";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Output_prd_analysis } from "@/generated";

export function PrdAnalysisForm() {
  const { analyzePrd, isLoading, error } = useAnalyzePrd();
  const [result, setResult] = useState<Output_prd_analysis["response"] | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const prd = formData.get("prd") as string;

    if (!prd) return;

    const response = await analyzePrd({ prd });
    setResult(response.response);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {!result ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            name="prd"
            placeholder="Paste your PRD here..."
            className="min-h-[300px]"
            required
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Analyze PRD"}
          </Button>
        </form>
      ) : (
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Suggested Use Cases</h3>
            <div className="space-y-4">
              {result.use_cases.map((useCase: string, index: number) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-medium">{useCase}</h4>
                  <p className="text-sm text-muted-foreground">
                    {result.task_description[index]}
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">
                      Input: {result.input_type[index]}
                    </Badge>
                    <Badge variant="outline">
                      Output: {result.output_format[index]}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button variant="secondary" onClick={() => setResult(null)}>
            Analyze Another PRD
          </Button>
        </Card>
      )}

      {error && (
        <p className="text-destructive text-sm mt-2">Error: {error.message}</p>
      )}
    </div>
  );
}
