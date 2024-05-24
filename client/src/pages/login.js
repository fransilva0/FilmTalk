import React, {useState} from "react";
import { useRouter } from 'next/router';
import { HeaderLoginLogout } from "../components/Header"
import { DefaultButton } from "../components/Button"
import { InputUserForm } from "../components/Input"
import { ErrorMessage } from "../components/ErrorMessage"
import axios from 'axios';
import { FormSection, Container, ButtonSection} from "../styles/loginStyled"

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
