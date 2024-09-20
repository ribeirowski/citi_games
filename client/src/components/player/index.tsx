import { Crown2, Crown3, UserIcon } from 'assets'
import Image from 'next/image'
import React from 'react'
import { PlayerContainer, PlayerName } from './style'
import { UserType, MatchAtributes } from 'interfaces'

interface PlayerProps {
    player: UserType;
    Match: MatchAtributes;
}

const Player = ({player, Match}: PlayerProps) => {

  return (
    <PlayerContainer>
        <Image width={32} height={32} src={UserIcon.src} alt={UserIcon.alt} />
        <PlayerName>{player.username}</PlayerName>
        <Image style={ {display: player.id === Match.owner.id ? 'block': 'none'}} width={24} height={24} src={Crown3.src} alt={Crown3.alt} />
    </PlayerContainer>
  )
}

export default Player