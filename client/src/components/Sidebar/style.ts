import styled from "styled-components";
import "../../styles/theme";
import { Button } from "@mui/material";

export const Sideb = styled.div`
  background: ${(props) => props.theme.colors.blue2};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 0px;
  top: 0;
  height: 100vh;
  border-radius: 0px 20px 20px 0px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 35px;
  gap: 5px;
`;

export const CustomButton = styled(Button)(({ theme }) => ({
  color: theme.colors.white,
  background: theme.colors.gray3,
  borderRadius: "8px",
  width: "232px",
  height: "45px",
  display: "flex",
  justifyContent: "start",
  marginTop: "10px",
  gap: "8px",
  fontFamily: "Barlow",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
  textAlign: "center",
  textTransform: "none",
  '&:hover': {
    backgroundColor: "#F5F5F599",
    color: theme.colors.white,
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
}));

export const LastText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 31px;
  margin-right: 31px;
  margin-top: auto;
  margin-bottom: 22.5px;
  gap: 4px;
  width: 219px;
  height: 24px;
  p {
    font-size: 16px;
    color: ${(props) => props.theme.colors.white};
    font-family: Barlow;
    font-size: 16px;
    font-weight: 400;
    line-height: 19.2px;
    text-align: center;
  }
`;