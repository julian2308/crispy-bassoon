import { Alert, Box, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputText from "../InputText/InputText";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormPasswordType, ValidationSchemaPassword } from "./login.type";
import { authService } from "grupo-04/services/auth.service.";
import { useRouter } from "next/router";
import LoadingButton from "@mui/lab/LoadingButton";

export type formPasswordProps = {
  form: number;
  email: string;
};

const FormPassword: FC<formPasswordProps> = ({ form, email }) => {
  const methods = useForm<FormPasswordType>({
    resolver: yupResolver(ValidationSchemaPassword),
    mode: "all",

    defaultValues: {
      password: "",
    },
  });
  const { formState, handleSubmit } = methods;
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const { isSubmitting } = formState;

  const onSubmit = async (password: FormPasswordType) => {
    setError("");

    const data = {
      email: email,
      password: password.password,
    };

    const user = JSON.stringify(data);

    const response = await authService.login(user);
    if (response.status === 200) {
      router.push("/", undefined, { shallow: true });
    } else if (response.status === 401) {
      setError("Credenciales incorrectas");
    } else {
      setError("Ha ocurrido un error, vuelva a intentarlo.");
    }
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
          <Typography m={2} textAlign="center" fontWeight={700}>
            Ingresá tu contraseña
          </Typography>
          <FormProvider {...methods}>
            <InputText type="password" name="password" label="Contraseña*" />
            <Stack spacing={2} direction="column">
              <LoadingButton
                loading={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                sx={{ height: "39px", marginTop: "5px" }}>
                Continuar
              </LoadingButton>
            </Stack>
          </FormProvider>
          {error !== "" && (
            <Alert
              severity="error"
              sx={{
                marginTop: "30px",
              }}>
              {error}
            </Alert>
          )}
        </form>
      </Box>
    </>
  );
};

export default FormPassword;
