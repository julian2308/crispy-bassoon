import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputText from "../InputText/InputText";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormEmailType, ValidationSchemaEmail } from "./login.type";
import ButtonForm from "./buttonForm";
import LoadingButton from "@mui/lab/LoadingButton";

export type formEmailProps = {
  form: number;
  setEmail: (email: string) => void;
  handleNext: (data: FormEmailType) => void;
};

const FormEmail: FC<formEmailProps> = ({ form, setEmail, handleNext }) => {
  const methods = useForm<FormEmailType>({
    resolver: yupResolver(ValidationSchemaEmail),
    mode: "all",

    defaultValues: {
      email: "",
    },
  });
  const { formState, handleSubmit } = methods;
  const { isSubmitting } = formState;

  const onSubmit = (data: FormEmailType) => {
    handleNext(data);
    setEmail(data.email);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography m={2} textAlign="center" fontWeight={700}>¡Hola! Ingresá tu e-mail</Typography>
          <FormProvider {...methods}>
            <InputText name="email" label="Correo electrónico*" />
            <Stack spacing={2} direction="column">
              <LoadingButton
                loading={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                sx={{ height: "39px", marginTop: "5px"}}>
                Continuar
              </LoadingButton>
              <ButtonForm form={form} />
            </Stack>
          </FormProvider>
        </form>
      </Box>
    </>
  );
};

export default FormEmail;
