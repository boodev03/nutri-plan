import { forwardRef } from "react";
import { FormInputProps } from "../../types/form";

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            className={`
              block w-full h-10 px-3 py-2 rounded-md border border-gray-300 
              bg-white text-gray-900 placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
              sm:text-sm transition-colors
              [appearance:textfield]
              [&::-webkit-outer-spin-button]:appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none
              ${className}
            `}
            {...props}
          />
          {props.type === "number" && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <div className="text-gray-400">{props.suffix}</div>
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-600 mt-1 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);
