import {
  Box,
  Button,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import React, { useEffect, useState } from "react";
import api, { Customers } from "../services/api";
import TopBar from "../components/TopBar";
import Image from "../assets/degradee.svg";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

interface Props {
  redirectPath?: string;
}

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
    position: "relative",
  },
  contact: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titles: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "15px",
    borderBottom: " 1px solid black",
  },
};

function MainApp({ redirectPath = "/login" }: Props) {
  const navigate = useNavigate();
  const { token, signOut } = useAuth();
  const [customers, setCustomers] = useState<Customers[]>([]);
  const teste = [
    {
      id: 1,
      name: "Carol",
      phone: "21995278647",
      email: "caroline.y.ldm@gmail.com",
    },
  ];

  const title = { name: " Nome", phone: "Telefone", email: "Email" };

  useEffect(() => {
    async function loadPage() {
      if (!token) return;

      //const { data: customersData } = await api.getCustomers(token);
      setCustomers(teste);
    }
    loadPage();
  }, [token]);

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  function testingButton() {
    console.log("oi");
  }

  return (
    <Box sx={styles.layout}>
      <Box>
        <TopBar />
      </Box>
      <Box sx={styles.container}>
        <Typography
          sx={{ position: "absolute", left: "25px", fontSize: "20px" }}
        >
          Contatos
        </Typography>
        <Button onClick={() => testingButton()}>
          <PersonAddIcon
            sx={{
              color: "white",
              backgroundColor: "#F436F1",
              padding: "4px",
              borderRadius: "5px",
              position: "absolute",
              right: "0px",
            }}
          />
        </Button>

        <Box sx={{ marginTop: "20px" }}>
          {customers.map((customer) => (
            <Box
              sx={{
                position: "relative",
                border: "2px solid #F436F1",
                padding: "5px",
                borderRadius: "5px",
                boxShadow:
                  " rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                  padding: "5px",
                  borderBottom: "1px solid black",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography fontWeight="bold">{customer.name}</Typography>
                  <Box sx={{ position: "absolute", right: "10px" }}>
                    <DeleteIcon />
                    <EditIcon />
                  </Box>
                </Box>
              </Box>
              <Box key={customer.id} sx={styles.contact}>
                <Typography fontWeight="bold">{customer.email}</Typography>
                <Typography fontWeight="bold">{customer.phone}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default MainApp;
