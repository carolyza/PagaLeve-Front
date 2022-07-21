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
import Form from "../Form";
import useAlert from "../../hooks/useAlert";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

const styles = {
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
  userId: any;
  name: string;
  email: string;
  phone: string;
}

export default function CreateNew({ setCreateNew, loadPage }: any) {
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    userId: userId,
    name: "",
    email: "",
    phone: "",
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setCreateNew(false);
    loadPage();
    if (!formData?.name || !formData?.email || !formData?.phone) {
      setMessage({ type: "error", text: "Todos os campos são obrigatórios!" });
      return;
    }

    const { userId, name, email, phone } = formData;

    try {
      await api.createContact({ userId, name, email, phone });
      setMessage({
        type: "success",
        text: "Novo contato cadastrado com sucesso!",
      });
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
    <Form onSubmit={handleSubmit}>
      <Box sx={styles.container}>
        <Typography sx={styles.title} variant="h4" component="h1">
          Adicionar contato
        </Typography>

        <TextField
          name="name"
          sx={styles.input}
          label="Nome"
          type="name"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.name}
        />
        <TextField
          name="email"
          sx={styles.input}
          label="Email"
          onChange={handleInputChange}
          value={formData.email}
        />
        <TextField
          name="phone"
          sx={styles.input}
          label="Telefone"
          onChange={handleInputChange}
          value={formData.phone}
        />
        <Box sx={styles.actionsContainer}>
          <Link
            sx={{ textDecoration: "none" }}
            component={RouterLink}
            to="/login"
          >
            <Typography sx={{ color: "#F436F1" }}>CANCELAR</Typography>
          </Link>
          <Button
            sx={{ backgroundColor: "#F436F1" }}
            variant="contained"
            type="submit"
          >
            SALVAR
          </Button>
        </Box>
      </Box>
    </Form>
  );
}
