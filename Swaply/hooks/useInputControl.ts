import { useForm, useWatch } from "react-hook-form";

export default function useInputControl(defaultValues: any) {
  const {
    control,
    handleSubmit,
    resetField,
    getValues,
    clearErrors,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      ...defaultValues,
    },
    reValidateMode: "onSubmit",
    mode: "onBlur",
  });
  const watching = useWatch<typeof defaultValues>({
    control,
    defaultValue: "default", // default value before the render
  });

  return {
    control,
    handleSubmit,
    resetField,
    getValues,
    clearErrors,
    watch,
    watching,
    isValid,
    errors,
  };
}
