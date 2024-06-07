import styled from 'styled-components';

export const GeneralDiv = styled.div`
    @media (min-width: 1025px) {
        display: flex;
        justify-content: space-between;
    }

`;

export const FormSection = styled.section`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 4rem 2rem 0 2rem;
`;

export const ButtonSection = styled.section`

    display: flex;
    flex-direction: column;
    margin-top: 1rem;

    @media (min-width: 1025px) {
   
        justify-content: left;
        flex-direction: row;
        
    }
`;

export const PublicationsSection = styled.section`

    padding: 1rem;
    padding-top: 4rem;

    max-height: 80vh;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      display: none; 
  }

  -ms-overflow-style: none;  
  scrollbar-width: none;

    h2 {
        border-bottom: 1px solid #535564;
        color: #535564;
        padding-bottom: 1rem;
        font-size: 1rem;
    }

    @media (min-width: 1025px) {

        width: 40%;
        
    }

`;

export const Publication = styled.div`

    background: transparent;
    padding: 2rem;
    margin-top: 2rem; 
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.25);
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.25);

    button {
        color: #535564;
        font-size: 1.3rem;
        background: transparent;
        border: none;
        text-align: left;
        cursor: pointer;
    }

`;

export const CommentSection = styled.div`
    margin-top: 10px;
    display: flex;
    color: #535564;
    font-size: 0.8rem;
    justify-content: right;

    p {
        padding-right: 0.5rem;
    }


`;

export const Container = styled.div`
    display: flex;
    justify-content: center;
`;

export const Spinner = styled.span`

width: 48px;
height: 48px;
border: 5px solid #DF8271;
border-bottom-color: transparent;
border-radius: 50%;
display: inline-block;
box-sizing: border-box;
animation: rotation 1s linear infinite;
margin: 1rem;

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
    
`;