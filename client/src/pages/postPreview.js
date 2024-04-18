import React,{ useState }  from "react"
import Image from 'next/image';
import styled from 'styled-components';
import imgProfile from "../assets/img-profile.jpg";
import { MainHeader } from "../components/Header";
import { Icon } from '@iconify/react';

const ProfileSection = styled.section`

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

img  {
    border-radius: 5rem;
}

`;

const Section = styled.section`

    div {
        padding: 1rem;
    }

@media (min-width: 1025px) {

    display: flex;
    justify-content: space-between;

    div {
        width: 50%;
        margin: 0.5rem;
        
    }

}

`;

const TitlePost = styled.h1`

    border-bottom: 1px solid #DF2222;
    color: #fff;
    padding-bottom: 1rem;
    font-size: 1.5rem;
    text-align: center;

`;

const TitleComments = styled.h2`

    border-bottom: 1px solid #DF2222;
    color: #fff;
    padding-bottom: 1rem;
    font-size: 1rem;

`;

const TextPost = styled.p`

    color: #fff;
    padding: 1rem 0 1rem 0;
    width: 90%;

`;

const FormSection = styled.section`

    h2 {
      color: #fff;
      margin-bottom: 0.5rem;
    }

    div {
        padding: 0;
    }

`;

const InputPost = styled.textarea`
    color: #FFFFFF;
    border: 2px solid #9F9F9F;
    border-radius: 0.5rem;
    outline: 0;
    background: #181818;
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

const ButtonSection = styled.section`

    display: flex;
    justify-content: right;
`;

const Button = styled.button`
    font-size: 1rem;
    line-height: center;
    padding: 0.5rem 2rem 0.5rem 2rem;
    cursor: pointer;
    color: #fff;
    background: #DF2222;
    border-radius: 0.5rem;
    border: 4px solid #DF2222;
    font-weight: bold;
    transition: background-color border-color 0.3s, color 0.3s;

    &:hover {
        background-color: #c20000;
        border-color: #c20000; 
        color: #eee;
    }

`;

const ErrorMensage = styled.p`
    font-size: 1rem;
    color: #fff;
    background: #DF2222;
    padding: 1rem;
    margin-top: 1rem;

`;

const PostSettings = styled.div`

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

export default function PostPreview() {

    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');

    const CheckEmptyEntry = () => {
        if (comment.trim() === '') {
          setMessage('existem campos vazios');
        } else {
            setMessage('')
        }
      }

    return (
        <>
            <MainHeader>

                <ProfileSection>
                    <div>
                        <p>Username</p>
                        <p>0 posts</p>
                    </div>
                    <Image src={imgProfile} alt="image by Carter Baran, via Unsplash" width="61" height="61" />
                </ProfileSection>

            </MainHeader>

            <Section>

                <div>

                    <TitlePost>Título da Postagem</TitlePost>

                    <TextPost>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tristique ullamcorper felis, sed congue lacus vestibulum pellentesque.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tristique ullamcorper felis, sed congue lacus vestibulum pellentesque.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tristique ullamcorper felis, sed congue lacus vestibulum pellentesque.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tristique ullamcorper felis, sed congue lacus vestibulum pellentesque.
                    </TextPost>

                    <PostSettings>
                        <button>
                            <Icon icon="tabler:edit" style={{ color: '#fff', fontSize: '2rem', marginRight: "1rem", padding: "0" }} />
                        </button>
                        <button>
                            <Icon icon="fluent:delete-16-filled" style={{ color: '#fff', fontSize: '2rem', margin: "0", padding: "0" }} />
                        </button>
                    </PostSettings>

                    <TitleComments>Seu Comentário</TitleComments>

                    <FormSection>

                        <div><InputPost placeholder="Comment" type="text" value={comment} onChange={(e) => setComment(e.target.value)} /></div>
                        <ButtonSection>
                            <Button type="submit" onClick={CheckEmptyEntry}>Publicar</Button>
                        </ButtonSection>

                        { message && <ErrorMensage>{message}</ErrorMensage>}

                    </FormSection>

                </div>

                <div>

                    <TitleComments>Comentários</TitleComments>

                </div>
            </Section>



        </>
    )
    
}