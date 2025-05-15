import { AIOverview } from "@/types/aiOverview"; // assuming these types exist

export async function fetchAIOverview(query: string): Promise<AIOverview> {
  const response = await fetch("/api/ai-overview", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch AI overview data");
  }

  return response.json();
} 