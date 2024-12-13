import { useState, useCallback } from 'react';
import { analyzeImage } from '../services/gemini/imageAnalysis';
import { AnalysisResult } from '../types/analysis';
import { createImageUrl, revokeImageUrl } from '../utils/imageUtils';
import { handleAnalysisError } from '../utils/errorHandlers';

export function useImageAnalysis() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeFood = useCallback(async (file: File) => {
    try {
      setLoading(true);
      setError(null);
      setAnalysisResult(null);
      
      if (selectedImage) {
        revokeImageUrl(selectedImage);
      }
      
      const imageUrl = createImageUrl(file);
      setSelectedImage(imageUrl);

      const result = await analyzeImage(file);
      setAnalysisResult(result);
    } catch (err) {
      const errorMessage = handleAnalysisError(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [selectedImage]);

  return {
    selectedImage,
    analysisResult,
    loading,
    error,
    analyzeFood
  };
}