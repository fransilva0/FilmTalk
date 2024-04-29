import React, {useState} from "react";
import { useRouter } from 'next/router';
import { HeaderLoginLogout } from "../components/Header"
import { DefaultButton } from "../components/Button"
import { InputUserForm } from "../components/Input"
import styled from 'styled-components';
import axios from 'axios';

const FormSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin: 4rem 2rem 0 2rem;


    h2 {
      color: #535564;
      margin-bottom: 0.5rem;
    }

`;

const Input = styled.input`
    color: #535564;
    border: 2px solid #535564;
    border-radius: 0.5rem;
    outline: 0;
    background: #DFE2E7;
    margin: 0.5rem 0 0.5rem 0;
    padding: 0.5rem;
    width: 100%;

    @media (min-width: 1025px) {
        width: 50rem;
    }

`;

const ButtonSection = styled.section`

    display: flex;
    justify-content: right;

    @media (min-width: 1025px) {
      width: 82rem;
  }
`;

const ErrorMensage = styled.p`
    font-size: 1rem;
    color: #fff;
    background: #535564;
    padding: 1rem;
    margin-top: 1rem;

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
      <FormSection>
        <h2>Login</h2>
        <div><InputUserForm placeholder="user name" type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></div>
        <div><InputUserForm placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
        <ButtonSection>
          <DefaultButton type="submit" onClick={CheckEmptyEntry} text="Entrar" />
        </ButtonSection>
      </FormSection>
      { message && <ErrorMensage>{message}</ErrorMensage>}
    </>
  )
}
