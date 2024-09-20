import styled from "styled-components";

export const MatchContainer = styled.div`
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
    gap: 48px;
    
`;
export const DivInformation = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: flex-start;
    justify-content: center;
    margin: 9px 0px 32px 0px;
    gap: 5px;

    p {
        font-family: Barlow;
        font-size: 16px;
        font-weight: 400;
        line-height: 19.2px;
        color: #454545;
    }

`;

export const MatchtParagraph = styled.p`
        font-family: Barlow;
        font-size: 16px;
        font-weight: 600;
        line-height: 19.2px;
        color: #000000
;
`
export const MatchInformationTitle = styled.p`
        font-family: Barlow;
        font-size: 28px;
        font-weight: 600;
        line-height: 36px;
        color: #000000;
    
`;


export const MatchContent = styled.div`

    /* display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    height: auto; */
`

export const MatchDescription = styled.div`
    width: 586px;
    height: 130px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.5);
    padding : 17px 24px ;
    margin: 8px 0px 32px 0px;

    p {
        font-family: Barlow;
        font-size: 14px;
        font-weight: 400;
        line-height: 16.8px;
        text-align :left ;
        color: #454545;
        width: 539px;
        /* height: 86px; */
        overflow: hidden;
    }
`

export const MatchLink = styled.div`
    width: 586px;
    height: 32px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.5);
    padding : 7px 24px 10px 24px ;
    margin: 8px 0px 59px 0px;

    p {
        font-family: Barlow;
        font-size: 14px;
        font-weight: 400;
        line-height: 16.8px;
        color: #454545;
        width: 539px;
    }
`
