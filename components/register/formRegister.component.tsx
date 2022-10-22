import { Box, Button, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import InputText from "../InputText/InputText";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormRegisterType, ValidationSchemaRegister } from "./regiterSchema";
import { userService } from "grupo-04/services/User/user.service";
import { useRouter } from "next/router";
import { log } from "console";

const FormRegister = () => {
  const methods = useForm<FormRegisterType>({
    resolver: yupResolver(ValidationSchemaRegister),
    mode: "all",
    defaultValues: {
      dni: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      passwordVerification: "",
      phone: "",
    },
  });
  const { handleSubmit } = methods;
  const router = useRouter();

  const onSubmit = async (data: FormRegisterType) => {
    const response = await userService.register(data);

    console.log(response.response.status);

    if (response.response.status === 200) {
      router.push("/registro-exitoso", undefined, { shallow: true });
    } else if (response.response.status === 409) {
      console.log(response);
    } else if (response.response.status === 500) {
      console.log(response);
    } else {
      console.log(response);
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography m={5} textAlign="center" variant="h5" fontWeight={700}>
            Crear cuenta
          </Typography>
          <FormProvider {...methods}>
            <Box
              display="grid"
              gridTemplateColumns={{ sm: "repeat(2, 1fr)" }}
              columnGap={3}
              rowGap={1}
              width={{ xs: 300, sm: 580, md: 750 }}>
              <InputText name="firstname" label="Nombre*" />
              <InputText name="lastname" label="Apellido*" />
              <InputText name="dni" label="DNI*" />
              <InputText name="email" label="Correo electrónico*" />
              <InputText type="password" name="password" label="Contraseña*" />
              <InputText
                type="password"
                name="passwordVerification"
                label="Confirmar contraseña*"
              />
              <InputText name="phone" label="Télefono*" />
              <Button
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                sx={{ height: "56px", marginTop: "5px" }}>
                Crear cuenta
              </Button>
            </Box>
          </FormProvider>
        </form>
      </Box>
    </>
  );
};

export default FormRegister;
