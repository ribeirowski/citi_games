import { ActionCard } from "components";
import { ContentDiv, SecondContainer, DatePickerContainer, datePickerTheme} from "./style";
import { Pagination, ThemeProvider, Typography } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MatchAtributes, UserType } from "interfaces";
import { format, compareAsc, compareDesc, sub } from "date-fns";
import React from "react";
import 'dayjs/locale/pt-br';
import dayjs from "dayjs";
import  Router from "next/router";


/*--------------------------------------------Template dos cartões---------------------------------------------*/


export function renderOpen(openPageSlice: MatchAtributes[], numPagesOpen: number, currentPageOpen: number,
    handlePageChangeOpen: (event: React.ChangeEvent<unknown>, value: number) => void) {
    
        return (
        <SecondContainer>
          <ContentDiv style={{justifyContent:"flex-start", gap: "40px"}} id="matches">
            {openPageSlice?.map((match, index) => {
              return (
              <ActionCard
                key={index}
                game={match.name}
                platform={match.platform}
                date={format(new Date(match.date), 'dd/MM/yyyy')}
                time={format(new Date(match.time), 'HH:mm')}
                players={match.maxPlayers}
                status='open'
                onClick={() => Router.push(`/match/${match.id}`)}
              />
              );
              })}
          </ContentDiv>
          <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
          <Pagination count={numPagesOpen} page={currentPageOpen} onChange={handlePageChangeOpen} shape="rounded"/>
          </div>
        </SecondContainer>
      );
}

export function renderClosed(closedPageSlice: MatchAtributes[], numPagesClosed: number, currentPageClosed: number,
    handlePageChangeClosed: (event: React.ChangeEvent<unknown>, value: number) => void) {

        return (
        
            <SecondContainer>
              <ContentDiv style={{justifyContent: "flex-start", gap: "40px"}}>
                {closedPageSlice?.map((match, index) => {
                  return (
                  <ActionCard
                    key={index}
                    game={match.name}
                    platform={match.platform}
                    date={format(new Date(match.date), 'dd/MM/yyyy')}
                    time={format(new Date(match.time), 'HH:mm')}
                    players={match.maxPlayers}
                    status='closed'
                    onClick={() => Router.push(`/match/${match.id}`)}
                  />
                  );
                  })}
              </ContentDiv>
              <div style={{display: "flex", justifyContent: "center", marginTop: "20px", paddingBottom: "40px"}}>
              <Pagination count={numPagesClosed} page={currentPageClosed} onChange={handlePageChangeClosed} shape="rounded"/>
              </div>
            </SecondContainer>
          );
}

export function renderEnded(endedPageSlice: MatchAtributes[], numPagesEnded: number, currentPageEnded: number,
    handlePageChangeEnded: (event: React.ChangeEvent<unknown>, value: number) => void) {

        return (
            <SecondContainer>
              <ContentDiv style={{justifyContent: "flex-start", gap: "40px"}}>
                {endedPageSlice?.map((match, index) => {
                  return (
                  <ActionCard
                    key={index}
                    game={match.name}
                    platform={match.platform}
                    date={format(new Date(match.date), 'dd/MM/yyyy')}
                    time={format(new Date(match.time), 'HH:mm')}
                    players={match.maxPlayers}
                    status='ended'
                    onClick={() => Router.push(`/match/${match.id}`)}
                  />
                  );
                  })}
              </ContentDiv>
              <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
              <Pagination count={numPagesEnded} page={currentPageEnded} onChange={handlePageChangeEnded} shape="rounded" />
              </div>
            </SecondContainer>
          );
}


/*------------------------------------------Renderiza os cartões------------------------------------------------*/


export const renderMatches = (userData: UserType, status: 'open' | 'closed' | 'ended',
        dateFrom: string, dateTo: string,
        currentPageOpen: number, currentPageClosed: number, currentPageEnded: number,
        handlePageChangeOpen: (event: React.ChangeEvent<unknown>, value: number) => void,
        handlePageChangeClosed: (event: React.ChangeEvent<unknown>, value: number) => void,
        handlePageChangeEnded: (event: React.ChangeEvent<unknown>, value: number) => void
) => {

    const getPageSlice = (matches: MatchAtributes[], currentPage: number) => {
      return matches?.slice(4 * (currentPage - 1), 4 * (currentPage - 1) + 4);
    };

    const openMatches = userData.matches?.filter((match) => !match.isFull && match.isActive 
    && compareAsc(new Date(match.date), new Date(dateFrom)) >= 0 && compareDesc(new Date(match.date), new Date(dateTo)) >= 0) || [];
    
    const closedMatches = userData.matches?.filter((match) => match.isFull && match.isActive 
    && compareAsc(new Date(match.date), new Date(dateFrom)) >= 0 && compareDesc(new Date(match.date), new Date(dateTo)) >= 0) || [];
    
    const endedMatches = userData.matches?.filter((match) => !match.isActive 
    && compareAsc(new Date(match.date), new Date(dateFrom)) >= 0 && compareDesc(new Date(match.date), new Date(dateTo)) >= 0) || [];

    const numPagesOpen = openMatches?.length ? Math.ceil(openMatches.length/4) : 1;
    const numPagesClosed = closedMatches?.length ? Math.ceil(closedMatches.length/4) : 1;
    const numPagesEnded = endedMatches?.length ? Math.ceil(endedMatches.length/4) : 1;

    const openPageSlice = getPageSlice(openMatches, currentPageOpen);
    const closedPageSlice = getPageSlice(closedMatches, currentPageClosed);
    const endedPageSlice = getPageSlice(endedMatches, currentPageEnded);

    console.log(dateFrom, dateTo, openPageSlice)

    if (status === 'open') {

      if (openPageSlice.length) {

        return(
          renderOpen(openPageSlice, numPagesOpen, currentPageOpen, handlePageChangeOpen)
        );

      }

      else {

        return (
            <ContentDiv style={{justifyContent: "center", marginTop: "80px"}}>
              <Typography variant="h5" fontFamily={"Barlow"}>Não há partidas abertas</Typography>
            </ContentDiv>
        );
      }
    }


    else if (status === 'closed') {

      if (closedPageSlice.length) {
        
        return(
          renderClosed(closedPageSlice, numPagesClosed, currentPageClosed, handlePageChangeClosed)
        );

      }

      else {

        return (
            <ContentDiv style={{justifyContent: "center", marginTop: "80px"}}>
              <Typography variant="h5" fontFamily={"Barlow"}>Não há partidas fechadas</Typography>
            </ContentDiv>
        );
      }
    }


    else if (status === 'ended') {

      if (endedPageSlice.length) {

        return(
          renderEnded(endedPageSlice, numPagesEnded, currentPageEnded, handlePageChangeEnded)
        );
      
      }

      else {
          
          return (
              <ContentDiv style={{justifyContent: "center", marginTop: "80px"}}>
                <Typography variant="h5" fontFamily={"Barlow"}>Não há partidas</Typography>
              </ContentDiv>
          );
      }
    }
  }


  /*----------------------------------------------Renderiza as Tabs---------------------------------------------*/

  
export const renderContent = (userData:UserType , tabValue: string,
    currentPageOpen: number, currentPageClosed: number, currentPageEnded: number,
    handlePageChangeOpen: (event: React.ChangeEvent<unknown>, value: number) => void,
    handlePageChangeClosed: (event: React.ChangeEvent<unknown>, value: number) => void,
    handlePageChangeEnded: (event: React.ChangeEvent<unknown>, value: number) => void
 ) => {

    const [dateFrom, setDateFrom] = React.useState('1900-01-01T00:00:00.000Z')
    const [dateTo, setDateTo] = React.useState('2099-01-01T23:59:00.000Z')


    function fromSetter(date: string | undefined) {
        setDateFrom(date || '1900-01-01T00:00:00.000Z')
    }
    
    function toSetter(date: string | undefined) {
        setDateTo(date || '2099-01-01T23:59:00.000Z')
    }


    /*------------------Para mostrar as partidas ativas------------------*/
  
  
    if (tabValue === 'Partidas') {
        
      return (
          <SecondContainer>
            <ContentDiv>
              <Typography variant="h1" fontFamily={"Barlow"}>Partidas Abertas</Typography>
                <DatePickerContainer>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                <ThemeProvider theme={datePickerTheme}>
                  <DesktopDatePicker
                    slotProps={{
                      textField: {
                        label: "Início",
                        placeholder: "dd/mm/yyyy",
                      }
                    }}
                    onChange={(value) => {fromSetter(value?.subtract(3, 'h').toJSON())}}
                    maxDate={dayjs(dateTo)}
                  />
                    <DesktopDatePicker
                    slotProps={{
                      textField: {
                        label: "Fim",
                        placeholder: "dd/mm/yyyy",
                      }
                    }}
                    onChange={(value) => {{toSetter(value?.add(20, 'h').add(59, 'm').toJSON())}}}
                    minDate={dayjs(dateFrom).add(1, 'd')}
                    />
                  </ThemeProvider>
                </LocalizationProvider>
                </DatePickerContainer>
            </ContentDiv>
            {renderMatches(userData, "open",
                          dateFrom, dateTo,
                          currentPageOpen, currentPageClosed, currentPageEnded,
                          handlePageChangeOpen, handlePageChangeClosed, handlePageChangeEnded)}
            <ContentDiv style={{ marginTop: "30px" }}>
              <Typography variant="h1" fontFamily={"Barlow"}>Partidas Fechadas</Typography>
            </ContentDiv>
            {renderMatches(userData, "closed",
                          dateFrom, dateTo,
                          currentPageOpen, currentPageClosed, currentPageEnded,
                          handlePageChangeOpen, handlePageChangeClosed, handlePageChangeEnded)}
          </SecondContainer>
        );
  
  
    /*-----------------Para mostrar as partidas passadas-----------------*/
  
  
    } else if (tabValue === 'Histórico') {
        
      return (
        <SecondContainer>
          <ContentDiv>
            <Typography variant="h1" fontFamily={"Barlow"}>Histórico de Partidas</Typography>
            <DatePickerContainer>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                <ThemeProvider theme={datePickerTheme}>
                <DesktopDatePicker
                  slotProps={{
                    textField: {
                      label: "Início",
                    }
                  }}
                  onChange={(value) => {{fromSetter(value?.subtract(3, 'h').toJSON())}}}
                  maxDate={dayjs(dateTo)}
                />
                  <DesktopDatePicker
                  slotProps={{
                    textField: {
                      label: "Fim",
                    }
                  }}
                  onChange={(value) => {{toSetter(value?.add(20, 'h').add(59, 'm').toJSON())}}}
                  minDate={dayjs(dateFrom).add(1, 'd')}
                  />
                </ThemeProvider>
              </LocalizationProvider>
            </DatePickerContainer>
          </ContentDiv>
          {renderMatches(userData, "ended",
                        dateFrom, dateTo,
                        currentPageOpen, currentPageClosed, currentPageEnded,
                        handlePageChangeOpen, handlePageChangeClosed, handlePageChangeEnded)}
        </SecondContainer>
      );
    }
  };

  export default renderContent;