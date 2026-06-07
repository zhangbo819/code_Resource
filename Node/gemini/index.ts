import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({
  apiKey: process.argv[2],
});

async function main() {
  const responseStream = await ai.models.generateContentStream({
    model: "gemini-3.5-flash",
    contents: "Explain how AI works in detail",
  });

  for await (const chunk of responseStream) {
    chunk.text && process.stdout.write(chunk.text);
  }
}

main();
