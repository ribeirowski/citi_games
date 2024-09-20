import React, { useState, useEffect } from 'react';
import * as Styled from './style';
import { ImgCardLogin } from 'assets';
import { Dialog, DialogContent, IconButton, Slide, Snackbar, TextField, ThemeProvider, createTheme } from '@mui/material';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import api from 'services/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CloseIcon from '@mui/icons-material/Close';
import { MatchAtributes, PropsEmail, UserType } from 'interfaces';
import { addPlayerInMatch } from './addPlayerinMatch';
import { pushInMatchPage } from './pushInMatchPage';
import { useRouter } from 'next/router';
import { set } from 'date-fns';
import Router from 'next/router';

const theme = createTheme({
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
              backgroundColor: 'rgba(88, 203, 251, 0.2)',
            },
          },
        },
      },
    },
  },
});

interface CardLoginProps {
  open: boolean;
  onClose: () => void;
  emailAtributes: PropsEmail;
  matchAtributes: MatchAtributes;
  idMatch: string;
  isAddMatch: boolean;
  setIsIn: (value: boolean) => void;
  setUserId: (value: string) => void;
}

const userSchema = z.object({
  username: z.string().min(1, { message: 'Nome é obrigatório' }),
  email: z.string().min(1, { message: 'Email é obrigatório' }).email({ message: 'Email inválido' }),
});

type UserSchema = z.infer<typeof userSchema>;

const TransitionUp = (props: any) => {
  return <Slide {...props} direction="up" timeout={{ enter: 300, exit: 300 }} />;
};

export const CardLogin = ({ open, onClose, emailAtributes, matchAtributes, idMatch, isAddMatch, setIsIn, setUserId }: CardLoginProps) => {
  const queryClient = useQueryClient();
  const [toastOpen, setToastOpen] =   useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('green');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

    /*########################### CRIAR USUÁRIO ########################################*/

  const createUser = async (user: UserSchema) => {
    const response = await api.post('/user', user);
    return response;
  };  
  
  const mutationCreateUser = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
  /*###################################################################*/
  
  /*########################## ATUALIZAR PARTIDA #########################################*/ 

  const UpdateMatch = async (match: MatchAtributes) => {
    const response = await api.patch(`/match/${idMatch}`, match);
    return response;
    }
    
  const mutationUpdateMatch = useMutation({
      mutationFn: UpdateMatch,
      onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['matches'] }); },
    })

  /*###################################################################*/
    
  /*############################ ENVIAR EMAIL #######################################*/

  const sendEmail = async (match: PropsEmail) => {
      const response = await api.post('/email', match);
      return response;
      };
      
  const mutationSendEmail = useMutation({
        mutationFn: sendEmail,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['emails'] }); },
      });

  /*###################################################################*/

    /*########################## ADICIONAR PLAYER NA PARTIDA #########################################*/
    const addPlayerMatch = async (idUser: string) => {
      const response = await api.patch(`/match/add/${idMatch}`, { playerId: idUser });
      return response;
    };

    const mutationAddPlayer = useMutation({
      mutationFn: addPlayerMatch,
      onSuccess: () => { 
        queryClient.invalidateQueries({ queryKey: ['addPlayers'] });
    },
    });

    /*############################## LISTA DE TODOS OS USUÁRIOS #####################################*/
    async function getAllUsers(): Promise<UserType[]> {
    try {
      const response = await api.get(`/user`);
      return response.data;
    } catch (error) {
      console.error("Error fetching match details:", error);
      throw new Error("Failed to fetch match details");
      }
      }
      
    const dataUsers = useQuery<UserType[]>({
      queryKey: ['users'],
      queryFn: getAllUsers,
    });

    /*###################################################################*/

      /*############################# DETALHES DO USUÁRIO ######################################*/
      const searchDetailsUser = async (username: string) => {
    try {
      const response = await api.get(`/user/${username}`);
      setUserId(response.data.id);
      return response.data;
    } catch (error) {
      console.error("Error fetching match details:", error);
      throw new Error("Failed to fetch match details");
    }
  };



    /*################################ SUBMIT DO FORM ###################################*/

  const onSubmit = async (data: UserSchema) => {
    const combinedData: PropsEmail = {
      ...emailAtributes,
      userName: data.username,
      userEmail: data.email,
    };

    const matchFull: MatchAtributes = {
      ...matchAtributes,
      isFull: true,
    }

    try {
    const userDetails = await searchDetailsUser(data.username);
    /*################################ VERIFICAÇÃO DE QUAL BOTÃO É CLICADO ###################################*/
    if (isAddMatch) {
      await pushInMatchPage({
        dataUsers: dataUsers.data || [],
        data,
        userDetails,
        mutationCreateUser,
        setToastMessage,
        setToastColor,
        setToastOpen,
      });

      Router.push(`/createMatch/${userDetails.id}`); 

      
    } else  {
      await addPlayerInMatch({
        dataUsers: dataUsers.data || [],
        data,
        matchAtributes,
        userDetails,
        mutationAddPlayer,
        mutationSendEmail,
        mutationUpdateMatch,
        mutationCreateUser,
        combinedData,
        matchFull,
        setToastMessage,
        setToastColor,
        setToastOpen,
        setIsIn,
        queryClient,
      })
    }


  } catch (error) {
    console.error("Error in onSubmit:", error);
  }

  reset();
};

      /*########################### FUNÇÃO DE FECHAR O TOAST // CONST QUE COLOCA ICONE NO TOAST ########################################*/
  const handleCloseToast = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setToastOpen(false);
  };
  
  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseToast}>
        <CloseIcon />
      </IconButton>
    </React.Fragment>
  );
    /*###################################################################*/

      /*############################### componente ####################################*/

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
          },
        }}
      >
        <DialogContent style={{ padding: 0 }}>
          <Styled.Card>
            <img src={ImgCardLogin.src} alt="Logo do Citi" />
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
                style={{
                  width: '320px',
                  height: '52px',
                }}
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
                placeholder='Escreva seu nome de usuário'
              />
              <TextField
                id="outlined-basic"
                label="e-mail"
                variant="outlined"
                style={{
                  width: '320px',
                  height: '52px',
                }}
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                placeholder='Escreva seu e-mail'
              />
              <Styled.StyledButtonCardLogin variant='contained' type="submit">
                <Styled.ButtonText>Entrar</Styled.ButtonText>
              </Styled.StyledButtonCardLogin>
              <Snackbar
                open={toastOpen}
                autoHideDuration={1700}
                onClose={handleCloseToast}
                message={toastMessage}
                action={action}
                ContentProps={{
                  style: {
                    backgroundColor: toastColor,
                  },
                }}
                TransitionComponent={TransitionUp}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              />
            </form>
          </Styled.Card>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};
