import React,{ useState, useEffect }  from "react";
import { CSSTransition } from 'react-transition-group';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';
import imgProfile from "../assets/img-profile.jpg";
import { MainHeader } from "../components/Header"
import { SettingsScreen } from "../components/settingsScreen";
import { UserPosts } from "../components/UserPosts";
import { UserFeed } from "../components/UserFeed";
import { Icon } from '@iconify/react';

const ProfileSection = styled.section`

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

const StyledIcon = styled(Icon)`
  color: #fff;
  font-size: 5rem;
  margin: 0;
  padding: 0;

  &:hover {
    color: #B84032
  }

`;

const Button = styled.button`

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

const NavBar = styled.div`

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

const StyledIconNavbar = styled(StyledIcon)`

    font-size: 3rem;

    &:hover {
        color: #fff;
    }

`;


export default function Home() {
    const [Screen, setScreen] = useState('userFeed');
    const [isBarVisible, setBarVisible] = useState(false);
    const [user, setUser] = useState();

    const router = useRouter();

    const toggleBar = () => {
        setBarVisible(!isBarVisible);
    };

    const ControlScreen = (dataScreen) => {
        setScreen(dataScreen)
        setBarVisible(!isBarVisible);
    }

    let renderContent;

    if (Screen === 'PublicationsProfile') {
        renderContent = <UserPosts userProp={user} setUserProp={setUser} />;
        
    } else if (Screen === 'settings') {
      renderContent = <SettingsScreen setScreen={setScreen} />;
      
    } else if (Screen === 'userFeed') {
        renderContent = <UserFeed userProp={user} setUserProp={setUser} setScreen={setScreen} />;
    }

   

    useEffect(() => {

        const loggedInUser = localStorage.getItem("user");

        if (loggedInUser) {

          const foundUser = JSON.parse(loggedInUser);

          setUser(foundUser);

        } else {
            
            router.push('/login');
            
          }
      }, []);

    if (!user) {

        return null;

    }

    const handleLogout = () => {

        localStorage.clear();
        router.push('/login');
      
      };

    return (
        <>
            <MainHeader>

                <Button onClick={toggleBar}>
                    <StyledIcon icon="system-uicons:menu-hamburger" />
                </Button>

            </MainHeader>

            
            <CSSTransition
                in={isBarVisible}
                timeout={200}
                classNames="nav"
                unmountOnExit
            >
                <NavBar >
                    <div>
                    <Button onClick={toggleBar}>
                        <StyledIcon icon="mingcute:close-line" />
                    </Button>
                    </div>

                    <ProfileSection>

                        <Image src={imgProfile} alt="image by Carter Baran, via Unsplash" width="100" height="100" />
                        <p>{user && user.username}</p>

                    </ProfileSection>

                    <div>

                        <Button onClick={() => ControlScreen('userFeed')}>
                            <p>Página Inicial</p>
                            <StyledIconNavbar icon="ic:round-home" />

                        </Button>

                        <Button onClick={() => ControlScreen('PublicationsProfile')}>
                            <p>Minhas Postagens</p>
                            <StyledIconNavbar icon="fluent-person-feedback-16-filled" />

                        </Button>

                        <Button>
                            <p>Conexões</p>
                            <StyledIconNavbar icon="mdi-users" />

                        </Button>
                
                        <Button>
                            <p>Perfis de filmes</p>
                            <StyledIconNavbar icon="fluent-movies-and-tv-20-filled" />

                        </Button>
                

                
                        <Button onClick={() => ControlScreen('settings')}>
                            <p>Configurações de conta</p>
                            <StyledIconNavbar icon="ic-baseline-settings" />

                        </Button>

                        <Button type="submit" onClick={handleLogout}>
                            <p>logout</p>
                            <StyledIconNavbar icon="uiw:login" />
                        </Button>
                    </div>
                    
                    
                </NavBar>
            </CSSTransition>
            

            {renderContent}

        </>
    )
    
}