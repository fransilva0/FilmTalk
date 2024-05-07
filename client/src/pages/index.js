import React, { useEffect, useState } from "react"
import { HeaderHome } from "../components/Header"
import { ButtonRegister } from "../components/Button"
import styled from 'styled-components';
import { Icon } from '@iconify/react';

import Link from 'next/link';


const PresentationSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: left;
    margin: 0 2rem 0 2rem;

    p {
      color: #535564;
    }

    @media (min-width: 1025px) {
      justify-content: center;
      margin-top: 4rem;

    }

`;

const ButtonSection = styled.section`

    margin-top: 0.5rem;

`;

const Container = styled.div`

  display: flex;
  justify-content: center;

@media (min-width: 1025px) {
  align-items: center;
  margin-top: 2rem;
}
  
`;

const StyledIcon = styled(Icon)`
  color: #B84032;
  font-size: 20rem;
  margin: 0;
  padding: 0;
  

  @media (min-width: 1025px) {

    font-size: 30rem;
  
  }

`;




function index() {
  return <>
    <HeaderHome />
    <Container>
      <StyledIcon icon="maki:cinema" />
    </Container>
    <PresentationSection>
      <h1>BEM VINDO AO FILMTALK</h1>
      <br />
      <p>Discuta sobre o seus filmes favoritos.</p>
      <p>Acompanhe suas discussões e interaja com a comunidade.</p>
      <ButtonSection>
      <Link href="/register">
        <ButtonRegister />
      </Link>
    </ButtonSection>
    </PresentationSection>
    
  </>
}

export default index
