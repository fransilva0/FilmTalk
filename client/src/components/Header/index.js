import styled from 'styled-components';
import { ButtonLogin } from "../Button"

import Link from 'next/link';


const CommonStyling = styled.header`
  padding: 2rem;
  background: linear-gradient(90deg, #B84032, #535564);

  h1 {
    color: #FFF8F8;
    font-size: 2rem;
  }

`;

const HeaderHomeStyled = styled(CommonStyling)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
`;

const HeaderLoginLogoutStyled = styled(CommonStyling)`
    display: flex;
    justify-content: center;
`;

export function HeaderHome() {
  return (
    <>
      <HeaderHomeStyled>
        <h1>FilmTalk</h1>
        <Link href="/login">
          <ButtonLogin />
        </Link>
      </HeaderHomeStyled>
    </>
  )
}

export function HeaderLoginLogout() {
  return (
    <>
      <HeaderLoginLogoutStyled>
        <h1>FilmTalk</h1>
      </HeaderLoginLogoutStyled>
    </>
  )
}

export function MainHeader({children}) {
  return (
    <>
      <HeaderHomeStyled>
        <h1>FilmTalk</h1>
        {children}
      </HeaderHomeStyled>
    </>
  )
}