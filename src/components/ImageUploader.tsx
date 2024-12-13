import React, { useRef, useState } from 'react';
import { isValidImageType, validateImageSize } from '../utils/imageUtils';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

export function ImageUploader({ onImageSelect }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    if (!isValidImageType(file)) {
      alert('Please upload an image file (PNG, JPG, or JPEG)');
      return;
    }

    if (!validateImageSize(file)) {
      alert('Image size should be less than 5MB');
      return;
    }

    onImageSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className={`relative rounded-lg transition-all duration-300 ${
          dragActive 
            ? 'border-2 border-blue-500 bg-blue-50' 
            : 'border-2 border-dashed border-gray-300 bg-gray-50'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <label className="flex flex-col items-center justify-center h-64 cursor-pointer group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
            <div className={`mb-3 transition-transform duration-300 ${dragActive ? 'scale-110' : 'group-hover:scale-110'}`}>
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG or JPEG (max. 5MB)</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </label>
        
        {dragActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-blue-500 bg-opacity-10 pointer-events-none">
            <div className="text-lg font-medium text-blue-600">Drop your image here</div>
          </div>
        )}
      </div>
    </div>
  );
}