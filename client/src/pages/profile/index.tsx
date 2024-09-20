import { Template, ButtonAddMatch, ModalLogin } from "components";
import { FirstContainer, TabContainer, UsernameDiv, UsernameInputDiv, tabStyling, usernameTheme } from "./style";
import { Button, Divider, Tab, Tabs, TextField, ThemeProvider, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserType } from "interfaces";
import { z } from "zod";
import React from "react";
import api from "services/api";
import renderContent from "./functions";
import 'dayjs/locale/pt-br';


/*----------------------Validação de Formulário----------------------*/


const userSchema = z.object({
  username: z.string().min(1, {message: "Usuário é obrigatório"})
})

type UserSchema = z.infer<typeof userSchema>


/*###################################################################*/


export default function PageProfile() { //Função principal


  /*------------------Setando algumas constantes-----------------------*/
  
  const [tabValue, setTabValue] = React.useState('Partidas');
  const [currentPageOpen, setCurrentPageOpen] = React.useState(1);
  const [currentPageClosed, setCurrentPageClosed] = React.useState(1);
  const [currentPageEnded, setCurrentPageEnded] = React.useState(1);

  
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setTabValue(newValue);
  };

  const handlePageChangeOpen = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPageOpen(value);
  };

  const handlePageChangeClosed = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPageClosed(value);
  };

  const handlePageChangeEnded = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPageEnded(value);
  };

  const { register: registerUser, handleSubmit: handleSubmitUser, formState: { errors: userErrors } } = useForm<UserSchema>({
    resolver: zodResolver(userSchema)
  });
  
  const [userData, setUserData] = React.useState<UserType>({
    id: "",
    username: "",
    email: "",
    matches: [],
    isOwner: []
  });
  

  /*---------------------Funções que usam a API---------------------*/


  async function getUser(data: UserSchema) {
    try {
      const response = await api.get(`/user/${data.username}`)
      setUserData(response.data)
    } 
    catch (error) {
        console.log(error)
    }
  }


 /*###################################################################*/


  return (

    <Template
      onClickTitle={() => {console.log("Oi")}}
      title="Perfil"
      IsBack={false}>


  {/*----------------------Input e Criar Partida------------------------*/}


      <FirstContainer>
        <UsernameDiv>
          <Typography variant="h1" fontFamily={"Barlow"}>Qual o Username?</Typography>
            <form onSubmit={handleSubmitUser(getUser)}>
              <UsernameInputDiv>
                <ThemeProvider theme={usernameTheme}>
                <TextField
                  id="outlined-basic"
                  label="username"
                  variant="outlined"
                  style={{
                    width: '320px',
                    height: '50px',
                  }}
                  {...registerUser("username")}
                  helperText={userErrors.username?.message}
                />
                </ThemeProvider>
                <Button id="search-button" variant="contained" type="submit">Buscar</Button>
              </UsernameInputDiv>
            </form>
        </UsernameDiv>
        <ModalLogin  setIsIn={() => console.log()} isIn={false} idMatch="" isAddMatch={true}/>
      </FirstContainer>


  {/*-------------------------------Tab-------------------------------*/}


      <TabContainer>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          TabIndicatorProps={{
            sx: {
              backgroundColor: "#F5F5F5",
              color: 'black'
            }
          }}>
          <Tab
            value="Partidas"
            label="Partidas"
            sx={{...tabStyling, 
                marginLeft: '50px',
                marginRight: '20px',
                backgroundColor: "#E2F4EC"}}
          />
          <Tab
            value="Histórico"
            label="Histórico"
            sx={tabStyling}
          />
        </Tabs>
        <Divider sx={{marginTop: '-1.1px'}}/>
      </TabContainer>
      
      {/* Chamando a função que renderiza o conteúdo das Tabs */}

      {renderContent(userData, tabValue,
        currentPageOpen, currentPageClosed, currentPageEnded,
        handlePageChangeOpen, handlePageChangeClosed, handlePageChangeEnded )} 

      {/*#############################################################*/}

    </Template>
  );
};