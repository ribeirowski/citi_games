import * as React from 'react'
import { CITiwhite , GameController , UserCircle, WhiteHeart } from 'assets'
import Image from 'next/image'
import { Buttons, CustomButton, Sideb, LastText } from './style'
import { useRouter } from 'next/router'


export default function Sidebar() {
    const router = useRouter();

    return (
        <Sideb>
            <Image src={CITiwhite.src} alt="Logo do CITi branca" width={111.75} height={59.52}
            style={{marginTop:"51px",marginLeft:"84px",marginRight:"84px"}} />
            <Buttons>
                <CustomButton variant="contained" onClick={() => router.push('/')}>
                    <Image src={GameController.src} alt="Controle de Videogame" width={32} height={32}/>
                    <p>Explorar partidas</p>
                </CustomButton>
                <CustomButton variant="contained" onClick={() => router.push('/profile')}>
                    <Image src={UserCircle.src} alt="Icone de perfil" width={32} height={32}/>
                    <p style={{textAlign: "start"}}>Perfil</p>
                </CustomButton>
            </Buttons>
            <LastText>
                <p>made with</p>
                <Image src={WhiteHeart.src} alt="Coração branco" width={20} height={20}/>
                <p>and &lt;/&gt; by</p>
                <Image src={CITiwhite.src} alt="Logo do CITi branca" width={41} height={21.84}/>
            </LastText>
        </Sideb>
    )
}
