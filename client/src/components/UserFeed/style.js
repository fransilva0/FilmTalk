import styled from 'styled-components';
import { Icon } from '@iconify/react';
import Image from 'next/image';

export const Container = styled.div`
    display: flex;
    justify-content: center;
`;

export const GeneralContainer = styled.section`

display: flex;
flex-direction: column;

@media (min-width: 1025px) {
    flex-direction: row;

    div {
   
        width: 100%;
    }
    
}


`;

export const ProfileSection = styled.section`

    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem;
    background: linear-gradient(90deg, #B84032, #535564);
    padding: 2rem;
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.3);

    div {
        margin-left: 1rem;

    }

    p {
        color: #fff;
        margin-top: 0.5rem;
    }

`;

export const StyledIcon = styled(Icon)`
  color: #fff;
  font-size: 2rem;
  margin: 0;
  margin-right: 0.5rem;
  padding: 0;

`;

export const Button = styled.button`

    background: transparent;
    border: none;
    cursor: pointer;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    text-align: left;

    p {
        color: #fff;
        font-size: 1rem;
    }
`;

export const PublicationsSection = styled.section`

    padding: 1rem;
    padding-top: 0;
    padding-top: 4rem;


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

export const ProfileImage = styled(Image)`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-right: 0.5rem;
`;

export const ProfilePostSection = styled.section`

    display: flex;
    align-items: center;

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

export const StyleIcon = styled(Icon)`
  color: #B84032;
  font-size: 5rem;
  margin: 1rem;
  border-radius: 5rem;
  border: 3px solid #B84032;
  padding: 0;
  

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

export const UserTitleCard = styled.button`

    background: transparent;
    border: none;
    font-size: 16px;
    color: #fff;
    cursor: pointer;

`;