interface UserType {
    id: string,
    username: string,
    email: string,
    matches: MatchAtributes[],
    isOwner: MatchAtributes[],
}


interface MatchAtributes {
    id?: string,
    name: string,
    date: string,
    time: string,
    platform: string,
    link: string, 
    description: string,
    ownerId: string,
    isFull: boolean,
    isActive: boolean,
    maxPlayers: number,
    players: UserType[],
    owner: UserType,
}

interface PropsEmail {
    userName: string;
    userEmail: string;
    nameMatch: string;
    date: string;
    time: string;
    platform: string;
    linkMatch: string;
    subjectText: string;
}

export type { UserType, MatchAtributes, PropsEmail };