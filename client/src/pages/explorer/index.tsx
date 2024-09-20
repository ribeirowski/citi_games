import * as React from 'react';
import { Template, ActionCard, ModalLogin } from 'components';
import { Grid, Pagination } from '@mui/material';
import api from 'services/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format, addDays, addHours } from 'date-fns';
import { Router, useRouter } from 'next/router';
import { MatchAtributes } from 'interfaces';
import { hourInvalid, isActual } from './date';

export default function ExploreMatches() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = React.useState(1);
    const queryClient = useQueryClient();

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    async function getMatches(): Promise<MatchAtributes[]> {
        const response = await api.get('/match');
        return response.data;
    }

    const { data, refetch } = useQuery<MatchAtributes[]>({
        queryKey: ['matches'],
        queryFn: getMatches
    });

    
    async function checkAndUpdateIsFullStatus(match: MatchAtributes) {
        try {
            // Obtém os dados da partida específica pela API
            const playersResponse = await api.get(`/match/${match.id}`);
            const numPlayers = playersResponse.data.players.length;

            // Verifica se o número de jogadores é menor que o máximo e se o isFull está como true
            if (numPlayers < match.maxPlayers && match.isFull) {
                const updatedMatch = { ...match, isFull: false };

                // Atualiza o atributo isFull da partida na API
                await api.patch(`/match/${match.id}`, updatedMatch);

                // Atualiza o cache do queryClient para refletir a mudança localmente
                queryClient.setQueryData(['matches'], (oldData: MatchAtributes[]) => {
                    if (!oldData) return oldData;

                    // Procura e atualiza a partida específica no cache
                    return oldData.map((m) =>
                        m.id === match.id ? { ...m, isFull: false } : m
                    );
                });
            }
        } catch (error) {
            console.error("Erro ao atualizar status da partida:", error);
        }
    }

    async function checkAndUpdateIsActiveStatus(match: MatchAtributes) {
        const actualDate = new Date();
        const validDate = isActual(new Date(match.date),actualDate);
        let InvalidHour = false;
        if (validDate == 1) {
            InvalidHour = hourInvalid(new Date(match.time),actualDate);
        }
        if ((validDate == 0 || InvalidHour) && match.isActive) {
            const updatedMatch = { ...match, isActive: false };
            await api.patch(`/match/${match.id}`, updatedMatch);
        }
    }
    

    React.useEffect(() => {
        const updateMatchesStatus = async () => {
            if (data && Array.isArray(data)) {
                data.forEach(async (match) => {
                    await checkAndUpdateIsFullStatus(match);
                    await checkAndUpdateIsActiveStatus(match);
                });
                refetch();
            }
        };

        updateMatchesStatus();
    }, [data, refetch]);

    const statusColor = (match: MatchAtributes) => {
        if (!match.isActive) {
            return 'ended'
        } else if (match.isFull) {
            return 'closed'
        } else {
            return 'open'
        }
    }

    const activeMatches = data?.filter((match) => match.isActive === true );
    activeMatches?.sort((a, b) => {
        let aBigger = isActual(new Date(a.date),new Date(b.date));

        if (aBigger != 1) {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        else {
            return new Date(a.time).getTime() - new Date(b.time).getTime();
        }
    });

    const numPages = activeMatches?.length ? Math.ceil(activeMatches.length/20) : 1;

    const dataSlice = activeMatches?.slice(20*(currentPage-1),20*(currentPage-1)+20);

    return (
        <Template 
        title="Explorar partidas"
        IsBack={false}
        onClickTitle={() => console.log(3)}>
            <div style={{display: "flex", alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "50px",}}>
                <h1 style={{fontFamily:"Barlow", fontSize:"28px", fontWeight:500, lineHeight:"36px", color:"#000000"}}>Próximas partidas</h1>
                <ModalLogin setIsIn={() => console.log()} isIn={false} idMatch='' isAddMatch={true} />
            </div>
            <Grid container spacing={4.5} columns={{md: 16}}>
                {dataSlice && Array.isArray(dataSlice) && dataSlice.map((match, index) => (
                <Grid item xs={3} sm={4} md={4} key={index}>
                    <ActionCard 
                    game={match.name}
                    platform={match.platform}
                    date={format(addDays(new Date(match.date),1), 'dd/MM/yyyy')}
                    time={format(addHours(new Date(match.time),3), 'HH:mm')}
                    players={match.maxPlayers}
                    status={statusColor(match) as 'open' | 'closed' | 'ended'}
                    onClick={() => router.push(`/match/${match.id}`)} />
                </Grid>
                ))}
            </Grid>
            <div style={{display: "flex", justifyContent:"center", 
            marginBottom:"3.5rem", marginTop: "4rem"}}>
                <Pagination count={numPages} color="standard"
                style={{padding:"0.7rem"}}
                shape='rounded'
                onChange={handlePageChange} />
            </div>
        </Template>
    );
}