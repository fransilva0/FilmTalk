import styled from 'styled-components';

export const Input = styled.input`
    color: #535564;
    border: 2px solid #535564;
    border-radius: 0.5rem;
    outline: 0;
    background: #DFE2E7;
    margin: 0.5rem 0 0.5rem 0;
    padding: 0.5rem;
    width: 100%;

    @media (min-width: 1025px) {
      width: 25rem;
  }

`;

export const InputPost = styled.textarea`
    color: #535564;
    border-radius: 0.5rem;
    outline: 0;
    border: none;
    background: transparent;
    box-shadow: 10px 10px 15px rgba(184, 64, 50, 0.5);
    margin: 0.5rem 0 0.5rem 0;
    padding: 0.5rem;
    width: 100%;
    height: 10rem;
    resize: none;

    &::placeholder {
        position: absolute;
        top: 10px;
    }

    @media (min-width: 1025px) {
        width: 50rem;
    }

`;

export const InputTitle = styled(Input)`

    border: none;
    background: transparent;
    box-shadow: 10px 10px 15px rgba(184, 64, 50, 0.5);

    @media (min-width: 1025px) {
        width: 50rem;
    }
`;