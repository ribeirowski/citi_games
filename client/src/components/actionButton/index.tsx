import React from "react";
import { StyledButton } from "./style";

/* Receives parameters text, onclick function and disabled boolean */

interface ActionProps {
    text: string;
    onClick: () => void;
    isDisabled?: boolean;
}

const colors = {
    green: "#51E678",
    red: "#EA394A",
    grey: "#DEDEDE"
}

function getButtonColor(text: string, isDisabled?: boolean) {
    
    if (isDisabled) {
        return colors.grey;
    }

    switch(text) {
        case 'Sair':
            return colors.red;
        default:
            return colors.green
    }
}

export const ActionButton: React.FC<ActionProps> = ({
    text,
    onClick,
    isDisabled,
    }) => {
    
    return (
        <StyledButton
         variant="contained" 
         style={{ backgroundColor: `${getButtonColor(text, isDisabled)}`,
                  border: '1px solid',
                  borderColor: `${getButtonColor(text, isDisabled)}` }}
         onClick={onClick}
         disabled={isDisabled}>
            {text}
        </StyledButton>
    );
};