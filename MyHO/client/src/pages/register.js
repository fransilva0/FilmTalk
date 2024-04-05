import React,{ useState }  from "react"
import { HeaderLoginLogout } from "../components/Header"
import styled from 'styled-components';
import axios from 'axios';

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

const Input = styled.input`
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

const Button = styled(ButtonregisterStyled)`
    color: #fff;

    &:hover {
      background: transparent;
      color: #fff;
    }
`;

const ErrorMensage = styled.p`
    font-size: 1rem;
    color: #fff;
    background: #DF2222;
    padding: 1rem;
    margin-top: 1rem;

`;
  
export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [message, setMessage] = useState('');


  const CheckEmptyEntry = () => {
    if (username.trim() === '' || email.trim() === '' || password.trim() === '' || repeatPassword.trim() === '') {
      setMessage('existem campos vazios');
    } else {
      CheckPassword();
    }
  }

  const CheckPassword = () => {
    if (password == repeatPassword) {
      CheckEmail();
    } else {
      setMessage('Os campos de senha precisam ser iguais');
    }
  }

  const CheckEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsValidEmail(isValid);

    if (isValidEmail) {
      DataJSON();
    } else {
      setMessage('Por favor, insira um email válido.');
    }

  }

  const DataJSON = () => {

    const userDataJson = {
      username: username,
      email: email,
      password: password
    };

    axios.post('URL_DO_BACKEND', userDataJson)
      .then((response) => {
        console.log('Dados do usuário enviados com sucesso:', response.data);
        // Se necessário, faça algo com a resposta do backend aqui
      })
      .catch((error) => {
        console.error('Erro ao enviar os dados do usuário:', error);
      });

  }

  

  return (
    <>
      <HeaderLoginLogout />
      <FormSection>
        <h2>Registre-se</h2>
        <Input placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input placeholder="E-mail" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Input placeholder="repeat password" type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
        <ButtonSection>
          <Button type="submit" onClick={CheckEmptyEntry}>inscrever-se</Button>
        </ButtonSection>
      </FormSection>
      { message && <ErrorMensage>{message}</ErrorMensage>}
    </>
  )
}
