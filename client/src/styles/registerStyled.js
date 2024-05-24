import styled from 'styled-components';

export const FormSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 4rem 2rem 0 2rem;
    align-items: flex-start;
    


    h2 {
      color: #535564;
      margin-bottom: 0.5rem;
    }

    @media (min-width: 1025px) {
      widtht: auto;
    }

`;

export const Container = styled.div`
    display: flex;
    justify-content: center;
`;

export const ButtonSection = styled.section`

    display: flex;
    flex-direction: column;
    align-self: stretch;

    @media (min-width: 1025px) {
   
      justify-content: left;
      flex-direction: row;
      
  }
`;