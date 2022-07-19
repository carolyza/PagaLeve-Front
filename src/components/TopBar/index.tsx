import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Logo } from "../../assets/logo";

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

export default function TopBar({ redirectPath = "/adicionar" }: Props) {
  const navigate = useNavigate();

  function createNew() {
    navigate("/adicionar");
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
        <Box sx={styles.options}>
          <Typography sx={{ fontSize: "15px" }}>LOGIN</Typography>
          <Typography sx={{ fontSize: "15px" }} onClick={createNew}>
            {" "}
            CADASTRO
          </Typography>
        </Box>
      </Box>
      <Box />
    </Box>
  );
}
