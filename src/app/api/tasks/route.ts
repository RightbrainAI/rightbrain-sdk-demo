import { handleRunTaskRequest, TaskRunError } from "@rightbrain/sdk";

export async function POST(request: Request) {
  try {
    const result = await handleRunTaskRequest(
      {
        orgId: process.env.RB_ORG_ID!,
        projectId: process.env.RB_PROJECT_ID!,
        apiKey: process.env.RB_API_KEY!,
        baseUrl: process.env.RB_API_BASE_URL,
      },
      await request.formData(),
    );

    if (result instanceof File) {
      return new Response(result, {
        status: 200,
        headers: {
          "Content-Type": result.type,
          "Content-Disposition": `attachment; filename="${result.name}"`,
        },
      });
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (error instanceof TaskRunError) {
      return new Response(
        JSON.stringify({
          error: "An error occurred while running the task",
          detail: error.response,
        }),
        {
          status: error.status,
        },
      );
    }

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      }),
      { status: 500 },
    );
  }
}
