import React,{ useState, useEffect }  from "react";
import { useRouter } from 'next/router';
import axios from 'axios';
import Modal from 'react-modal';
import Image from 'next/image';
import styled from 'styled-components';
import imgProfile from "../assets/img-profile.jpg";
import { MainHeader } from "../components/Header";
import { DefaultButton } from "../components/Button"
import { ErrorMessage } from "../components/ErrorMessage"
import { InputPublicationTitle, InputPublicationPost, InputUserForm } from "../components/Input"
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



`;

const ImageStyle = styled(Image)`

    border-radius: 5rem;

`;

const Section = styled.section`

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

const TitlePost = styled.h1`

    border-bottom: 1px solid #535564;
    color: #535564;
    padding-bottom: 1rem;
    font-size: 1.5rem;
    text-align: center;

`;

const TitleComments = styled.h2`

    border-bottom: 1px solid #535564;
    color: #535564;
    padding-bottom: 1rem;
    font-size: 1rem;

`;

const TextPost = styled.p`

    color: #535564;
    padding: 1rem 0 1rem 0;
    width: 90%;

`;

const FormSection = styled.section`

    h2 {
      color: #535564;
      margin-bottom: 0.5rem;
    }

    div {
        padding: 0;
    }

`;


const InputPost = styled.textarea`
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

const ButtonSection = styled.section`

    display: flex;
    flex-direction: column;
    align-self: stretch;
    width: 100%;

    @media (min-width: 1025px) {
   
      justify-content: left;
      flex-direction: row;
      
  }
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

const Container = styled.div`
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

const CommentSection = styled.section`

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

const Comment = styled.div`

background: transparent;
padding: 1rem;
display: flex;
flex-direction: column;
width: 100%;
margin-top: 2rem; 
box-shadow: -3px 3px 4px rgba(0, 0, 0, 0.25);


`;

const ProfileImage = styled(Image)`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-right: 0.5rem;
`;

const ProfilePostSection = styled.section`

    display: flex;
    align-items: center;
    margin-bottom: 1rem;

`;

const FooterComment = styled.div`

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

export default function PostPreview() {
    const [title, setTitle] = useState('');
    const [publication, setPublication] = useState('');
    const [saveTitle, setSaveTitle] = useState('');
    const [savePublication, setSavePublication] = useState('');
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [dataPublication, setDataPublication] = useState([]);
    const [editPublication, setEditPublication] = useState(false);
    const [editComment, setEditComment] = useState(false);
    const [deletePublication, setDeletePublication] = useState(false);
    const [deleteComment, setDeleteComment] = useState(false);
    const [messageComment, setMessageComment] = useState('');
    const [textComment, setTextComment] = useState('');




    const router = useRouter();

    const { UserPost } = router.query

    const CheckEmptyEntry = () => {
        if (editPublication) {
            if (title.trim() === '' || publication.trim() === '') {
                setMessage('existem campos vazios');
              } else {
                EditConfirm();
                setEditPublication(false);
            }
        } else if (editComment) { 
            if (textComment.trim() === '') {
                setMessageComment('comentário não pode estar vazio');
              } else {
                setMessageComment("");
                EditCommentConfirm();
                setEditComment(false);
            }
        }else {
            if (comment.trim() === '') {
                setMessage('comentário não pode ser vazio');
              } else {
                  setMessage('')
            }
        }
        
      }

      const EditCommentConfirm = () => {
        {/*lógica de editar comentários aqui*/}
      }

      const EditConfirm = () => {

        const userDataJson = {
            title: title,
            publication: publication
          };
        
        axios.put(`http://127.0.0.1:8080/posts/${UserPost}`, userDataJson, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          })
          .then(() => {

            return
            
          })
          .catch((error) => {

            if ((error.response && error.response.data && error.response.data.error_message)) {
    
              setMessage(error.response.data.error_message)
    
            } else {

                return
    
            }

          });


      }

      const EditCanceled = () => {

        setTitle(saveTitle)
        setPublication(savePublication)

        setEditPublication(false);
      
    }

      const openModal = () => {
        setModalIsOpen(true);
      }

      const closeModal = () => {
        setModalIsOpen(false);
      }
      
      const handleConfirm = () => {
        
        if (deletePublication) {axios.delete(`http://127.0.0.1:8080/posts/${UserPost}`, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          })
          .then(() => {

            closeModal();
            router.push('/home');
            
          })
          .catch((error) => {

            if ((error.response && error.response.data && error.response.data.error_message)) {
    
              setMessage(error.response.data.error_message)
    
            } else {

                return
    
            }

          });} else {
            {/* lógica de deletar comentários aqui */}
          }


      }

      const CheckPublications = (access_token) => {

        axios.get(`http://127.0.0.1:8080/posts/${UserPost}`, {
            headers: {
              'Authorization': `Bearer ${access_token}`
            }
          })
        .then(response => {

            setTitle(response.data.requested_data.title)
            setPublication(response.data.requested_data.publication)

            setSaveTitle(response.data.requested_data.title)
            setSavePublication(response.data.requested_data.publication)

            setDataPublication(response.data.requested_data)

         })
      .catch(error => {

        if (error.response && error.response.data && error.response.data.error_message) {

            console.log(error.response.data.error_message);

        } else {

            return

        }

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

    const formatDate = (dataString) => {

        const data = new Date(dataString)

        const dia = data.getDate().toString().padStart(2, '0')

        const mes = (data.getMonth() + 1).toString().padStart(2, '0')

        const ano = data.getFullYear()

        return `${dia}/${mes}/${ano}`
    }

      
    if (title) {
    return (
        <>
            <MainHeader>

                <ProfileSection>
                    <div>
                        <p>{user && user.username}</p>
                    </div>
                    <ImageStyle src={imgProfile} alt="image by Carter Baran, via Unsplash" width="51" height="51" />
                </ProfileSection>

            </MainHeader>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Post deletion confirmation" 
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)'
                    },
                    content: {
                        width: '80%', 
                        height: '80%', 
                        margin: 'auto',
                        backgroundColor: '#181818', 
                        color: '#fff',
                        border: 'none'
                    
                    }
            }}>

                { deletePublication ? (<DeletePostPopup>
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
                    
                </DeletePostPopup>) : (
                    <DeletePostPopup>
                    <h2>Tem certeza que deseja excluir este comentário?</h2>
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
                )}

            </Modal>
            <Section>
                <>
                <div>

                    { 
                        editPublication ? (                            
                            <FormSection>
                                <div><InputPublicationTitle placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
                                <br />
                                <div><InputPublicationPost editPublication={editPublication} placeholder="Post" type="text" value={publication} onChange={(e) => setPublication(e.target.value)} /></div>
                                <ButtonSection>
                                    <ButtonIcon type="submit" onClick={CheckEmptyEntry}>
                                        <div>
                                            <Icon icon="line-md:circle-to-confirm-circle-twotone-transition" style={{ color: '#535564', fontSize: '2rem', margin: "0", padding: "0" }} />
                                        </div>
                                        <div>
                                            Confirmar
                                        </div>
                                    </ButtonIcon>
                                    <ButtonIcon onClick={() => {EditCanceled()}}>
                                        <div>
                                            <Icon icon="ic:twotone-cancel" style={{ color: '#535564', fontSize: '2rem', margin: "0", padding: "0" }} />
                                        </div>
                                        <div>
                                            Cancelar
                                        </div>
                                    </ButtonIcon>
                                </ButtonSection>
                                { message && <ErrorMessage>{message}</ErrorMessage>}
                            </FormSection>
                          ) : (
                            <>
                                <TitlePost>{title}</TitlePost>
                                <Container>
                                    
                                    <ImageStyle src={imgProfile} alt="image by Carter Baran, via Unsplash" width="30" height="30" />
                                    <p>{user && user.username}</p>
                                    <p>&#124;</p>
                                    <p>publicado: {formatDate(dataPublication.time_created)}</p>
                                    {dataPublication.time_updated &&  <><p>&#124;</p> <p>editado: {formatDate(dataPublication.time_updated)}</p></>}
                                
                                </Container>

                                <TextPost>{publication}</TextPost>

                                {dataPublication.username === user.username ? (
                                    <>
                                    <PostSettings>
                                    <button onClick={() => {setEditPublication(true); setMessage('');}}>
                                        <Icon icon="tabler:edit" style={{ color: '#535564', fontSize: '2rem', marginRight: "1rem", padding: "0" }} />
                                    </button>
                                    <button onClick={() => {openModal(); setDeleteComment(false); setDeletePublication(true);}}>
                                        <Icon icon="fluent:delete-16-filled" style={{ color: '#535564', fontSize: '2rem', margin: "0", padding: "0" }} />
                                    </button>
                                </PostSettings>
                                <TitleComments>Seu Comentário</TitleComments>

                                <FormSection>

                                <div><InputPost placeholder="Comment" type="text" value={comment} onChange={(e) => setComment(e.target.value)} /></div>
                                <ButtonSection>
                                    <DefaultButton type="submit" onClick={CheckEmptyEntry} text="Publicar" />
                                    { message && <ErrorMessage>{message}</ErrorMessage>}
                                </ButtonSection>

                            </FormSection>
                            </>
                                ) : (
                                    <>
                                        <TitleComments>Seu Comentário</TitleComments>

                                        <FormSection>

                                        <div><InputPost placeholder="Comment" type="text" value={comment} onChange={(e) => setComment(e.target.value)} /></div>
                                        <ButtonSection>
                                            <DefaultButton type="submit" onClick={CheckEmptyEntry} text="Publicar" />
                                            { message && <ErrorMessage>{message}</ErrorMessage>}
                                        </ButtonSection>

                                    </FormSection>
                                    </>
                                )}
                                

                                

                            </>
                          )
                    }         

                </div>

                <div>

                    <TitleComments>Comentários</TitleComments>
                    <CommentSection>

                        <Comment>

                            <ProfilePostSection>
                                <ProfileImage src={imgProfile} alt="image by Carter Baran, via Unsplash" />
                                <p>username</p>
                            </ProfilePostSection>

                            { editComment ? (

                                <FormSection>

                                <div><InputPublicationPost  type="text" value={textComment} onChange={(e) => setTextComment(e.target.value)} /></div>
                                
                                <ButtonSection>

                                    <DefaultButton type="submit" onClick={CheckEmptyEntry} text="Confirmar" />
                                    <DefaultButton type="submit" onClick={() => {setEditComment(false); setMessageComment("");}} text="Cancelar" />

                                </ButtonSection>

                                { messageComment && <ErrorMessage>{messageComment}</ErrorMessage>}

                                </FormSection>

                            ) : (

                                <>
                                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget augue eu metus elementum condimentum ut ut ligula.</p>
                                
                                    <FooterComment>
                                        <button onClick={() => {setEditComment(true); setMessage('');}}>Editar</button>
                                        <p>{'\u25CF'}</p>
                                        <button onClick={() => {openModal(); setDeletePublication(false); setDeleteComment(true);}}>Deletar</button>
                                    </FooterComment>
                                
                                </>

                            )}

                                
                            

                        </Comment>

                    </CommentSection>

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
                    </div>
                    <Image src={imgProfile} alt="image by Carter Baran, via Unsplash" width="61" height="61" />
                </ProfileSection>

            </MainHeader>

        )
    }
    
}