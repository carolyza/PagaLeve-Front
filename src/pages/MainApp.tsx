import {
  Box,
  Button,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import CreateContact from "../components/CreateContact";
import useAuth from "../hooks/useAuth";
import React, { useEffect, useState } from "react";
import api, { Customers } from "../services/api";
import TopBar from "../components/TopBar";
import Image from "../assets/degradee.svg";

import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Create } from "@mui/icons-material";
import UpdateContact from "../components/UpdateContact";

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
  const { token, userId } = useAuth();
  const [customers, setCustomers] = useState<any | null>([]);
  const [createNew, setCreateNew] = useState<boolean>(false);

  async function loadPage() {
    if (!token) return;

    const { data: customersData } = await api.getCustomers(token, userId);

    setCustomers(customersData);
  }

  useEffect(() => {
    loadPage();
  }, [createNew]);

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  function openCreate() {
    setCreateNew(true);
  }

  async function deleteContact(id: number) {
    console.log(id);
    const removed = await api.deleteContact(userId, id);
    if (removed) {
      if (!token) return;

      const { data: customersData } = await api.getCustomers(token, userId);
      setCustomers(customersData);
    }
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
        {!createNew ? (
          <Button onClick={() => openCreate()}>
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
        ) : (
          <CreateContact
            createNew={createNew}
            setCreateNew={setCreateNew}
            loadPage={loadPage}
          />
        )}

        <Box sx={{ marginTop: "20px" }}>
          {customers?.map((c: any) => (
            <Box
              key={c._id}
              sx={{
                position: "relative",
                border: "2px solid #F436F1",
                padding: "5px",
                borderRadius: "5px",
                marginBottom: "10px",
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
                  <Typography fontWeight="bold">{c.name}</Typography>
                  <Box sx={{ position: "absolute", right: "10px" }}>
                    <DeleteIcon onClick={() => deleteContact(c._id)} />
                    <UpdateContact loadPage={loadPage} contactInfo={c} />
                  </Box>
                </Box>
              </Box>
              <Box sx={styles.contact}>
                <Typography fontWeight="bold">{c.email}</Typography>
                <Typography fontWeight="bold">{c.phone}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default MainApp;
