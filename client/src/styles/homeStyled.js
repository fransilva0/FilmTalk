import styled from 'styled-components';
import { Icon } from '@iconify/react';


export const ProfileSection = styled.section`

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 2rem;

    p {
        color: #fff;
        margin-top: 0.5rem;
    }

img  {
    
}

`;

export const StyledIcon = styled(Icon)`
  color: #fff;
  font-size: 5rem;
  margin: 0;
  padding: 0;

  &:hover {
    color: #B84032
  }

`;

export const Button = styled.button`

    background: transparent;
    border: none;
    cursor: pointer;
    margin-right: 1rem;
    margin-top: 1rem;
    display: flex;
    align-items: center;

    p {
        color: #fff;
        font-size: 1rem;
        margin-right: 0.5rem;
    }
`;

export const NavBar = styled.div`

    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #B84032, #535564);
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1;

    div {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding-top: 3rem;
    }

    &.nav-enter {
        transform: translateX(100%);
    }

    &.nav-enter-active {
        transform: translateX(0);
        transition: transform 200ms;
    }

    &.nav-exit {
        transform: translateX(0);
    }

    &.nav-exit-active {
        transform: translateX(100%);
        transition: transform 200ms;
    }

    @media (min-width: 1025px) {
        
        width: 25%;

    }

`;

export const StyledIconNavbar = styled(StyledIcon)`

    font-size: 3rem;

    &:hover {
        color: #fff;
    }

`;