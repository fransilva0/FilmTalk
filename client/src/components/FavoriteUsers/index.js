import React,{ useState, useEffect }  from "react";
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import styled from 'styled-components';
import imgProfile from "../../assets/img-profile.jpg";


const SectionFavorite = styled.section`

    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: 1rem;

    h2 {
        border-bottom: 1px solid #535564;
        color: #535564;
        padding-bottom: 1rem;
        font-size: 1rem;
    }


    @media (min-width: 1025px) {

        width: 20%;
    }

`;

const SectionCards = styled.div`

    overflow-x: hidden;
    overflow: auto;
    margin-top: 1rem;
    max-height: 25vh;

    background: transparent;
    box-shadow: -10px 10px 15px rgba(184, 64, 50, 0.5);


    &::-webkit-scrollbar {
        display: none; 
    }

    -ms-overflow-style: none;  
    scrollbar-width: none;

    @media (min-width: 1025px) {

        max-height: 40vh;

    }

`;

const UserCard = styled.section`

    display: flex;
    align-items: center;
    padding: 0.5rem;
    margin: 0.5rem;

    @media (min-width: 1025px) {

        width: 100%;
    }



`;

const ProfileImage = styled(Image)`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-right: 0.5rem;
`;


export function FavoriteUsers() {

    const handleScroll = (event) => {
        const element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            {/*if(offset != null) {
                CheckComments(access_token)
            }*/}
        }
    };


    return (
        <SectionFavorite>
            <h2>Para Acompanhar</h2>

            <SectionCards onScroll={handleScroll} >
                <UserCard>
                    <ProfileImage src={imgProfile} alt="image by Carter Baran, via Unsplash" width="100" height="100" />
                    <p>username</p>
                </UserCard>

                <UserCard>
                    <ProfileImage src={imgProfile} alt="image by Carter Baran, via Unsplash" width="100" height="100" />
                    <p>username</p>
                </UserCard>

                <UserCard>
                    <ProfileImage src={imgProfile} alt="image by Carter Baran, via Unsplash" width="100" height="100" />
                    <p>username</p>
                </UserCard>

                <UserCard>
                    <ProfileImage src={imgProfile} alt="image by Carter Baran, via Unsplash" width="100" height="100" />
                    <p>username</p>
                </UserCard>

                <UserCard>
                    <ProfileImage src={imgProfile} alt="image by Carter Baran, via Unsplash" width="100" height="100" />
                    <p>username</p>
                </UserCard>

                <UserCard>
                    <ProfileImage src={imgProfile} alt="image by Carter Baran, via Unsplash" width="100" height="100" />
                    <p>username</p>
                </UserCard>

                <UserCard>
                    <ProfileImage src={imgProfile} alt="image by Carter Baran, via Unsplash" width="100" height="100" />
                    <p>username</p>
                </UserCard>

                <UserCard>
                    <ProfileImage src={imgProfile} alt="image by Carter Baran, via Unsplash" width="100" height="100" />
                    <p>username</p>
                </UserCard>

                <UserCard>
                    <ProfileImage src={imgProfile} alt="image by Carter Baran, via Unsplash" width="100" height="100" />
                    <p>username</p>
                </UserCard>

                <UserCard>
                    <ProfileImage src={imgProfile} alt="image by Carter Baran, via Unsplash" width="100" height="100" />
                    <p>username</p>
                </UserCard>
            </SectionCards>

            

        </SectionFavorite>
    )
}