export const IMAGE_CONSTRAINTS = {
  MAX_SIZE_MB: 5,
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/jpg']
} as const;

export const NUTRITION_CONSTRAINTS = {
  MAX_CALORIES: 10000,
  MAX_MACRONUTRIENT_GRAMS: 1000,
  MIN_CONFIDENCE: 0.5
} as const;