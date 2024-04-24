import React,{ useState, useEffect }  from "react";
import { useRouter } from 'next/router';
import axios from 'axios';
import Modal from 'react-modal';
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

const InputPostEdit = styled(InputPost)`
        height: 20rem;

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

const DeletePostPopup = styled.section`
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

const ButtonIcon = styled.button`

    color: #fff;
    background: transparent;
    border: none;
    margin: 2rem 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    @media (min-width: 1025px) {
        margin: 2rem 2rem 0;
    }

`;

export default function PostPreview() {
    const [title, setTitle] = useState('');
    const [publication, setPublication] = useState('');
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [listPublications, setListPublications] = useState([]);
    const [editPublication, setEditPublication] = useState(false);


    const router = useRouter();

    const { UserPost } = router.query
    const post = listPublications.find(publication => publication.id == UserPost);

    const CheckEmptyEntry = () => {
        if (editPublication) {
            if (title.trim() === '' || publication.trim() === '') {
                setMessage('existem campos vazios');
              } else {
                  setMessage('')
            }
        } else {
            if (comment.trim() === '') {
                setMessage('comentário não pode ser vazio');
              } else {
                  setMessage('')
            }
        }
        
      }

      const openModal = () => {
        setModalIsOpen(true);
      }

      const closeModal = () => {
        setModalIsOpen(false);
      }
      
      const handleConfirm = () => {
       
        console.log("lógica de enviar os dados pro back aqui")

        closeModal(); 
      }

      const CheckPublications = (access_token) => {

        axios.get('http://127.0.0.1:8080/posts', {
            headers: {
              'Authorization': `Bearer ${access_token}`
            }
          })
        .then(response => {

            setListPublications(response.data.requested_data);

            const GetPost = response.data.requested_data.find(publication => publication.id == UserPost);

            setTitle(GetPost.title)
            setPublication(GetPost.publication)

         })
      .catch(error => {

        console.log(error.response.data.error_message)

      });
    }

      useEffect(() => {

        const loggedInUser = localStorage.getItem("user");

        if (loggedInUser) {

          const foundUser = JSON.parse(loggedInUser);

          setUser(foundUser);
          CheckPublications(foundUser.token);
          

        } else {
            
            router.push('/login');
            
          }
          
      }, []);

      if (!user) {

        return null;
    }
      
    if (post) {
    return (
        <>
            <MainHeader>

                <ProfileSection>
                    <div>
                        <p>{user && user.username}</p>
                    </div>
                    <Image src={imgProfile} alt="image by Carter Baran, via Unsplash" width="61" height="61" />
                </ProfileSection>

            </MainHeader>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Confirmação de exclusão" 
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)'
                    },
                    content: {
                        width: '50%', 
                        height: '50%', 
                        margin: 'auto',
                        backgroundColor: '#181818', 
                        color: '#fff',
                        border: 'none'
                    
                    }
            }}>

                <DeletePostPopup>
                    <h2>Tem certeza que deseja excluir esta publicação?</h2>
                    <div>
                        <ButtonIcon onClick={handleConfirm}>
                            <div>
                                <Icon icon="line-md:circle-to-confirm-circle-twotone-transition" style={{ color: '#fff', fontSize: '2rem', margin: "0", padding: "0" }} />
                            </div>
                            <div>
                                Confirmar
                            </div>
                        </ButtonIcon>
                        <ButtonIcon onClick={closeModal}>
                            <div>
                                <Icon icon="ic:twotone-cancel" style={{ color: '#fff', fontSize: '2rem', margin: "0", padding: "0" }} />
                            </div>
                            <div>
                                Cancelar
                            </div>
                        </ButtonIcon>
                    </div>
                    
                </DeletePostPopup>

            </Modal>
            <Section>
                <>
                <div>

                    { 
                        editPublication ? (                            
                            <FormSection>
                                <div><Input placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
                                <div><InputPostEdit editPublication={editPublication} placeholder="Post" type="text" value={publication} onChange={(e) => setPublication(e.target.value)} /></div>
                                <ButtonSection>
                                    <ButtonIcon type="submit" onClick={CheckEmptyEntry}>
                                        <div>
                                            <Icon icon="line-md:circle-to-confirm-circle-twotone-transition" style={{ color: '#fff', fontSize: '2rem', margin: "0", padding: "0" }} />
                                        </div>
                                        <div>
                                            Confirmar
                                        </div>
                                    </ButtonIcon>
                                    <ButtonIcon onClick={() => {setEditPublication(false)}}>
                                        <div>
                                            <Icon icon="ic:twotone-cancel" style={{ color: '#fff', fontSize: '2rem', margin: "0", padding: "0" }} />
                                        </div>
                                        <div>
                                            Cancelar
                                        </div>
                                    </ButtonIcon>
                                </ButtonSection>
                                { message && <ErrorMensage>{message}</ErrorMensage>}
                            </FormSection>
                          ) : (
                            <>
                                <TitlePost>{post.title}</TitlePost>

                                <TextPost>{post.publication}</TextPost>

                                <PostSettings>
                                    <button onClick={() => {setEditPublication(true)}}>
                                        <Icon icon="tabler:edit" style={{ color: '#fff', fontSize: '2rem', marginRight: "1rem", padding: "0" }} />
                                    </button>
                                    <button onClick={openModal}>
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

                            </>
                          )
                    }         

                </div>

                <div>

                    <TitleComments>Comentários</TitleComments>

                </div>
            </>     
            </Section>

        </>
    ) } else {
        return (
            <MainHeader>

                <ProfileSection>
                    <div>
                        <p>{user && user.username}</p>
                        <p>0 posts</p>
                    </div>
                    <Image src={imgProfile} alt="image by Carter Baran, via Unsplash" width="61" height="61" />
                </ProfileSection>

            </MainHeader>

        )
    }
    
}