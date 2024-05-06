import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
};
function PHFrom({ children, onSubmit }: TFormProps) {
  const methods = useForm();
  const { handleSubmit } = methods;
  const handleOnSubmit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>{children}</form>
    </FormProvider>
  );
}

export default PHFrom;
