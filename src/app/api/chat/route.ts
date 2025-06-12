/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  StreamingTextResponse,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const runtime = "edge";

export async function POST(req: Request) {
  const {
    messages,
    temperature,
    max_tokens,
    top_p,
    frequency_penalty,
    presence_penalty,
  } = await req.json();

  const generationConfig = {
    temperature: temperature,
    topP: top_p,
    topK: 64,
    maxOutputTokens: max_tokens,
    responseMimeType: "text/plain",
  };

  try {
    const chatSession = model.startChat({
      generationConfig,
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          content: messages.join("\n"),
        },
      ],
    });

    const stream = await chatSession.sendMessage("", {
      stream: true,
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process the input" }),
      { status: 500 }
    );
  }
}