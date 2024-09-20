import * as React from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Template } from 'components';
import { Fonts, InputBox, inputTheme, datePickerTheme, bigInputTheme, addTheme, StyledButton } from './styles';
import { Box, TextField, ThemeProvider, InputAdornment, IconButton, Snackbar, Slide } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';
import 'dayjs/locale/en-gb';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { MatchAtributes, UserType } from 'interfaces';
import api from 'services/api';
import { useForm, Controller } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { hourInvalid, isActual } from 'pages/explorer/date';

const matchSchema = z.object({
    name: z.string().min(1, { message: "Nome da partida é obrigatório" }),
    platform: z.string().min(1, { message: "Plataforma é obrigatória" }),
    link: z.string().url({ message: "Link inválido" }),
    description: z.string().min(1, { message: "Descrição é obrigatória" }),
    date: z.string().refine((days) => {
        const valid = isActual(new Date(days), new Date());
        if (valid === 0) {
            return false;
        }
        return true
    }, { message: "Data inválida"}),
    time: z.string(),
    maxPlayers: z.number().min(1, { message: "Qtd. de participantes deve ser maior que 0" }),
}).superRefine((data,context) => {
    const Actualdate = isActual(new Date(data.date), new Date());
    if (Actualdate <= 1 && hourInvalid(new Date(data.time), new Date())) {
        return context.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Hora inválida",
            path: ["time"],
        });
    }
    else if (Actualdate == 0) {
        return context.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Hora inválida",
            path: ["time"],
        });
    }
});

type MatchSchema = z.infer<typeof matchSchema>;

const TransitionUp = (props: any) => {
    return <Slide {...props} direction="up" timeout={{ enter: 300, exit: 300 }} />;
};

export default function createMatch() {
    const queryClient = useQueryClient();
    const [qtdParticipantes, setQtdParticipante] = React.useState<number>(0);
    const router = useRouter();
    const ownerId = router.query.id as string;
    const [toastOpen, setToastOpen] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState('');
    const [toastColor, setToastColor] = React.useState('green');

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<MatchSchema>({
        resolver: zodResolver(matchSchema),
    });

    const handleQtdParticipantes = (value: number) => {
        setQtdParticipante(value);
    };

    async function createMatch(match: MatchAtributes) {
        const response = await api.post('/match', match);
        return response.data;
    }

    async function getAllUsers(): Promise<UserType[]> {
        try {
            const response = await api.get(`/user`);
            return response.data;
        } catch (error) {
            console.error("Error fetching match details:", error);
            throw new Error("Failed to fetch match details");
        }
    }

    async function getAllMatches(): Promise<MatchAtributes[]> {
        try {
            const response = await api.get(`/match`);
            return response.data;
        } catch (error) {
            console.error("Error fetching match details:", error);
            throw new Error("Failed to fetch match details");
        }
    }

    async function addOwner({ userId, matchId }: { userId: string, matchId: string }) {
        try {
            const response = await api.patch(`/match/add/${matchId}`, { playerId: userId });
            return response.data;
        } catch (error) {
            console.error("Error fetching match details:", error);
            throw new Error("Failed to fetch match details");
        }
    }

    const dataUsers = useQuery<UserType[]>({
        queryKey: ['users'],
        queryFn: getAllUsers,
    });

    const dataMatches = useQuery<MatchAtributes[]>({
        queryKey: ['match'],
        queryFn: getAllMatches,
    });

    const mutationAddOwner = useMutation({
        mutationFn: addOwner,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addPlayer'] });
        },
    });

    const mutation = useMutation({
        mutationFn: createMatch,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['match'] });
            console.log(data.values);

            const matchId = data?.values.id;
            if (matchId) {
                mutationAddOwner.mutate({ userId: ownerId, matchId: matchId });
                setToastMessage('Partida criada com sucesso!');
                setToastColor('green');
                setToastOpen(true);
            }
        },
    });

    const findUser = (id: string) => {
        const user = dataUsers.data?.find(user => user.id === id);
        return user;
    };

    const findMatch = (name: string) => {
        const match = dataMatches.data?.find(match => match.name == name);
        return match?.id;
    }

    const onSubmit = (data: MatchSchema) => {
        const owner = findUser(ownerId);

        if (owner) {
            const match = {
                ...data,
                maxPlayers: qtdParticipantes, // Sincronizar o valor
                ownerId: ownerId,
                isFull: false,
                isActive: true,
                players: [],
                owner: owner,
            };
            mutation.mutate(match);
            handleQtdParticipantes(0);
            reset();
        } else {
            console.error('Owner é indefinido');
        }
    };

    const handleCloseToast = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setToastOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseToast}>
                <CloseIcon />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Template onClickTitle={() => router.back()} title='Voltar' IsBack={true}>
            <Fonts>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ThemeProvider theme={inputTheme}>
                        <h1 style={{ paddingTop: "0.5rem" }}>Nova partida</h1>
                        <h2 style={{ paddingTop: "2rem", paddingBottom: "1.5rem" }}>Informações gerais</h2>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <InputBox>
                                <p>Nome do jogo:</p>
                                <TextField
                                    label="Nome do jogo"
                                    variant='outlined'
                                    style={{ width: "500px" }}
                                    {...register('name')}
                                    error={!!errors.name}
                                />
                            </InputBox>
                            <InputBox>
                                <p>Plataforma:</p>
                                <TextField
                                    label="Plataforma"
                                    variant='outlined'
                                    style={{ width: "500px" }}
                                    {...register('platform')}
                                    error={!!errors.platform}
                                />
                            </InputBox>
                        </Box>
                        <Box display={'flex'} justifyContent={'space-between'} paddingTop={'1.5rem'}>
                            <ThemeProvider theme={bigInputTheme}>
                                <InputBox>
                                    <p>Descrição:</p>
                                    <TextField
                                        label="Descrição"
                                        variant='outlined'
                                        multiline
                                        rows={10.5}
                                        style={{ width: "500px", height: "259px" }}
                                        {...register('description')}
                                        error={!!errors.description}
                                    />
                                </InputBox>
                            </ThemeProvider>
                            <Box display={'flex'} flexDirection={'column'} width={"500px"} gap={'1.5rem'}>
                                <InputBox>
                                    <p>Link:</p>
                                    <TextField
                                        label="Link"
                                        variant='outlined'
                                        style={{ width: "500px" }}
                                        {...register('link')}
                                        error={!!errors.link}
                                    />
                                </InputBox>
                                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                                    <ThemeProvider theme={datePickerTheme}>
                                        <InputBox style={{ width: '240px' }}>
                                            <p>Data:</p>
                                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
                                                <Controller
                                                    name='date'
                                                    control={control}
                                                    render={({ field }) => (
                                                        <DatePicker
                                                            label="dd/mm/aaaa"
                                                            {...register('date')}
                                                            onChange={(date) => field.onChange(date ? date.toJSON() : '')}
                                                            slotProps={{
                                                                textField: {
                                                                    error: !!errors.date,
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </InputBox>
                                        <InputBox style={{ width: '240px' }}>
                                            <p>Hora:</p>
                                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
                                                <Controller
                                                    name='time'
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TimePicker
                                                            label="hh:mm"
                                                            {...register('time')}
                                                            onChange={(date) => field.onChange(date ? date.subtract(3, 'h').toJSON() : '')}
                                                            slotProps={{
                                                                textField: {
                                                                    error: !!errors.time,
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </InputBox>
                                    </ThemeProvider>
                                </Box>
                                <InputBox>
                                    <ThemeProvider theme={addTheme}>
                                        <p>Quantidade de participantes:</p>
                                        <Controller
                                            name='maxPlayers'
                                            control={control}
                                            defaultValue={0}
                                            render={({ field }) => (
                                                <TextField
                                                    label="Qtd. de participantes"
                                                    variant='outlined'
                                                    style={{ width: "500px" }}
                                                    value={qtdParticipantes}
                                                    type='number'
                                                    error={!!errors.maxPlayers}
                                                    onChange={(e) => {
                                                        handleQtdParticipantes(Number(e.target.value));
                                                        field.onChange(Number(e.target.value));
                                                    }}
                                                    InputProps={{
                                                        endAdornment:
                                                            <InputAdornment position="end">
                                                                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                                                                    <IconButton style={{ width: '25px', height: "25px" }}
                                                                        onClick={() => {
                                                                            handleQtdParticipantes(qtdParticipantes + 1);
                                                                            field.onChange(qtdParticipantes + 1);
                                                                        }}>
                                                                        <KeyboardArrowUpIcon />
                                                                    </IconButton>
                                                                    <IconButton style={{ width: '25px', height: '25px' }}
                                                                        onClick={() => {
                                                                            handleQtdParticipantes(qtdParticipantes > 0 ? qtdParticipantes - 1 : 0);
                                                                            field.onChange(qtdParticipantes > 0 ? qtdParticipantes - 1 : 0);
                                                                        }}>
                                                                        <KeyboardArrowDownIcon />
                                                                    </IconButton>
                                                                </Box>
                                                            </InputAdornment>,
                                                    }}
                                                />
                                            )}
                                        />
                                    </ThemeProvider>
                                </InputBox>
                            </Box>
                        </Box>
                        <Box display={'flex'} justifyContent={'center'} paddingTop={'4.5rem'} paddingBottom={'10rem'}>
                            <StyledButton
                                variant="contained"
                                style={{
                                    backgroundColor: '#51E678',
                                    border: '1px solid',
                                    borderColor: '#51E678'
                                }}
                                type='submit'>
                                Confirmar
                            </StyledButton>
                        </Box>
                    </ThemeProvider>
                </form>
                <Snackbar
                    open={toastOpen}
                    autoHideDuration={1700}
                    onClose={handleCloseToast}
                    message={toastMessage}
                    action={action}
                    ContentProps={{
                        style: {
                            backgroundColor: toastColor,
                        },
                    }}
                    TransitionComponent={TransitionUp}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                />
            </Fonts>
        </Template>
    );
}
