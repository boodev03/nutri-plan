import { useForm } from "react-hook-form";
import { UserProfile } from "../types/user";
import { FormInput } from "./form/FormInput";
import { FormSelect } from "./form/FormSelect";

interface UserInfoFormProps {
  onSubmit: (data: Omit<UserProfile, "id" | "user_id">) => void;
  initialData?: Partial<UserProfile>;
  loading?: boolean;
}

export function UserInfoForm({
  onSubmit,
  initialData,
  loading,
}: UserInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<UserProfile, "id" | "user_id">>({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormInput
        label="Age"
        type="number"
        {...register("age", { required: "Age is required" })}
        error={errors.age?.message}
      />
      <FormInput
        label="Height (cm)"
        type="number"
        {...register("height", { required: "Height is required" })}
        error={errors.height?.message}
      />
      <FormInput
        label="Weight (kg)"
        type="number"
        {...register("weight", { required: "Weight is required" })}
        error={errors.weight?.message}
      />
      <FormSelect
        label="Goal"
        {...register("goal", { required: "Goal is required" })}
        error={errors.goal?.message}
        options={[
          { value: "lose_weight", label: "Lose Weight" },
          { value: "gain_weight", label: "Gain Weight" },
          { value: "maintain", label: "Maintain Weight" },
          { value: "build_muscle", label: "Build Muscle" },
        ]}
      />
      <FormSelect
        label="Activity Level"
        {...register("activity_level", {
          required: "Activity level is required",
        })}
        error={errors.activity_level?.message}
        options={[
          { value: "sedentary", label: "Sedentary" },
          { value: "light", label: "Lightly Active" },
          { value: "moderate", label: "Moderately Active" },
          { value: "very_active", label: "Very Active" },
          { value: "extra_active", label: "Extra Active" },
        ]}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
