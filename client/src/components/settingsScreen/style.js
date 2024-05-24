import styled from 'styled-components';

export const FormSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 1rem 2rem 0 2rem;
    align-items: flex-start;
    


    p {
      color: #535564;
      text-align: justify;
    }

    @media (min-width: 1025px) {
      width: 25rem;
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

export const TitleSection = styled.h2`
  
  border-bottom: 1px solid #535564;
  color: #535564;
  padding-bottom: 0.5rem;
  margin-top: 2rem;
  font-size: 1rem;

`;

export const ConfigContainer = styled.section`

  display: flex;
  flex-direction: column;

  @media (min-width: 1025px) {
    flex-direction: row;
    justify-content: space-around;
  }

`;

export const ConfigSection = styled.div`

  box-shadow: 10px 10px 15px rgba(184, 64, 50, 0.5);
  padding: 1rem;
  margin: 1rem;

`;

export const ConfirmPopup = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%; 
    height: 100%; 


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

export const ButtonIcon = styled.button`

    color: #535564;
    background: transparent;
    border: none;
    margin: 2rem 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-text: center;
    cursor: pointer;

    div {
        width: 100%;
    }


`;