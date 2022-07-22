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
import EditIcon from "@mui/icons-material/Edit";
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

export default function UpdateContact({
  contactInfo,

  loadPage,
}: any) {
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [update, setUpdate] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    userId: userId,
    name: contactInfo.name,
    email: contactInfo.email,
    phone: contactInfo.phone,
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function closeDialog() {
    setUpdate(false);
  }

  async function updateContact() {
    setUpdate(true);
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
      await api.updateList(contactInfo._id, { userId, name, email, phone });
      setMessage({
        type: "success",
        text: "Contato atualizado com sucesso!",
      });
      setUpdate(false);
      loadPage();
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
      <EditIcon
        sx={{
          backgroundColor: "white",
          padding: "3px",
          borderRadius: "25px",
          position: "absolute",
          right: "0px",
        }}
        onClick={() => updateContact()}
      />
      <Form onSubmit={handleSubmit}>
        <Dialog
          open={update}
          TransitionComponent={Transition}
          keepMounted
          onClose={closeDialog}
          maxWidth="sm"
        >
          <DialogTitle sx={styles.title} variant="h4" component="h1">
            {"Atualizar contato"}
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
    </>
  );
}
