import styled from 'styled-components';
import Image from 'next/image';


export const ProfileSection = styled.section`

display: flex;
justify-content: space-between;
align-items: center;

div {
    margin-right: 0.5rem;

    p {
        color: #fff;
        text-align: right;
    }
}



`;

export const ImageStyle = styled(Image)`

    border-radius: 5rem;

`;

export const Section = styled.section`

    div {
        padding: 1rem;
    }

@media (min-width: 1025px) {

    display: flex;
    justify-content: space-between;

    div {
        width: 100%;
        margin: 0.5rem;
        
    }

}

`;

export const TitlePost = styled.h1`

    border-bottom: 1px solid #535564;
    color: #535564;
    padding-bottom: 1rem;
    font-size: 1.5rem;
    text-align: center;

`;

export const TitleComments = styled.h2`

    border-bottom: 1px solid #535564;
    color: #535564;
    padding-bottom: 1rem;
    font-size: 1rem;

`;

export const TextPost = styled.p`

    color: #535564;
    padding: 1rem 0 1rem 0;
    width: 90%;

`;

export const FormSection = styled.section`

    h2 {
      color: #535564;
      margin-bottom: 0.5rem;
    }

    div {
        padding: 0;
    }

`;


export const InputPost = styled.textarea`
    color: #535564;
    border: 2px solid #535564;
    border-radius: 0.5rem;
    outline: 0;
    background: #DFE2E7;
    margin: 1rem 0 1rem 0;
    padding: 0.5rem;
    width: 100%;
    height: 5rem;
    resize: none;

    &::placeholder {
        position: absolute;
        top: 10px;
    }

        @media (min-width: 1025px) {
            width: 55rem;
        }

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


export const PostSettings = styled.div`

    button {
        background: transparent;
        border: none;
        cursor: pointer;
        transition: transform 0.2s;

    &:hover {
        transform: scale(1.10);
        }
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

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.7rem;

    p {
        margin: 0.5rem;
        margin-top: 0;
    }

    @media (min-width: 1025px) {
        font-size: 1rem;
    }

`;

export const CommentSection = styled.section`

    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 80vh;
    overflow-x: hidden;
    padding: 1rem;

    &::-webkit-scrollbar {
        display: none; 
    }

    -ms-overflow-style: none;  
    scrollbar-width: none;

`;

export const Comment = styled.div`

background: transparent;
padding: 1rem;
display: flex;
flex-direction: column;
width: 100%;
margin-top: 2rem; 
box-shadow: -3px 3px 4px rgba(0, 0, 0, 0.25);


`;

export const ProfileImage = styled(Image)`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-right: 0.5rem;
`;

export const ProfilePostSection = styled.section`

    display: flex;
    align-items: center;
    margin-bottom: 1rem;

`;

export const FooterComment = styled.div`

margin-top: 10px;
display: flex;
align-items: center;
color: #535564;
font-size: 0.8rem;
justify-content: left;

p {
    padding-right: 0.5rem;
}

button {
    font-size: 0.8rem;
    margin: 0;
    margin-right: 0.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
}

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