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

    &:hover {
      background: transparent;

    }
`;

const ButtonregisterStyled = styled(CommonStyling)`
    background: #DF2222;
    border-radius: 0.5rem;
    border: 4px solid #DF2222;
    color: #000;
    font-weight: bold;

    &:hover {
      background: transparent;
      color: #fff;
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
