import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function generateConvictionSentence(
  archetypeName: string,
  topDimensions: string[],
  car: {
    make: string;
    model: string;
    variant: string;
    tagline: string;
    summary: string;
  },
  specHighlights: string,
): Promise<string> {
  if (!genAI) {
    throw new Error("GEMINI_API_KEY is missing.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `You are a car recommendation expert writing for a personality-matched car platform.

Driver archetype: "${archetypeName}"
Top personality dimensions: ${topDimensions.join(", ")}
Car: ${car.make} ${car.model} ${car.variant}
Key specs: ${specHighlights}

Write a single punchy 1-2 sentence conviction reason why this specific car is perfect for this specific driver. Reference 1-2 actual specs. Be confident. No hedging. Max 40 words.`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}
