import React from 'react'
import { MatchPlayersContainer, MatchPlayersContent, MatchPlayersCount, MatchPlayersInformation, MatchPlayersTitle } from './style'
import { Match } from 'date-fns';
import { MatchAtributes } from 'interfaces';
import Player from 'components/player';

interface ListPlayersProps {
    data: MatchAtributes;
    isIn: boolean;
}

/*###################################################################*/
const colors = {
    open: "#D2EFFE",
    closed: "#D5C6FA",
    ended: "#DEDEDE",
    in: '#D0F4E4'
  }

function getStatusColor(isFull: boolean, isActive:boolean, isIn:boolean ): string {
  
    if (isFull && !isIn) {
        return colors.closed;
    } else if (!isActive) {
        return colors.ended;
    } else if (!isIn && !isFull){
      return colors.open
    } else {
        return colors.in;
    }
}

/*###################################################################*/

const ListPlayers = ({data, isIn}: ListPlayersProps) => {
    const backgroundColor = getStatusColor(data?.isFull, data?.isActive, isIn);
  return (
    <MatchPlayersContainer>
          <MatchPlayersInformation>
            <MatchPlayersTitle>Participantes</MatchPlayersTitle>
            <MatchPlayersCount>{data?.players?.length ?? 0}/{data?.maxPlayers}</MatchPlayersCount>
          </MatchPlayersInformation>

          <MatchPlayersContent style={{backgroundColor}}>
            <div style={{padding: '16px 0px 0px 24px'}}>
                {data?.players?.map(player => (
                  <Player key={player.id}  player={player!} Match={data!} />
                ))}
            </div>
          </MatchPlayersContent>
    </MatchPlayersContainer>
  )
}

export default ListPlayers