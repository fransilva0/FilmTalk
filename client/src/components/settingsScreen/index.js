import React,{ useState }  from "react";
import { useRouter } from 'next/router';
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
    transition: background-color border-color 0.3s, color 0.3s;

    &:hover {
        background-color: #c20000;
        border-color: #c20000; 
    }
`;

const ErrorMensage = styled.p`
    font-size: 1rem;
    color: #fff;
    background: #DF2222;
    padding: 1rem;
    margin-top: 1rem;

`;


export function SettingsScreen () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [message, setMessage] = useState('');

    const router = useRouter();
  
  
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
        setMessage('email válido.');
      } else {
        setMessage('Por favor, insira um email válido.');
      }
  
    }

    const handleLogout = () => {

      localStorage.clear();
      router.push('/login');
    
    };


    return (
        <>
          <div>
            <ButtonSection>
              <Button type="submit" onClick={handleLogout}>logout</Button>
            </ButtonSection>
          </div>

        <FormSection>
            <div><Input placeholder="modify username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></div>
            <div><Input placeholder="modify E-mail" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/></div>
            <div><Input placeholder="new password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/></div>
            <div><Input placeholder="confirm new password" type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} /></div>
            <ButtonSection>
                <Button type="submit" onClick={CheckEmptyEntry}>salvar</Button>
            </ButtonSection>
        </FormSection>
        { message && <ErrorMensage>{message}</ErrorMensage>}
        </>
    )
}