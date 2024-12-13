export function parseGeminiResponse(text: string): unknown {
  try {
    // Clean the response text by removing markdown code blocks
    const cleanedText = text.replace(/```json\s*|\s*```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error('Error parsing Gemini response:', text);
    throw new Error('Invalid response format from AI');
  }
}