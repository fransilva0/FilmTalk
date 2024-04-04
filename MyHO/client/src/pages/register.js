import React,{ useState }  from "react"
import { HeaderLoginLogout } from "../components/Header"
import { Input } from "../components/Input"
import { DefaultButton } from "../components/Button"
import styled from 'styled-components';

const FormSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin: 4rem 2rem 0 2rem;


    h2 {
      color: #fff;
      margin-bottom: 0.5rem;
    }

`;

const InputStyled = styled.input`
    color: #FFFFFF;
    border: 2px solid #9F9F9F;
    border-radius: 0.5rem;
    outline: 0;
    background: #181818;
    margin: 0.5rem 0 0.5rem 0;
    padding: 0.5rem;

`;

const ButtonSection = styled.section`

    display: flex;
    justify-content: right;
`;

const CommonStyling = styled.button`
    font-size: 1rem;
    line-height: center;
    padding: 0.5rem 2rem 0.5rem 2rem;
    cursor: pointer;

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
  
export default function Register() {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [mensage, setMensage] = useState('');

  const CheckPassword = () => {
    console.log(password)
    console.log(repeatPassword)
    if (password == repeatPassword) {
      setMensage('As senhas são iguais!');
    } else {
      setMensage('As senhas são diferentes!');
    }
  }

  return (
    <>
      <HeaderLoginLogout />
      <FormSection>
        <h2>Registre-se</h2>
        <InputStyled placeholder="user name" type="text" />
        <InputStyled placeholder="E-mail" type="text" />
        <InputStyled placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <InputStyled placeholder="repeat password" type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
        <ButtonSection>
          <DefaultButtonStyled type="submit" onClick={CheckPassword}>inscrever-se</DefaultButtonStyled>
        </ButtonSection>
      </FormSection>
      <p>{mensage}</p>

    </>
  )
}
