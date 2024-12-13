import { AnalysisError } from '../types/analysis';

export function handleAnalysisError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred while analyzing the image.';
}

export function handleGeminiError(error: unknown): AnalysisError {
  console.error('Gemini API error:', error);
  return {
    message: 'Failed to analyze image with AI. Please try again.',
    code: 'GEMINI_ERROR'
  };
}