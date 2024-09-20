import React from 'react';
import * as Styled from './style';
import { IconAddMatch } from 'assets';
import Image from 'next/image';

interface ButtonAddMatchProps {
  onClick: () => void;
}

const ButtonAddMatch = ({onClick}: ButtonAddMatchProps) => {
  return (
    <div onClick={onClick}>
        <Styled.StyleButtonAddMatch variant='contained'>
            <Image width={28} height={28} src={IconAddMatch.src} alt="Icon de adicionar partida"/>
            <Styled.ButtonTextAddMatch>Nova Partida</Styled.ButtonTextAddMatch>
        </Styled.StyleButtonAddMatch>
    </div>
  )
}

export default ButtonAddMatch