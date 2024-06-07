import { ButtonLogin } from "../Button"
import Link from 'next/link';
import {HeaderHomeStyled, HeaderLoginLogoutStyled} from "./style"

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