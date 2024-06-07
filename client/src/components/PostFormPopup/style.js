import styled from 'styled-components';

export const FormSection = styled.section`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 4rem 2rem 0 2rem;
`;

export const ButtonSection = styled.section`

    display: flex;
    flex-direction: column;
    align-self: stretch;
    width: 100%;

    @media (min-width: 1025px) {
   
      justify-content: left;
      flex-direction: row;
      
  }
`;

export const PostPopup = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%; 
    height: 100%;
    margin: auto;

    h2 {
        text-align: center;
    }

    div {
        display: flex;
        justify-content: center;
    }

    @media (min-width: 370px) and (max-width: 768px) {
        
        h2 {
            font-size: 1rem;
        }

        div {
            flex-direction: column;
        }
    }

`;