import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Logo } from "../../assets/logo";
import useAuth from "../../hooks/useAuth";

interface Props {
  redirectPath?: string;
}

const styles = {
  top: {
    padding: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: " 0px 4px 4px 0px #00000040",
  },
  options: {
    display: "flex",
    gap: "20px",
    flexDirection: "row",
    marginRight: "15px",
  },
};

export default function TopBar() {
  const navigate = useNavigate();
  const { token, signOut } = useAuth();

  function login() {
    navigate("/login");
  }

  function signUp() {
    navigate("/");
  }

  function handleSignOut() {
    navigate("/login");
    signOut();
    console.log(token);
  }

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        top: "0px",
        left: "0px",
        right: "0px",
        backgroundColor: "white",
        zIndex: "999999",
      }}
    >
      <Box sx={styles.top}>
        <Logo height="10px" width="15px" />

        {!token ? (
          <Box sx={styles.options}>
            <Typography sx={{ fontSize: "15px" }} onClick={() => login()}>
              LOGIN
            </Typography>
            <Typography sx={{ fontSize: "15px" }} onClick={() => signUp()}>
              {" "}
              CADASTRO
            </Typography>
          </Box>
        ) : (
          <Box sx={styles.options}>
            <Typography sx={{ fontSize: "15px" }} onClick={() => signOut()}>
              {" "}
              LOGOUT
            </Typography>
          </Box>
        )}
      </Box>
      <Box />
    </Box>
  );
}
