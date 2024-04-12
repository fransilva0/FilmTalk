import React,{ useState }  from "react"
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

const InputPost = styled.textarea`
    color: #FFFFFF;
    border: 2px solid #9F9F9F;
    border-radius: 0.5rem;
    outline: 0;
    background: #181818;
    margin: 0.5rem 0 0.5rem 0;
    padding: 0.5rem;
    width: 100%;
    height: 10rem;

    &::placeholder {
        position: absolute;
        top: 10px;
    }

    @media (min-width: 1025px) {
        width: 50rem;
    }

`;

const ButtonSection = styled.section`

    display: flex;
    justify-content: right;
    margin-top: 1rem;

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

    &:hover {
      background: transparent;
      color: #fff;
    }

`;

const ErrorMensage = styled.p`
    font-size: 1rem;
    color: #fff;
    background: #DF2222;
    padding: 1rem;
    margin-top: 1rem;

`;

export function UserPosts () {
    const [title, setTitle] = useState('');
    const [post, setPost] = useState('');
    const [message, setMessage] = useState('');

    const CheckEmptyEntry = () => {
        if (title.trim() === '' || post.trim() === '') {
          setMessage('existem campos vazios');
        } else {
            setMessage('')
        }
      }

    return (
        <>
            <FormSection>
                <div><Input placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
                <div><InputPost placeholder="Post" type="text" value={post} onChange={(e) => setPost(e.target.value)} /></div>
                <ButtonSection>
                    <Button type="submit" onClick={CheckEmptyEntry}>Publicar uma postagem</Button>
                </ButtonSection>
                
            </FormSection>
            { message && <ErrorMensage>{message}</ErrorMensage>}
        </>
    )
}