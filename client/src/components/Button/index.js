import styled from 'styled-components';

const CommonStyling = styled.button`
    font-size: 1rem;
    line-height: center;
    padding: 0.5rem 2rem 0.5rem 2rem;
    cursor: pointer;

`;

const ButtonloginStyled = styled(CommonStyling)`
    background: #040404;
    border-radius: 0.5rem;
    border: 4px solid #040404;
    color: #FFF8F8;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3); /* Sombra mais pronunciada no hover */
    }

    &:focus {
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2); /* Sombra mais suave quando focado */
    }
`;

const ButtonregisterStyled = styled(CommonStyling)`
    background: #DF2222;
    border-radius: 0.5rem;
    border: 4px solid #DF2222;
    color: #000;
    font-weight: bold;
    transition: background-color border-color 0.3s, color 0.3s;

    &:hover {
        background-color: #c20000;
        border-color: #c20000; 
    }
`;

const DefaultButtonStyled = styled(ButtonregisterStyled)`
    color: #fff;

    &:hover {
      background: transparent;
      color: #fff;
    }
`;

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

export function DefaultButton({text}) {
  return (
    <DefaultButtonStyled>{text}</DefaultButtonStyled>
  )
}
