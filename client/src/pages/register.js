import React,{ useState, useEffect }  from "react"
import { useRouter } from 'next/router';
import { HeaderLoginLogout } from "../components/Header"
import { DefaultButton } from "../components/Button"
import { InputUserForm } from "../components/Input"
import { ErrorMessage } from "../components/ErrorMessage"
import styled from 'styled-components';
import axios from 'axios';

const FormSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 4rem 2rem 0 2rem;
    align-items: flex-start;
    


    h2 {
      color: #535564;
      margin-bottom: 0.5rem;
    }

    @media (min-width: 1025px) {
      widtht: auto;
    }

`;

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const ButtonSection = styled.section`

    display: flex;
    flex-direction: column;
    align-self: stretch;
    width: 50%;

    @media (min-width: 1025px) {
   
      justify-content: left;
      flex-direction: row;
      
  }
`;
  
export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [message, setMessage] = useState('');

  const router = useRouter();

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsValidEmail(isValid);
  }, [email]);


  const CheckEmptyEntry = () => {
    if (username.trim() === '' || email.trim() === '' || password.trim() === '' || repeatPassword.trim() === '') {
      setMessage('existem campos vazios');
    } else {
      setMessage('')
      CheckPassword();
    }
  }

  const CheckPassword = () => {
    if (password == repeatPassword && password.length >= 8 && password != username) {
      setMessage('')
      CheckEmail();
    } else {
      setMessage('Os campos de senha precisam ser iguais, terem no mínimo 8 caracteres e não serem iguais ao username');
    }
  }

  const CheckEmail = () => {

    if (isValidEmail) {
      setMessage('')
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

    axios.post('http://127.0.0.1:8080/users', userDataJson)
      .then((response) => {
        setUsername('');
        setEmail('');
        setPassword('');
        setRepeatPassword('');

        router.push('/login');
        
      })
      .catch((error) => {
        if ((error.response && error.response.status === 409)) {

          setMessage(error.response.data.error_message)

        } else {

          setMessage('Erro ao enviar os dados, tente novamente dentro de alguns minutos');

        }
      });

  }

  

  return (
    <>
      <HeaderLoginLogout />
      <Container>
        <FormSection>
          <h2>Registre-se</h2>
          <div><InputUserForm placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></div>
          <div><InputUserForm placeholder="E-mail" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/></div>
          <div><InputUserForm placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/></div>
          <div><InputUserForm placeholder="repeat password" type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} /></div>
          <ButtonSection>
            
            <DefaultButton type="submit" onClick={CheckEmptyEntry} text="Inscrever-se" />
            { message && <ErrorMessage>{message}</ErrorMessage>}

          </ButtonSection>
        </FormSection>
      </Container>
    </>
  )
}
