import {ButtonloginStyled, ButtonregisterStyled, Button} from "./style"

export function ButtonLogin() {
  return (
    <ButtonloginStyled>Login</ButtonloginStyled>
  )
}

export function ButtonRegister() {
  return (
    <ButtonregisterStyled>Inscreva-se</ButtonregisterStyled>
  )
}

export function DefaultButton({type, onClick, text}) {
  return (
    <Button type={type} onClick={onClick}>{text}</Button>
  )
}