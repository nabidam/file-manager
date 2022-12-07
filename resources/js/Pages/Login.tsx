import React, { useState } from "react";
import Button from "../components/button/Button";
import Box from "../components/display/Box";
import Container from "../components/display/Container";
import TextInput from "../components/input/TextInput";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLogin = async () => {
    console.log({ credentials });
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
