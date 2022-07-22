import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
} from "@mui/material";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Form from "../Form";
import useAlert from "../../hooks/useAlert";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  title: { marginBottom: "30px" },
  dividerContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "16px",
    marginBottom: "26px",
  },
  input: { margin: "16px" },
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

export default function CreateNew({ createNew, setCreateNew, loadPage }: any) {
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

  function closeDialog() {
    setCreateNew(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

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
      loadPage();
      setCreateNew(false);
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
      <Dialog
        open={createNew}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDialog}
        maxWidth="sm"
      >
        <DialogTitle sx={styles.title} variant="h4" component="h1">
          Adicionar contato
        </DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Box sx={styles.actionsContainer}>
            <Button onClick={() => closeDialog()} sx={{ color: "#F436F1" }}>
              CANCELAR
            </Button>

            <Button
              sx={{ backgroundColor: "#F436F1" }}
              variant="contained"
              type="submit"
              onClick={handleSubmit}
            >
              SALVAR
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Form>
  );
}
