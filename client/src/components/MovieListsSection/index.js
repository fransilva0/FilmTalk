import React,{ useState, useEffect }  from "react";
import axios from 'axios';
import imgMovie from "../../assets/example-movie.jpg";
import {MovieSection, SectionCards, MovieCard, MovieImage} from "./style"

export function MovieListsSection({ hideOnMobile, hideBoxShadow, hideTitleSection, expandHeight, TitleSection }) {

    const handleScroll = (event) => {
        const element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            {/*if(offset != null) {
                CheckComments(access_token)
            }*/}
        }
    };


    return (
        <MovieSection hideOnMobile={hideOnMobile} hideTitleSection={hideTitleSection} TitleSection={TitleSection}>
            <h2>{TitleSection}</h2>

            <SectionCards onScroll={handleScroll} expandHeight={expandHeight} >
                <MovieCard>
                    <MovieImage src={imgMovie} alt="image by Carter Baran, via Unsplash" width="100" height="100" />
                </MovieCard>

                <MovieCard>
                    <MovieImage src={imgMovie} alt="image by Carter Baran, via Unsplash" width="100" height="100" />
                </MovieCard>

                <MovieCard>
                    <MovieImage src={imgMovie} alt="image by Carter Baran, via Unsplash" width="100" height="100" />
                </MovieCard>

                <MovieCard>
                    <MovieImage src={imgMovie} alt="image by Carter Baran, via Unsplash" width="100" height="100" />
                </MovieCard>

                <MovieCard>
                    <MovieImage src={imgMovie} alt="image by Carter Baran, via Unsplash" width="100" height="100" />
                </MovieCard>

                <MovieCard>
                    <MovieImage src={imgMovie} alt="image by Carter Baran, via Unsplash" width="100" height="100" />
                </MovieCard>

                <MovieCard>
                    <MovieImage src={imgMovie} alt="image by Carter Baran, via Unsplash" width="100" height="100" />
                </MovieCard>

                <MovieCard>
                    <MovieImage src={imgMovie} alt="image by Carter Baran, via Unsplash" width="100" height="100" />
                </MovieCard>

                <MovieCard>
                    <MovieImage src={imgMovie} alt="image by Carter Baran, via Unsplash" width="100" height="100" />
                </MovieCard>

                <MovieCard>
                    <MovieImage src={imgMovie} alt="image by Carter Baran, via Unsplash" width="100" height="100" />
                </MovieCard>
            </SectionCards>

            

        </MovieSection>
    )
}