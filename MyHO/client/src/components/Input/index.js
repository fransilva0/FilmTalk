import styled from 'styled-components';

const InputStyled = styled.input`
    color: #FFFFFF;
    border: 2px solid #9F9F9F;
    border-radius: 0.5rem;
    outline: 0;
    background: #181818;
    margin: 0.5rem 0 0.5rem 0;
    padding: 0.5rem;

`;

export function Input({ placeholder, type }) {
  return (
    <InputStyled placeholder={placeholder} type={type} />
  )
}
