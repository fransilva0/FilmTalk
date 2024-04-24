import React,{ useState, useEffect }  from "react";
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';
import imgProfile from "../assets/img-profile.jpg";
import { MainHeader } from "../components/Header"
import { SettingsScreen } from "../components/settingsScreen";
import { UserPosts } from "../components/UserPosts";
import { Icon } from '@iconify/react';

const ProfileSection = styled.section`

display: flex;
justify-content: space-between;
align-items: center;

div {
    margin-right: 0.5rem;

    p {
        color: #fff;
        text-align: right;
    }
}

img  {
    border-radius: 5rem;
}

`;

const ProfileFooter = styled.footer`

    padding: 1rem 0.5rem 0.5rem 0.5rem;
    border-top: 1px solid #DF2222;
    display: flex;
    flex-direction: none;
    justify-content: center;

    position: fixed;
    bottom: 0;
    width: 100%;

    button {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0 0.2rem 0 0.2rem;
    }

    @media (min-width: 1025px) {
        
        button {
            padding: 0 1rem 0 1rem;
        }

    }

`;


export default function Home() {
    const [Screen, setScreen] = useState('PublicationsProfile');

    const [user, setUser] = useState();

    const router = useRouter();


    const ControlScreen = (dataScreen) => {
        setScreen(dataScreen)
    }

    let renderContent;

    if (Screen === 'PublicationsProfile') {
        renderContent = <UserPosts userProp={user} setUserProp={setUser}/>;
    } else if (Screen === 'settings') {
      renderContent = <SettingsScreen/>;
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


    return (
        <>
            <MainHeader>

                <ProfileSection>
                    <div>
                        <p>{user && user.username}</p>
                    </div>
                    <Image src={imgProfile} alt="image by Carter Baran, via Unsplash" width="61" height="61" />
                </ProfileSection>

            </MainHeader>

            {renderContent}

            <ProfileFooter>
                
                <button>
                    <Icon icon="mdi-users" style={{ color: '#fff', fontSize: '4rem', margin: "0", padding: "0" }} />
                </button>
                
                <button>
                    <Icon icon="fluent-movies-and-tv-20-filled" style={{ color: '#fff', fontSize: '4rem', margin: "0", padding: "0" }} />
                </button>
                
                <button onClick={() => ControlScreen('PublicationsProfile')}>
                    <Icon icon="ic:round-home" style={{ color: '#fff', fontSize: '4rem', margin: "0", padding: "0" }} />
                </button>
                
                <button>
                    <Icon icon="fluent-person-feedback-16-filled" style={{ color: '#fff', fontSize: '4rem', margin: "0", padding: "0" }} />
                </button>
                
                <button onClick={() => ControlScreen('settings')}>
                    <Icon icon="ic-baseline-settings" style={{ color: '#fff', fontSize: '4rem', margin: "0", padding: "0" }} />
                </button>

            </ProfileFooter>

        </>
    )
    
}