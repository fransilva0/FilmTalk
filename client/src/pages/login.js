import React, {useState} from "react";
import { useRouter } from 'next/router';
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
          username: response.data.parameter.username,
          email: response.data.parameter.email,
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
        <div><Input placeholder="user name" type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></div>
        <div><Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
        <ButtonSection>
          <Button type="submit" onClick={CheckEmptyEntry}>entrar</Button>
        </ButtonSection>
      </FormSection>
      { message && <ErrorMensage>{message}</ErrorMensage>}
    </>
  )
}
