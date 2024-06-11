import Image from 'next/image';
import styled from 'styled-components';

export const MovieSection = styled.section`

    display: ${props => props.hideOnMobile ? 'none' : 'flex'};
    flex-direction: column;
    padding: 1rem;

    h2 {
        border-bottom: 1px solid #535564;
        color: #535564;
        padding-bottom: 1rem;
        font-size: 1rem;
        display: ${props => props.hideTitleSection ? 'none' : 'flex'};
    }


    @media (min-width: 1025px) {
        
        display: flex;
        margin-right: 4rem;
        width: 50vh;
        box-shadow: rgba(184, 64, 50, 0.5) 0px 25px 50px -12px;
        margin-bottom: 2rem;

    }

`;

export const SectionCards = styled.div`

    overflow-x: hidden;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    overflow: auto;
    margin-top: 1rem;
    max-height: ${props => props.expandHeight ? '100%' : '25vh'};
    background: transparent;
    


    &::-webkit-scrollbar {
        display: none; 
    }

    -ms-overflow-style: none;  
    scrollbar-width: none;

    @media (min-width: 1025px) {
        
        max-height: 40vh;

    }

`;

export const MovieCard = styled.section`

    display: flex;
    align-items: center;
    padding: 0.5rem;
    margin: 0.5rem;



`;

export const MovieImage = styled(Image)`
    width: auto;
    height: auto;
    margin-right: 0.5rem;
`;