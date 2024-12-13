import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function analyzeImageWithGemini(imageFile: File): Promise<{
  foodName: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    // Convert File to base64
    const base64Image = await fileToGenerativePart(imageFile);
    
    const prompt = `Analyze this food image and provide nutritional information in the following JSON format:
    {
      "foodName": "name of the food",
      "nutrition": {
        "calories": number,
        "protein": number in grams,
        "carbs": number in grams,
        "fat": number in grams
      }
    }
    Only respond with the JSON, no additional text.`;

    const result = await model.generateContent([prompt, base64Image]);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Error analyzing image with Gemini:', error);
    throw error;
  }
}

async function fileToGenerativePart(file: File): Promise<{
  inlineData: { data: string; mimeType: string };
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve({
        inlineData: {
          data: base64String,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}