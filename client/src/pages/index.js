import React from "react"
import { HeaderHome } from "../components/Header"
import { ButtonRegister } from "../components/Button"
import Link from 'next/link';
import { PresentationSection, ButtonSection, Container, StyledIcon } from "../styles/indexStyled"

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
