  import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
  import { ActionButton } from 'components/actionButton'
  import ButtonAddMatch from 'components/buttonAddMatch'
  import { CardLogin } from 'components/cardLogin'
  import { MatchAtributes, PropsEmail } from 'interfaces'
  import { Router, useRouter } from 'next/router'
  import React, { useState } from 'react'
  import api from 'services/api'
  interface ModalLoginProps {
    idMatch: string,
    isAddMatch: boolean,
    setIsIn: (value: boolean) => void,
    isIn: boolean
  }

  /*###################################################################*/

  function dateTimeParser(date: string, time: string) {

    const subStringDate = date.substring(0, 10);
    const subStringTime = time.substring(11, 16);

    const parsedDate = subStringDate.split("-").reverse().join("/")
    const parsedTime = subStringTime.replace(":", "h")

    return [parsedDate, parsedTime]

  }

  /*###################################################################*/

  /*###################################################################*/

  function getStatusButton(isFull: boolean, isActive:boolean ): boolean {

    if (isFull) {
        return false;
    } else if (!isActive) {
        return true;
    } else {
        return false;
    }
  }

  /*###################################################################*/

  export const ModalLogin = ({ idMatch, isAddMatch, isIn, setIsIn }: ModalLoginProps) => {
      const [isOpen, setIsOpen] = useState(false)
      const router = useRouter()
      const queryClient = useQueryClient();
      const [userId , setUserId] = useState('')

      const handleClickOpen = () => {
          setIsOpen(true)
      }

      const handleClickClose = () => {
          setIsOpen(false)
      }

      /*################################## PEGAR OS DETALHES DO USUÁRIO #################################*/

      async function getDetailsMatch(): Promise<MatchAtributes> {
        try {
          const response = await api.get(`/match/${idMatch}`);
          return response.data;
        } catch (error) {
          console.error("Error fetching match details:", error);
          throw new Error("Failed to fetch match details");
        }
      }

      const { data } = useQuery<MatchAtributes>({
        queryKey: ['match', idMatch], // Chave de cache para esta query
        queryFn: getDetailsMatch // Função que será executada para buscar os dados
    });

      /*###################################################################*/

      /*################################## REMOVER USUÁRIO DA LISTA #################################*/

      const RemoveUserOfMatch = async (playerId: string) => {
        const response = await api.patch(`/match/remove/${idMatch}`, { playerId });
        return response;
      };
      
      
      const mutationRemoveUserOfMatch = useMutation({
        mutationFn: RemoveUserOfMatch,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['matches'] });
        },
      });

      const handleRemoveUser = async () => {
        mutationRemoveUserOfMatch.mutate(userId);
        router.back()
      }

      /*###################################################################*/
      
      /*###################################################################*/
      const [formattedDate, formattedTime] = dateTimeParser(data?.date || '', data?.time || '')

      const EmailAtributes: PropsEmail = {
        userName: '',
        userEmail: '' , 
        nameMatch: data?.name || '',
        date: formattedDate,
        time: formattedTime,
        platform: data?.platform || '',
        linkMatch: data?.link || '',
        subjectText: 'BebeaGames - Convite para partida',
      };

      /*###################################################################*/

      const isDisabled = getStatusButton(data?.isFull! ,data?.isActive!);

    return (
      <div>
  {isAddMatch ? (
    <ButtonAddMatch onClick={handleClickOpen} />
  ) : (
    isIn ? (
      <ActionButton text='Sair' isDisabled={false} onClick={handleRemoveUser} />
    ) : (
      <ActionButton text='Entrar' isDisabled={isDisabled} onClick={handleClickOpen} />
    )
  )}     <CardLogin setUserId={setUserId} setIsIn={setIsIn} open={isOpen} onClose={handleClickClose} emailAtributes={EmailAtributes} matchAtributes={data!} idMatch={idMatch} isAddMatch={isAddMatch}/>
      </div>
    )
  }
