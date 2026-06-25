import { SYSTEM_PROMPT, buildUserPrompt } from "./prompts";
import type { RecommendResponse } from "@/types/cocktail";

export async function getRecommendations(
  mood: string,
  scene: string,
  inventory?: string[]
): Promise<RecommendResponse> {
  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: buildUserPrompt(mood, scene, inventory),
        },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;

  if (!content) {
    throw new Error("No content in DeepSeek response");
  }

  // Clean the response - remove markdown code blocks if present
  const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

  return JSON.parse(cleaned);
}