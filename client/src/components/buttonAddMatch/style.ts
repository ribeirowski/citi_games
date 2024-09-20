import { Button } from "@mui/material";
import styled from "styled-components";


export const StyleButtonAddMatch = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 230px;
    height: 60px;
    gap: 10px;
    padding: 10px;
    border-radius: 8px;
    background-color: #51E678;
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.25);
    text-transform: none; 
    transition: none;

    &:hover {
        background-color: #51E678; 
    }

`

export const ButtonTextAddMatch = styled.span`
  
  font-weight: 700;
  font-family: 'Barlow';
  font-size: 24px;
  line-height: 28.8px;
  text-align: center;
  color: #FFFF;
`;
;
