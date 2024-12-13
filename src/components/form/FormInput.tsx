import React, { forwardRef } from 'react';
import { FormInputProps } from '../../types/form';

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, suffix, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            className={`form-input ${suffix ? 'pr-12' : ''} ${className}`}
            {...props}
          />
          {suffix && (
            <span className="absolute right-3 top-2.5 text-gray-400 text-sm font-medium">
              {suffix}
            </span>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-600 mt-1 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);