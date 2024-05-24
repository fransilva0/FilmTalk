import React,{ useState, useEffect }  from "react";
import { useRouter } from 'next/router';
import axios from 'axios';
import imgProfile from "../../assets/img-profile.jpg";
import {SectionFavorite, SectionCards, UserCard, ProfileImage, LinkFollow} from "./style"

export function FavoriteUsers({ hideOnMobile, hideBoxShadow, hideTitleSection, expandHeight }) {

    const handleScroll = (event) => {
        const element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            {/*if(offset != null) {
                CheckComments(access_token)
            }*/}
        }
    };


    return (
        <SectionFavorite hideOnMobile={hideOnMobile} hideTitleSection={hideTitleSection}>
            <h2>Para Acompanhar</h2>

            <SectionCards onScroll={handleScroll} hideBoxShadow={hideBoxShadow} expandHeight={expandHeight} >
                <UserCard>
                    <ProfileImage src={imgProfile} alt="image by Carter Baran, via Unsplash" width="100" height="100" />
                    <div>
                        <p>username</p>
                        <LinkFollow>ver perfil</LinkFollow>
                    </div>
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