import { Country } from "@/types/country";
import { useForm, useWatch } from "react-hook-form";

const NGNForm = {
  accountNo: "",
  emailAddress: "",
  narration: "",
};

const CFAForm = {
  momoNumber: "",
  fullName: "",
  mobileMoneyOperator: "",
};

export default function useInputControl(country: Country) {
  const defaultValues = country === Country.NIGERIA ? NGNForm : CFAForm;

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
    defaultValue: defaultValues, // default value before the render
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
