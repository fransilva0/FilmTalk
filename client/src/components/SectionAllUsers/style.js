import Image from 'next/image';
import styled from 'styled-components';

export const SectionFavorite = styled.section`

    display: ${props => props.hideOnMobile ? 'none' : 'flex'};
    flex-direction: column;
    padding: 1rem;
    margin: 1rem;

    h2 {
        border-bottom: 1px solid #535564;
        color: #535564;
        padding-bottom: 1rem;
        font-size: 1rem;
        display: ${props => props.hideTitleSection ? 'none' : 'flex'};
    }


    @media (min-width: 1025px) {
        
        display: flex;
        width: 30%;
    }

`;

export const SectionCards = styled.div`

    overflow-x: hidden;
    overflow: auto;
    margin-top: 1rem;
    max-height: ${props => props.expandHeight ? '100%' : '25vh'};

    background: transparent;
    box-shadow: ${props => props.hideBoxShadow ? 'none' : 'rgba(184, 64, 50, 0.5) 0px 25px 50px -12px'};
    


    &::-webkit-scrollbar {
        display: none; 
    }

    -ms-overflow-style: none;  
    scrollbar-width: none;

    @media (min-width: 1025px) {

        max-height: 40vh;
        

    }

`;

export const UserCard = styled.section`

    display: flex;
    align-items: center;
    padding: 0.5rem;
    margin: 0.5rem;

    @media (min-width: 1025px) {

        width: 100%;
    }



`;

export const ProfileImage = styled(Image)`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-right: 0.5rem;
`;

export const LinkFollow = styled.p`

font-size: 0.8rem;
color: #B84032;

`;
