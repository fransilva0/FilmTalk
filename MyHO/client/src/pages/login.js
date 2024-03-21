import React from "react"
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

const ButtonSection = styled.section`

    display: flex;
    justify-content: right;
`;

export default function Login() {
  return (
    <>
      <HeaderLoginLogout />
      <FormSection>
        <h2>Login</h2>
        <Input placeholder="user name" type="text" />
        <Input placeholder="password" type="password" />
        <ButtonSection>
          <DefaultButton text="entrar"/>
        </ButtonSection>
      </FormSection>

    </>
  )
}
