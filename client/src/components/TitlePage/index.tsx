import { Divider } from '@mui/material'
import { ArrowBack } from 'assets'
import Image from 'next/image'
import React from 'react'
import * as Styled from './style'

interface TitleObject {
    title: string,
    IsBack: boolean,
    onClick: () => void
}

export const TitlePage = ({title, IsBack, onClick}: TitleObject) => {
  return (
    <div style={{ width: '1034px' }}>
        <Styled.StyleContentTitlePage>
            <Image 
                width={24} 
                height={24} 
                src={ArrowBack.src} 
                alt={ArrowBack.alt}  
                style={{ display: IsBack ? 'block' : 'none' , cursor: 'pointer'}}
                onClick={onClick} />

                <p>{title}</p>
        </Styled.StyleContentTitlePage>

        <Divider sx={{ marginTop: '20px'}} />
    </div>

  )
}