import { Box, Button, Typography } from "@mui/material";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import CreateContact from "../components/CreateContact";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import api from "../services/api";
import TopBar from "../components/TopBar";
import Image from "../assets/degradee.svg";

import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

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
    minHeight: "100vh",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",

    opacity: "0.7",
    display: "flex",

    paddingTop: "100px",
  },
  container: {
    marginTop: "50px",
    width: "90%",

    minHeight: "30vh",

    marginBottom: "40px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    backgroundColor: "white",

    padding: "20px",
    borderRadius: "8px",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
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
  },
};

function MainApp({ redirectPath = "/login" }: Props) {
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
    const removed = await api.deleteContact(id);
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

                backgroundColor: "#E896BFF1",
                padding: "5px",
                borderRadius: "5px",
                marginBottom: "10px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "15px",
                  padding: "5px",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography
                    fontSize="25px"
                    fontWeight="bold"
                    background-color="white"
                  >
                    {c.name}
                  </Typography>
                  <Box sx={{ position: "absolute", right: "10px" }}>
                    <DeleteIcon
                      sx={{
                        backgroundColor: "white",
                        padding: "3px",
                        borderRadius: "25px",
                        position: "absolute",
                        right: "40px",
                      }}
                      onClick={() => deleteContact(c._id)}
                    />
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
