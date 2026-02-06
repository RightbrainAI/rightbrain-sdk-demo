"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { rb, taskIds } from "@/lib/rightbrain";
import useTask from "@/lib/use-task";

export function PrdAnalysisForm() {
  const analyzePrd = useTask(rb[taskIds.prdAnalysis].run);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const prd = formData.get("prd") as string;

    if (!prd) return;

    analyzePrd.runTask({ inputs: { prd } });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {!analyzePrd.data ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            name="prd"
            placeholder="Paste your PRD here..."
            required
            rows={10}
          />
          <Button type="submit" disabled={analyzePrd.isPending}>
            {analyzePrd.isPending ? "Analyzing..." : "Analyze PRD"}
          </Button>
        </form>
      ) : (
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Suggested Use Cases</h3>
            <div className="space-y-4">
              {analyzePrd.data.response.use_cases.map((useCase, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-medium">{useCase}</h4>
                  <p className="text-sm text-muted-foreground">
                    {analyzePrd.data.response.task_description[index]}
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">
                      Input: {analyzePrd.data.response.input_type[index]}
                    </Badge>
                    <Badge variant="outline">
                      Output: {analyzePrd.data.response.output_format[index]}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button variant="secondary" onClick={() => analyzePrd.reset()}>
            Analyze Another PRD
          </Button>
        </Card>
      )}

      {analyzePrd.error && (
        <p className="text-destructive text-sm mt-2">
          Error: {analyzePrd.error.message}
        </p>
      )}
    </div>
  );
}
