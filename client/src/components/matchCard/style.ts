import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  width: 230px;
  height: 99px;
  border-radius: 16px;
  box-shadow: 
    0px 1px 3px 1px rgba(0, 0, 0, 0.15),
    0px 1px 2px 0px rgba(0, 0, 0, 0.3);
`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: #292929;
  gap: 3px;

  .Game {
    font-size: 14px;
    font-weight: 500;
    font-family: 'Barlow';
  }

  .Platform, .DateTime, .Players {
    font-size: 14px;
    font-weight: 300;
    font-family: 'Barlow';
  }

  .DateTimePlayers {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .IconPlayers {
    display: flex;
    flex-direction: row;
    gap: 5px;
  }
`;