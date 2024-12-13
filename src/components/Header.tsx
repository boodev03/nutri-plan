import React from 'react';

export function Header() {
  return (
    <div className="text-center mb-12 animate-fade-in">
      <div className="relative inline-block">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          AI Nutrition Analyzer
          <span className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></span>
        </h1>
      </div>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Harness the power of AI to analyze your food and get personalized nutrition recommendations
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Instant Analysis
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          AI-Powered
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Personalized
        </div>
      </div>
    </div>
  );
}