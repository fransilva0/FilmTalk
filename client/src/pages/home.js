import React,{ useState, useEffect }  from "react";
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group';
import { useRouter } from 'next/router';
import Image from 'next/image';
import imgProfile from "../assets/img-profile.jpg";
import { MainHeader } from "../components/Header"
import { SettingsScreen } from "../components/settingsScreen";
import { UserPosts } from "../components/UserPosts";
import { UserFeed } from "../components/UserFeed";
import { ProfileSection, StyledIcon, Button, NavBar, StyledIconNavbar} from "../styles/homeStyled"

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
                        <Link href="/profile" style={{ textDecoration: 'none' }}>
                            <p>{user && user.username}</p>
                        </Link>

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