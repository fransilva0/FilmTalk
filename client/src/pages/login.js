import React, {useState} from "react";
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

    @media (min-width: 1025px) {
   
      justify-content: left;
      flex-direction: row;
      
  }
`;


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const router = useRouter();


  const CheckEmptyEntry = () => {
    if (username.trim() === '' || password.trim() === '' ) {
      setMessage('existem campos vazios');
    } else {
      DataJSON();
    }
  }

  const DataJSON = () => {

    const userDataJson = {
      username: username,
      password: password
    };

    axios.post('http://127.0.0.1:8080/users/login', userDataJson)
      .then((response) => {
        setUsername('');
        setPassword('');

        const userData = {
          username: response.data.requested_data.username,
          email: response.data.requested_data.email,
          token: response.data.token,
        };

        localStorage.setItem('user', JSON.stringify(userData))

        router.push('/home');
        
      })
      .catch((error) => {
        if ((error.response)) {

          setMessage(error.response.data.error_message)

        }
      });

  }

  return (
    <>
      <HeaderLoginLogout />
      <Container>
        <FormSection>
          <h2>Login</h2>
          <div><InputUserForm placeholder="user name" type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></div>
          <div><InputUserForm placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
          <ButtonSection>
            <DefaultButton type="submit" onClick={CheckEmptyEntry} text="Entrar" />
            { message && <ErrorMessage>{message}</ErrorMessage>}
          </ButtonSection>
        </FormSection>
      </Container>
    </>
  )
}
