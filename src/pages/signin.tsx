import {
  Box,
  Button,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import PasswordInput from "../components/PasswordInput";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import api from "../services/api";
import TopBar from "../components/TopBar";
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
}

function SignIn() {
  const { signIn } = useAuth();
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!formData?.email || !formData?.password) {
      setMessage({ type: "error", text: "Todos os campos são obrigatórios!" });
      return;
    }

    const { email, password } = formData;

    try {
      const {
        data: { token },
      } = await api.signIn({ email, password });

      const { data } = await api.getUserId(token, email);

      const loginData: any = { token, data };

      signIn(loginData);
      navigate("/app");
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
    <Box sx={styles.layout}>
      <TopBar />
      <Form onSubmit={handleSubmit}>
        <Box sx={styles.container}>
          <Typography sx={styles.title} variant="h4" component="h1">
            Login
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
          <Box sx={styles.actionsContainer}>
            <Link sx={{ textDecoration: "none" }} component={RouterLink} to="/">
              <Typography sx={{ color: "#F436F1" }}>
                Não possuo cadastro
              </Typography>
            </Link>
            <Button
              sx={{ backgroundColor: "#F436F1" }}
              variant="contained"
              type="submit"
            >
              Entrar
            </Button>
          </Box>
        </Box>
      </Form>
    </Box>
  );
}

export default SignIn;
