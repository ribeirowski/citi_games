import { useQueryClient } from "@tanstack/react-query";
import { MatchAtributes, UserType, PropsEmail } from "interfaces";

interface addPlayerinMatchProps {
  dataUsers: UserType[];
  data: {
    username: string;
    email: string;
  };
  matchAtributes: MatchAtributes;
  userDetails: UserType;
  mutationAddPlayer: any;
  mutationSendEmail: any;
  mutationUpdateMatch: any;
  mutationCreateUser: any;
  combinedData: PropsEmail;
  matchFull: MatchAtributes;
  setToastMessage: any;
  setToastColor: any;
  setToastOpen: any;
  setIsIn: any;
  queryClient: any;
}



export async function addPlayerInMatch(props: addPlayerinMatchProps) {
  const {
    dataUsers,
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
    queryClient
  } = props;


  if (dataUsers && dataUsers.find(player => player.username === data.username)) {

    if (matchAtributes.players && matchAtributes.players.find(player => player.username === data.username)) {
      setToastMessage('Usuário já está na partida!');
      setToastColor('green');
      setToastOpen(true);
      setIsIn(true);

    } else {

      if (matchAtributes.players.length + 1 === matchAtributes.maxPlayers) {
        mutationAddPlayer.mutate(userDetails.id, {
          onSuccess: () => {
            mutationSendEmail.mutate(combinedData);

            queryClient.setQueryData(['match', matchAtributes.id], (match: MatchAtributes) => {
              return {
                ...match,
                players: [...match.players, userDetails],
              };
            })

            setToastMessage('Usuário registrado na partida!');
            setToastColor('green');
            setToastOpen(true);
          },
        });
        setIsIn(true);
        mutationUpdateMatch.mutate(matchFull);

      } else if (matchAtributes.players.length < matchAtributes.maxPlayers) {
        mutationAddPlayer.mutate(userDetails.id, {
          onSuccess: () => {
            mutationSendEmail.mutate(combinedData);

            queryClient.setQueryData(['match', matchAtributes.id], (match: MatchAtributes) => {
              return {
                ...match,
                players: [...match.players, userDetails],
              };
            })
            setToastMessage('Usuário registrado na partida!');
            setToastColor('green');
            setToastOpen(true);
          },
        });
        setIsIn(true);

      } else {
        setToastMessage('Partida lotada! Usuário não pode entrar');
        setToastColor('red');
        setToastOpen(true);
      }
    }
  } else {
    mutationCreateUser.mutate(data, {
      onSuccess: (response: { data: { values: { id: any; }; }; }) => {

        if (matchAtributes.players.length + 1 === matchAtributes.maxPlayers) {
          mutationAddPlayer.mutate(response.data.values.id, {
            onSuccess: () => {
              mutationSendEmail.mutate(combinedData);


              queryClient.setQueryData(['match', matchAtributes.id], (match: MatchAtributes) => {
              return {
                ...match,
                players: [...match.players, response.data.values],
              };
            })
              setToastMessage('Usuário registrado na partida!');
              setToastColor('green');
              setToastOpen(true);
            },
          });
          setIsIn(true);
          mutationUpdateMatch.mutate(matchFull);
          
        } else if (matchAtributes.players.length < matchAtributes.maxPlayers) {
          mutationAddPlayer.mutate(response.data.values.id, {
            onSuccess: () => {
              mutationSendEmail.mutate(combinedData);



              queryClient.setQueryData(['match', matchAtributes.id], (match: MatchAtributes) => {
                return {
                  ...match,
                  players: [...match.players, response.data.values],
                };
              })
              setToastMessage('Usuário registrado na partida!');
              setToastColor('green');
              setToastOpen(true);
            },
          });
          setIsIn(true);

        } else {
          setToastMessage('Partida lotada! Usuário não pode entrar');
          setToastColor('red');
          setToastOpen(true);
          return false
        }
      },
    });
  }
}
