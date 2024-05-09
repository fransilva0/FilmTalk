import React,{ useState, useEffect }  from "react";
import { useRouter } from 'next/router';
import axios from 'axios';
import styled from 'styled-components';
import { DefaultButton } from "../Button"
import { InputUserForm } from "../Input"
import { ErrorMessage } from "../ErrorMessage"

const FormSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 4rem 2rem 0 2rem;
    align-items: flex-start;
    


    p {
      color: #535564;
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


export function SettingsScreen ({setScreen}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState();

    const router = useRouter()


    const UpdateUserData = (field, value) => {
      const userDataJson = {
        [field]: value
      };
    
      axios.patch('http://127.0.0.1:8080/users', userDataJson, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
        .then(() => {
          if ([field] != "password") {

            const user = JSON.parse(localStorage.getItem('user'))
            user[field] = value;
            localStorage.setItem('user', JSON.stringify(user));
            
          }
    
          router.reload();
        })
        .catch((error) => {
          if ((error.response)) {
            setMessage(error.response.data.error_message)
          }
        });
    }
  
  
    const CheckUsername= () => {
      if (username.trim() === '') {
        setMessage('o username não pode ser vazio');
      } else {
        setMessage('')
        UpdateUserData("username", username);
      }
    }
  
    const CheckPassword = () => {
    
      if (password.trim() === '' || repeatPassword.trim() === '') {

        setMessage('Os campos de senha não podem ser vazios');
        
      } else if (password == repeatPassword ) {

        setMessage('')
        UpdateUserData("password", password);
        
      } else {
        setMessage('Os campos de senha precisam ser iguais');
      }
    }
  
    const CheckEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(email);
      
      if (isValid) {
        setMessage('');
        UpdateUserData("email", email);
      } else {
        setMessage('Por favor, insira um email válido.');
      }
  
    }

    useEffect(() => {

      const loggedInUser = localStorage.getItem("user");

      if (loggedInUser) {

        const foundUser = JSON.parse(loggedInUser);

        setUser(foundUser);

      } else {
          
          router.push('/login');
          
        }
    }, []);


    return (
      <>
        <Container>

        <FormSection>
            <p>{user && user.username}</p>
            <div><InputUserForm placeholder="modify username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></div>
            <ButtonSection>
                <DefaultButton type="submit" onClick={CheckUsername} text="Salvar" />
            </ButtonSection>
        </FormSection>
        </Container>

        <Container>
        <FormSection>
            <p>{user && user.email}</p>
            <div><InputUserForm placeholder="modify E-mail" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/></div>
            <ButtonSection>
                <DefaultButton type="submit" onClick={CheckEmail} text="Salvar" />
            </ButtonSection>
        </FormSection>
        </Container>
        
        <Container>
        <FormSection>
            <div><InputUserForm placeholder="new password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/></div>
            <div><InputUserForm placeholder="confirm new password" type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} /></div>
            <ButtonSection>
                <DefaultButton type="submit" onClick={CheckPassword} text="Salvar" />
            </ButtonSection>
        </FormSection>

        </Container>

        <Container> { message && <ErrorMessage>{message}</ErrorMessage>} </Container>
        
      </>
    )
}