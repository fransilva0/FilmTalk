import React, { useEffect, useState } from "react"
import { HeaderHome } from "../components/Header"
import { ButtonRegister } from "../components/Button"
import styled from 'styled-components';
import { Icon } from '@iconify/react';

import Link from 'next/link';


const PresentationSection = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 2rem 0 2rem;

    p {
      color: #535564;
      margin: 0.5rem;
    }

    @media (min-width: 1025px) {
      justify-content: center;
      margin-top: 4rem;

    }

`;

const ButtonSection = styled.section`

    display: flex;
    justify-content: center;
`;


function index() {
  return <>
    <HeaderHome />
    <PresentationSection>
      <Icon icon="mdi:message-text" style={{ color: '#535564', fontSize: '10rem', margin: "0", padding: "0" }} />
      <p>Discuta sobre o seus filmes favoritos</p>
    </PresentationSection>
    <PresentationSection>
      <p>Acompanhe suas discussões e interaja com a comunidade</p>
      <Icon icon="iconoir:cinema-old" style={{ color: '#535564', fontSize: '10rem', margin: "0", padding: "0"  }} />
    </PresentationSection>
    <ButtonSection>
      <Link href="/register">
        <ButtonRegister />
      </Link>
    </ButtonSection>
  </>
}

export default index
