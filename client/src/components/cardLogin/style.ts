import { Button } from "@mui/material";
import styled from "styled-components";


export const Card = styled.div`
        background-color : #F5F5F5 ;
        width: 448px;
        height: 501.1px;
        top: 1342px;
        left: 552px;
        border-radius: 16px;
        padding: 64px;
        gap: 32px;
        display: flex;
        flex-direction: column;

        form {
          gap: 32px;
          display: flex;
          flex-direction: column;
        }

        img {
            width: 316px;
            height: 125.1px;
        }
`

// Estilize o botão Material-UI
export const StyledButtonCardLogin = styled(Button)`
  background-color: #51e678 !important;
  width: 320px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid #51e678;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  text-transform: none; 
`;

// Estilize o texto dentro do botão
export const ButtonText = styled.span`
  font-family: 'Barlow', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #fff; 
`;


