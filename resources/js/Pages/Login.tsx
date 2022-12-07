import React, { useState } from "react";
import Button from "../components/button/Button";
import Box from "../components/display/Box";
import Container from "../components/display/Container";
import TextInput from "../components/input/TextInput";
import { useSnackbar } from "react-simple-snackbar";
import { errorSnackbar, successSnackbar } from "../helpers/snackbarVariants";
import axios from "axios";

const Login = () => {
  const [openSuccess] = useSnackbar(successSnackbar);
  const [openError] = useSnackbar(errorSnackbar);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLogin = async () => {
    console.log({ credentials });
    if (credentials.email.length < 3 || credentials.password.length < 3) {
      openError("Please enter your credentials");
      return false;
    }

    try {
      const res = await axios.post("/login", credentials);
      console.log({ data: res.status });
      if (res.data.msg === "ok") {
        openSuccess("Logged in Successfully!");
        window.location.href = "/files";
      }
    } catch (error) {
      console.error(error);
      openError("Wrong Credentials!");
    }
  };

  return (
    <Container>
      <Box title="Login">
        <TextInput
          value={credentials.email}
          onChange={handleFormChange}
          name="email"
          placeholder="Email"
        />
        <TextInput
          type="password"
          value={credentials.password}
          onChange={handleFormChange}
          name="password"
          placeholder="Password"
        />
        <Button text="Login" onClick={handleLogin} type="error" />
      </Box>
    </Container>
  );
};

export default Login;
