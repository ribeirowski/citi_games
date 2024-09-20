import { MatchAtributes, UserType, PropsEmail } from "interfaces";

interface pushInMatchPageProps {
  dataUsers: UserType[];
  data: {
    username: string;
    email: string;
  };
  userDetails: UserType;
  mutationCreateUser: any;
  setToastMessage: any;
  setToastColor: any;
  setToastOpen: any;
}

export async function pushInMatchPage(props: pushInMatchPageProps) {
  const {
    dataUsers,
    data,
    userDetails,
    mutationCreateUser,
    setToastMessage,
    setToastColor,
    setToastOpen,
  } = props;

  // verifica se o usuário está no banco de dados
  if (dataUsers && dataUsers.find(player => player.username === data.username)) {

  } else {
    mutationCreateUser.mutate(data, {
      onSuccess: () => {
        setToastMessage('Usuário registrado!');
        setToastColor('green');
        setToastOpen(true);
      },
    });
  }
}
