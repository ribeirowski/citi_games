import { useQuery } from '@tanstack/react-query'
import { ActionButton, ModalLogin, Template } from 'components'
import { MatchAtributes } from 'interfaces'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import api from 'services/api'
import { DivInformation, MatchContainer, MatchContent, MatchDescription, MatchInformationTitle, MatchLink, MatchtParagraph } from './style'
import { CircularProgress, List } from '@mui/material'
import ListPlayers from 'components/listPlayers'

function dateTimeParser(date: string, time: string) {
  const subStringDate = date.substring(0, 10);
  const subStringTime = time.substring(11, 16);
  const parsedDate = subStringDate.split("-").reverse().join("/")
  const parsedTime = subStringTime.replace(":", "h")
  return [parsedDate, parsedTime]
}

/*###################################################################*/

const Match = () => {
  const router = useRouter()
  const { id } = router.query as { id: string };
  const [ isIn, setIsIn] = useState(false)

  /*############################### BUSCANDO OS DADOS DA PARTIDA ####################################*/

  async function getDetailsMatch(): Promise<MatchAtributes> {
    try {
      const response = await api.get(`/match/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching match details:", error);
      throw new Error("Failed to fetch match details");
    }
  }

  const { data, isLoading } = useQuery<MatchAtributes>({
    queryKey: ['match', id], // Chave de cache para esta query
    queryFn: getDetailsMatch, // Função que será executada para buscar os dados
    enabled: !!id, // Só executa a query se o id estiver presente
  });

  if (isLoading) {
    return (
      <Template title="Voltar" IsBack={true} onClickTitle={() => router.back()}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <CircularProgress />
        </div>
      </Template>
    )
  }

  /*###################################################################*/

  const [formattedDate, formattedTime] = dateTimeParser(data?.date || '', data?.time || '')

  return (
    <Template title="Voltar" IsBack={true} onClickTitle={() => router.back()}>
      <MatchContainer>
        <MatchContent>
          <DivInformation>
            <p style={{
              fontFamily: "Barlow",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "15px",
              color: "rgba(104, 0, 228, 1)"
            }}>Partidas</p>
            <p style={{
              fontFamily: "Barlow",
              fontSize: "28px",
              fontWeight: 600,
              lineHeight: "36px",
              color: "rgba(0, 0, 0, 1)"
            }}>{data?.name}</p>
            <p>{formattedDate} | {formattedTime}</p>
            <p>{data?.platform}</p>
          </DivInformation>

          <div>
            <MatchtParagraph>Descrição:</MatchtParagraph>
            <MatchDescription>
              <p>{data?.description}</p>
            </MatchDescription>
          </div>

          <div>
            <MatchtParagraph>Link:</MatchtParagraph>
            <MatchLink>
              <p>{data?.link}</p>
            </MatchLink>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ModalLogin idMatch={id} setIsIn={setIsIn} isIn={isIn} isAddMatch={false} />
          </div>

        </MatchContent>
        <ListPlayers  data={data!} isIn={isIn}/>  
      </MatchContainer>
    </Template>
  )
}

export default Match;
