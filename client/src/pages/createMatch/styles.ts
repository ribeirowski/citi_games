import { createTheme, Button } from "@mui/material";
import styled from "styled-components";

export const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

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

export const addTheme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            color: '#BBDEFB',
            borderRadius: '8px',
            backgroundColor: '#FFFFFF',
            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
              WebkitAppearance: 'none',
              margin: 0,
            },
            '& input[type=number]': {
              MozAppearance: 'textfield',
            },
            '& .MuiOutlinedInput-root' : {
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
    },
  });

export const inputTheme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            // backgroundColor: '#FFFFFF',
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
                    borderRadius: '8px'
                    },
                },
            },
        },
    },
})

export const datePickerTheme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
          color: '#BBDEFB',
          borderRadius: '8px',
          backgroundColor: '#FFFFFF',
          '& .MuiOutlinedInput-root' : {
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

export const bigInputTheme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    minHeight: '275px',
                    height: '300px',
                    color: '#BBDEFB',
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    '& .MuiOutlinedInput-root' : {
                        height: '300px',
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
                }
            }
        }
    }
});


export const Fonts = styled.div`
    p {
        font-family: Barlow;
        font-size: 16px;
        font-weight: 500;
        line-height: 19.2px;
        text-align: left;
        color: #000000;
    }
    h1 {
        font-family: Barlow;
        font-size: 28px;
        font-weight: 600;
        line-height: 36px;
        text-align: left;
        color: #000000;
    }
    h2 {
        font-family: Barlow;
        font-size: 24px;
        font-weight: 400;
        line-height: 36px;
        text-align: left;
        color: #000000;
    }
`