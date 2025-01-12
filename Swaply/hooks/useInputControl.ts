import { useForm } from "react-hook-form";

export default function useInputControl(defaultValues: {}) {
  const {
    control,
    handleSubmit,
    resetField,
    getValues,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      ...defaultValues,
    },
  });

  return {
    control,
    handleSubmit,
    resetField,
    getValues,
    clearErrors,
    isValid,
    errors,
  };
}
