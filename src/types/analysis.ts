export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface AnalysisResult {
  foodName: string;
  nutrition: NutritionInfo;
  confidence: number;
}

export interface AnalysisError {
  message: string;
  code?: string;
}