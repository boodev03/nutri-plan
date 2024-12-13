import React from 'react';
import { useForm } from 'react-hook-form';
import { UserInfo, ActivityLevel, Goal } from '../types/user';
import { FormInput } from './form/FormInput';
import { FormSelect } from './form/FormSelect';
import { FormSubmitButton } from './form/FormSubmitButton';

interface UserInfoFormProps {
  onSubmit: (data: UserInfo) => void;
}

export function UserInfoForm({ onSubmit }: UserInfoFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserInfo>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
      <div className="space-y-6">
        {/* Personal Details Section */}
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Personal Details</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <FormInput
              label="Age"
              type="number"
              placeholder="Years"
              suffix="years"
              {...register('age', { 
                required: 'Required',
                min: { value: 15, message: 'Min age is 15' },
                max: { value: 120, message: 'Max age is 120' }
              })}
              error={errors.age?.message}
            />

            <FormInput
              label="Weight"
              type="number"
              step="0.1"
              placeholder="Weight"
              suffix="kg"
              {...register('weight', {
                required: 'Required',
                min: { value: 30, message: 'Min 30kg' },
                max: { value: 300, message: 'Max 300kg' }
              })}
              error={errors.weight?.message}
            />
          </div>

          <div className="mt-6">
            <FormInput
              label="Height"
              type="number"
              placeholder="Height"
              suffix="cm"
              {...register('height', {
                required: 'Required',
                min: { value: 100, message: 'Min 100cm' },
                max: { value: 250, message: 'Max 250cm' }
              })}
              error={errors.height?.message}
            />
          </div>
        </div>

        {/* Activity & Goals Section */}
        <div className="pt-6">
          <div className="flex items-center space-x-2 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Activity & Goals</h3>
          </div>

          <div className="space-y-6">
            <FormSelect
              label="Activity Level"
              {...register('activityLevel', { required: 'Required' })}
              error={errors.activityLevel?.message}
              options={[
                { value: ActivityLevel.SEDENTARY, label: 'Sedentary (little or no exercise)' },
                { value: ActivityLevel.LIGHT, label: 'Light (1-3 times/week)' },
                { value: ActivityLevel.MODERATE, label: 'Moderate (3-5 times/week)' },
                { value: ActivityLevel.VERY_ACTIVE, label: 'Very Active (6-7 times/week)' },
                { value: ActivityLevel.EXTRA_ACTIVE, label: 'Extra Active (2x per day)' }
              ]}
            />

            <FormSelect
              label="Your Goal"
              {...register('goal', { required: 'Required' })}
              error={errors.goal?.message}
              options={[
                { value: Goal.LOSE_WEIGHT, label: 'Lose Weight' },
                { value: Goal.MAINTAIN, label: 'Maintain Weight' },
                { value: Goal.GAIN_WEIGHT, label: 'Gain Weight' }
              ]}
            />
          </div>
        </div>
      </div>

      <FormSubmitButton isSubmitting={isSubmitting} />
    </form>
  );
}