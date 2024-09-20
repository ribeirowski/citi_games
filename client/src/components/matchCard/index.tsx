import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { PlayersIcon } from 'assets';
import { StyledCard, StyledCardContent } from './style'

/*Receives a query specifying the match options. Example matchObject.
- Game
- Platform
- Date
- Time
- Players 
- Status: open, closed, ended
- Link
*/

interface MatchObject {
    game: string;
    platform: string;
    date: string;
    time: string;
    players: number;
    status: 'open' | 'closed' | 'ended';
    onClick: () => void;
}

const colors = {
  open: "#D2EFFE",
  closed: "#D5C6FA",
  ended: "#DEDEDE"
}

function getStatusColor(matchStatus: string): string {
  
  switch (matchStatus) {
    case 'open':
      return colors.open;
    case 'closed':
      return colors.closed;
    default:
      return colors.ended;
    }
  }

function stringSizeParser(name: string): string {

  if (name.length > 21) {

    return name.substring(0, 20) + "...";

  }

  return name;

}

export const ActionCard: React.FC<MatchObject> = ({
  game,
  platform,
  date,
  time,
  players,
  status,
  onClick,
  }) => {
  
    const dateTimeParsed = `${date}   |   ${time.padStart(2, '0')} h`;
    const playersParsed = String(players).padStart(2, '0')
  
    return (
      <StyledCard>
        <CardActionArea style={{ backgroundColor: `${getStatusColor(status)}` }} onClick={onClick}>
            <StyledCardContent>
              <Typography className="Game">{stringSizeParser(game)}</Typography>
              <Typography className="Platform">{stringSizeParser(platform)}</Typography>
              <div className="DateTimePlayers">
                <pre><Typography className="DateTime">{dateTimeParsed}</Typography></pre>
                <div className="IconPlayers">
                  <Typography className="Players">{playersParsed}</Typography>
                  <Image src={PlayersIcon} alt='Players Icon'/>
                </div>
              </div>
            </StyledCardContent>
        </CardActionArea>
      </StyledCard>
    );
  };