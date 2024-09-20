import { createTheme } from "@mui/material";
import { PickersLayout } from "@mui/x-date-pickers";
import styled from "styled-components";

export const TabContainer = styled.div`
`;

export const FirstContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 80px;
`;

export const UsernameDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    h1 {
        margin-top: 15px;
        margin-bottom: 16px;
        color: #000000;
        font-weight: 500;
        font-size: 28px;
        line-height: 38px;
    }
`;

export const UsernameInputDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    #search-button {
        width: 100px;
        height: 40px;
        background-color: #58CBFB;
        border: 1px;
        border-radius: 8px;
        margin-left: 10px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
        font-weight: 700;
        text-transform: none;
        font-size: 16px;
    }
`;

export const SecondContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 30px;
`;

export const ContentDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    h1 {
        color: #000000;
        font-weight: 500;
        font-size: 32px;
    }

    h5 {
        color: #000000;
        font-weight: 400;
        font-size: 24px;
    }
`;

export const usernameTheme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#D9D9D9',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: '8px',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#58CBFB',
                backgroundColor: 'rgba(88, 203, 251, 0.2)'
              },
            },
            '& .MuiOutlinedInput-input': {
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
            },
          },
        },
      },
    },
  });

export const tabStyling = {
    marginTop: '16px',
    minHeight: '37px',
    borderRadius: '8px 8px 0px 0px',
    border: '1px solid #D1CFCF',
    backgroundColor: '#F0F0F0',
    textDecoration: 'none',
    textTransform: 'none',
    fontWeight: '400',
    fontFamily: 'Barlow',
    fontSize: '16px',
    width: '136px',
    height: '37px',
    color: 'black',
    padding: 0,
    '&.Mui-selected': {
      color: 'black',
    },
    '&:focus': {
      color: 'black',
    },
};

export const DatePickerContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;
`;

export const StyledPickersLayout = styled(PickersLayout)({
  '.MuiDateCalendar-root': {
    borderRadius: '8px',
    borderWidth: '1px',
    borderColor: '#2196f3',
  }
})

export const datePickerTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
        width: "164px",
        height: "52px",
        color: '#BBDEFB',
        borderRadius: '8px',
        backgroundColor: '#FFFFFF',
        '& .MuiOutlinedInput-root' : {
          height: "52px",
          '& fieldset': {
            borderColor: '#D9D9D9',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: '8px',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#58CBFB',
            backgroundColor: 'rgba(88, 203, 251, 0.2)'
          },
          },
      },
    },
  },
}});