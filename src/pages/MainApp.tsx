import {
  Box,
  Button,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import SignOutIcon from "../assets/signout.svg";
import useAuth from "../hooks/useAuth";
import React, { useEffect, useState } from "react";
import api, { Customers } from "../services/api";
import TopBar from "../components/TopBar";

interface Props {
  redirectPath?: string;
}

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

  function handleSignOut() {
    navigate("/login");
    signOut();
  }

  function testingButton() {
    console.log("oi");
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "50px",
        }}
      >
        <TopBar />
        {/* <SignOutIcon style={{ cursor: "pointer" }} onClick={handleSignOut} /> */}
      </Box>
      <Box>
        <Button onClick={() => testingButton()}>Adicionar Contato</Button>
      </Box>
      <Box>
        {customers.map((customer) => (
          <Box key={customer.id}>
            <Typography fontWeight="bold">{customer.name}</Typography>
            <Typography fontWeight="bold">{customer.email}</Typography>
            <Typography fontWeight="bold">{customer.phone}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default MainApp;
