import styled from "styled-components";
import Button from "@mui/material/Button";

export const StyledButton = styled(Button)`
    width: 320px;
    height: 48px;
    border-radius: 8px;
    border: 1px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);

    text-decoration: none;
    text-transform: none;
    font-family:'Barlow';
    font-weight: 700;
    font-size: 20px;
    color: #F5F5F5;

    &:disabled {
        color: #F5F5F5;
    }
`;