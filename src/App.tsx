import { useState } from "react";
import { ErrorMessage } from "./components/ErrorMessage";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ImagePreview } from "./components/ImagePreview";
import { ImageUploader } from "./components/ImageUploader";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { NutritionDisplay } from "./components/NutritionDisplay";
import { SuggestTab } from "./components/SuggestTab";
import { useImageAnalysis } from "./hooks/useImageAnalysis";

export default function App() {
  const [activeTab, setActiveTab] = useState<"analyze" | "suggest">("analyze");
  const { selectedImage, analysisResult, loading, error, analyzeFood } =
    useImageAnalysis();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Header />

          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("analyze")}
                  className={`${
                    activeTab === "analyze"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Analyze Food
                </button>
                <button
                  onClick={() => setActiveTab("suggest")}
                  className={`${
                    activeTab === "suggest"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Suggest Goals
                </button>
              </nav>
            </div>
          </div>

          {activeTab === "analyze" ? (
            <div className="space-y-8">
              <ImageUploader onImageSelect={analyzeFood} />

              {error && <ErrorMessage message={error} />}
              {loading && <LoadingSpinner />}

              {selectedImage && !loading && (
                <ImagePreview
                  imageUrl={selectedImage}
                  foodName={analysisResult?.foodName || ""}
                />
              )}

              {analysisResult && !loading && (
                <NutritionDisplay
                  nutrition={analysisResult.nutrition}
                  foodName={analysisResult.foodName}
                />
              )}
            </div>
          ) : (
            <SuggestTab />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
