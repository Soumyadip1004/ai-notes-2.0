type GeminiContent = {
  role: string;
  parts: {
    text: string;
  }[];
}[];

export async function callGemini(contents: GeminiContent) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      },
    );

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    return reply;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
  }
}
