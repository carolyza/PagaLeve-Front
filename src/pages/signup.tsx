import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import Form from "../components/Form";
import PasswordInput from "../components/PasswordInput";
import useAlert from "../hooks/useAlert";
import api from "../services/api";

import Image from "../assets/degradee.svg";

const styles = {
  layout: {
    backgroundImage: `url(${Image})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100vw",
    height: "100vh",
    position: "fixed",
    left: "0px",
    opacity: "0.8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    // marginTop: "180px",
    width: "90%",
    minHeight: "30vh",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    backgroundColor: "rgba(255,255,255)",
    zIndex: "9999",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
  },
  title: { marginBottom: "30px" },
  dividerContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "16px",
    marginBottom: "26px",
  },
  input: { marginBottom: "16px" },
  actionsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

interface FormData {
  email: string;
  password: string;
  passwordConfirmation: string;
}

function SignUp() {
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (
      !formData?.email ||
      !formData?.password ||
      !formData?.passwordConfirmation
    ) {
      setMessage({ type: "error", text: "Todos os campos são obrigatórios!" });
      return;
    }

    const { email, password, passwordConfirmation } = formData;

    if (password !== passwordConfirmation) {
      setMessage({ type: "error", text: "As senhas devem ser iguais!" });
      return;
    }

    try {
      await api.signUp({ email, password });
      setMessage({ type: "success", text: "Cadastro efetuado com sucesso!" });
      navigate("/login");
    } catch (error: Error | AxiosError | any) {
      if (error.response) {
        setMessage({
          type: "error",
          text: error.response.data,
        });
        return;
      }
      setMessage({
        type: "error",
        text: "Erro, tente novamente em alguns segundos!",
      });
    }
  }

  return (
    <>
      <TopBar />
      <Box sx={styles.layout}>
        <Form onSubmit={handleSubmit}>
          <Box sx={styles.container}>
            <Typography sx={styles.title} variant="h4" component="h1">
              Cadastro
            </Typography>

            <TextField
              name="email"
              sx={styles.input}
              label="Email"
              type="email"
              variant="outlined"
              onChange={handleInputChange}
              value={formData.email}
            />
            <PasswordInput
              name="password"
              sx={styles.input}
              label="Senha"
              onChange={handleInputChange}
              value={formData.password}
            />
            <PasswordInput
              name="passwordConfirmation"
              sx={styles.input}
              label="Confirme sua senha"
              onChange={handleInputChange}
              value={formData.passwordConfirmation}
            />
            <Box sx={styles.actionsContainer}>
              <Link
                sx={{ textDecoration: "none" }}
                component={RouterLink}
                to="/login"
              >
                <Typography sx={{ color: "#F436F1" }}>
                  Já possuo cadastro
                </Typography>
              </Link>
              <Button
                sx={{ backgroundColor: "#F436F1" }}
                variant="contained"
                type="submit"
              >
                Cadastrar
              </Button>
            </Box>
          </Box>
        </Form>
      </Box>
    </>
  );
}

export default SignUp;
