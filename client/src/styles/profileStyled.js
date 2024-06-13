import styled from 'styled-components';
import Image from 'next/image';
import { Icon } from '@iconify/react';


export const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem;

    h1 {
        font-size: 1rem;
    }

    p {
        font-size: 0.8rem;
        margin-top: 1rem;
        text-align: center;
    }

    @media (min-width: 1025px) {
        
        h1 {
            font-size: 2rem;
        }

        p {
            font-size: 1rem;
        }
    }
`;

export const GeneralContainer = styled.div`

    display: flex;
    padding-left: 1rem;
    margin-top: 1rem;


`;

export const SectionProfile = styled.div`

    @media (min-width: 1025px) {
        width: 60%;
    }


`;

export const VisualizationContainer = styled(Container)`

    @media (min-width: 1025px) {
        flex-direction: row;
        align-items: start;
    
    }


`;

export const ImageStyle = styled(Image)`

    border-radius: 5rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    width: 10rem;
    height: 10rem;
    

    @media (min-width: 1025px) {
        width: 15rem;
        height: 15rem;
        border-radius: 10rem;
    }

`;

export const CentralLine = styled.hr`

    color: #B84032;
    background-color: #B84032;
    height: 2px;
    border: none;
    width: 30%;
    margin: 0 auto;

`;

export const Button = styled.button`

    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;

    p {
        color: #B84032;
        font-size: 1rem;
        margin: 0;
        margin-left: 0.5rem;
    }
`;

export const StyledIcon = styled(Icon)`
  color: #B84032;
  font-size: 5rem;
  margin: 0;
  padding: 0;

  &:hover {
    color: #B84032
  }

`;

export const StyledIconButton = styled(StyledIcon)`

    font-size: 3rem;
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: 1025px) {

    display: ${props => props.hide ? 'none' : 'flex'};


  }

`;

export const NavbarButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.isActive ? '#B84032' : '#535564'};
  cursor: pointer;
  font-size: 16px;
  padding: 10px;
`;

export const PublicationsSection = styled.section`

    padding: 1rem;

    &::-webkit-scrollbar {
        display: none; 
    }

    -ms-overflow-style: none;  
    scrollbar-width: none;


    @media (min-width: 1025px) {

        width: 40%;
        margin-left: auto;
        margin-right: auto;
        
    }

`;

export const Publication = styled.div`

    background: transparent;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    margin-top: 2rem; 
    border: 1px solid rgba(0, 0, 0, 0.25);
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.25);

    button {
        color: #535564;
        font-size: 1.3rem;
        background: transparent;
        border: none;
        text-align: left;
        cursor: pointer;
        margin: 1rem;
    }




`;

export const CommentSection = styled.div`
    margin-top: 10px;
    display: flex;
    color: #535564;
    font-size: 0.8rem;
    justify-content: right;

    p {
        padding-right: 0.5rem;
    }


`;

export const Spinner = styled.span`

width: 48px;
height: 48px;
border: 5px solid #DF8271;
border-bottom-color: transparent;
border-radius: 50%;
display: inline-block;
box-sizing: border-box;
animation: rotation 1s linear infinite;
margin: 1rem;

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
    
`;

export const ButtonSection = styled.section`

    display: flex;
    flex-direction: column;
    align-self: stretch;

    @media (min-width: 1025px) {
   
      justify-content: right;
      flex-direction: row;
      
  }
`;