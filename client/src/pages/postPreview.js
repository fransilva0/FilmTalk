import React,{ useState, useEffect }  from "react";
import { useRouter } from 'next/router';
import axios from 'axios';
import Modal from 'react-modal';
import Image from 'next/image';
import imgProfile from "../assets/img-profile.jpg";
import { MainHeader } from "../components/Header";
import { DefaultButton } from "../components/Button"
import { ErrorMessage } from "../components/ErrorMessage"
import { InputPublicationTitle, InputPublicationPost } from "../components/Input"
import { Icon } from '@iconify/react';
import { ProfileSection, ImageStyle, Section, TitlePost, TitleComments, TextPost, FormSection, InputPost, ButtonSection, PostSettings, 
    PostPopup, ButtonIcon, Container, CommentSection, Comment, ProfileImage, ProfilePostSection, FooterComment, Spinner } from "../styles/postPreviewStyled"
import { userEditPublication, userDeletePublication, viewPublication } from "../api/publications";
import { userCreateComment, userDeleteComment, userEditComment, viewComments } from "../api/comments";


export default function PostPreview() {
    const [title, setTitle] = useState('');
    const [publication, setPublication] = useState('');
    const [saveTitle, setSaveTitle] = useState('');
    const [savePublication, setSavePublication] = useState('');
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalCommentIsOpen, setModalCommentIsOpen] = useState(false);
    const [dataPublication, setDataPublication] = useState([]);
    const [editPublication, setEditPublication] = useState(false);
    const [editComment, setEditComment] = useState([]);
    const [deletePublication, setDeletePublication] = useState(false);
    const [deleteComment, setDeleteComment] = useState(false);
    const [messageComment, setMessageComment] = useState('');
    const [textComment, setTextComment] = useState('');
    const [offset, setOffset] = useState(1);
    const [loading, setLoading] = useState(false);
    const [listComments, setListComments] = useState([]);
    const [configPagination, setConfigPagination] = useState([]);

    const router = useRouter();

    const { UserPost } = router.query

    const access_token = user && user.token

    useEffect(() => {
        if (offset === 1) {
            CheckComments(access_token);
        }
        
    }, [offset]);


    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                if(offset != null) {

                    CheckComments(access_token)

                }
            }
        };

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        };

    }, [listComments]);

    const CheckEmptyEntry = () => {
        if (editPublication) {
            if (title.trim() === '' || publication.trim() === '') {
                setMessage('existem campos vazios');
              } else {
                EditConfirm();
                setEditPublication(false);
            }
        } else {
            if (comment.trim() === '') {
                setMessage('comentário não pode ser vazio');
              } else {
                  setMessage('')
                  SendComment();
            }
        }
        
      }

      const CheckEmptyEntryComment = () => { 
            if (textComment.trim() === '') {
                setMessageComment('comentário não pode estar vazio');
              } else {
                setMessageComment("");
                EditCommentConfirm();
            }
        
      }

      const EditCommentConfirm = () => {

        userEditComment(editComment, textComment, user.token)
          .then(() => {

            closeModalComment(false);
            setListComments([])
            setOffset(1)
            
          })
          .catch((error) => {

            if ((error.response && error.response.data && error.response.data.error_message)) {
    
              setMessage(error.response.data.error_message)
    
            } else {

                return
    
            }

          });
        
        
      }

      const EditConfirm = () => {

        userEditPublication(title, publication, UserPost, access_token)
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

      const openModalComment = () => {
        setModalCommentIsOpen(true);
      }

      const closeModalComment = () => {
        setModalCommentIsOpen(false);

      }
      
      const handleConfirm = () => {
        
        userDeletePublication(UserPost, user.token) 
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

          });
    
        }

      const CheckPublications = (access_token) => {

        viewPublication(UserPost, access_token)
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

    const CheckComments = async (accessToken = access_token) => {

        setLoading(true);
        await viewComments(UserPost, offset, accessToken)
        .then(response => {

          setTimeout(() => {
            setListComments([...listComments, ...response.data.requested_data.data]);
            setConfigPagination(response.data.requested_data.pagination);
            setOffset(response.data.requested_data.pagination.next_page)
            setLoading(false);
        }, 1000);

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
          CheckComments(foundUser.token)
          

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

    const handleScroll = (event) => {
        const element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            if(offset != null) {
                CheckComments(access_token)
            }
        }
    };


    const SendComment = () => {

        userCreateComment(comment, UserPost, access_token)
            .then(() => {

              setComment('')
              setListComments([])
              setOffset(1)
              
            })
            .catch((error) => {
              if ((error.response)) {
      
                setMessage(error.response.data.error_message)
      
              }
            });

    }

    const DeleteComment = () => {

        userDeleteComment(editComment, access_token)
            .then(() => {

              setListComments([])
              setOffset(1)
              closeModal();
              
            })
            .catch((error) => {
              if ((error.response)) {
      
                setMessage(error.response.data.error_message)
      
              }
            });
        
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

                { deletePublication ? (<PostPopup>
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
                    
                </PostPopup>) : (
                    <PostPopup>
                    <h2>Tem certeza que deseja excluir este comentário?</h2>
                    <div>
                        <ButtonIcon onClick={DeleteComment}>
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
                    
                </PostPopup>
                )}

            </Modal>

            <Modal isOpen={modalCommentIsOpen} onRequestClose={closeModalComment} contentLabel="Post deletion confirmation" 
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)'
                    },
                    content: {
                        width: '80%', 
                        height: '80%', 
                        margin: 'auto',
                        backgroundColor: '#fff', 
                        color: '#fff',
                        border: 'none'
                    
                    }
            }}>

                
                    <PostPopup>
                        <FormSection>

                            <div><InputPublicationPost  type="text" value={textComment} onChange={(e) => setTextComment(e.target.value)} /></div>

                            <ButtonSection>

                                <DefaultButton type="submit" onClick={CheckEmptyEntryComment} text="Confirmar" />
                                <DefaultButton type="submit" onClick={() => {setMessageComment(""); closeModalComment(false)}} text="Cancelar" />

                            </ButtonSection>

                            { messageComment && <ErrorMessage>{messageComment}</ErrorMessage>}

                        </FormSection>
                    </PostPopup>
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

                    <CommentSection onScroll={handleScroll} style={{ maxHeight: '80vh', overflow: 'auto' }}>

                        {listComments && listComments.map(comment => (
                        <Comment>

                            <ProfilePostSection>
                                <ProfileImage src={imgProfile} alt="image by Carter Baran, via Unsplash" />
                                <p>{comment.username}</p>
                            </ProfilePostSection>

                                
                                    <p>{comment.commentary}</p>
                                
                                    
                                        {comment.username === user.username ? (
                                            <FooterComment>
                                                <button onClick={() => {openModalComment(); setMessage(''); setEditComment(comment); setTextComment(comment.commentary)}}>Editar</button>
                                                <p>{'\u25CF'}</p>
                                                <button onClick={() => {openModal(); setDeletePublication(false); setDeleteComment(true); setEditComment(comment);}}>Deletar</button>
                                                <p>{'\u25CF'}</p>
                                                <p>{formatDate(comment.time_created)}</p>
                                            </FooterComment>
                                        ) : (
                                            <FooterComment>
                                                <p>{formatDate(comment.time_created)}</p>
                                            </FooterComment>
                                        )}

                        </Comment>))}
                        {loading && <Container><Spinner></Spinner></Container>}

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