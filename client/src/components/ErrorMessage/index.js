import styled from 'styled-components';

const ErrorMessageStyled = styled.p`
    font-size: 1rem;
    color: #B84032 !important;
    padding-left: 1rem;
    margin-top: 1rem;

`;

export function ErrorMessage({children}) {
    return (
      <>
        <ErrorMessageStyled>{children}</ErrorMessageStyled>
      </>
    )
  }