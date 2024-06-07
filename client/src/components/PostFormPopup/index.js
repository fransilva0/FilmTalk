import React,{ useState, useEffect }  from "react"
import Modal from 'react-modal';
import { FormSection, ButtonSection, PostPopup } from "./style"
import {userCreatePublication } from "../../api/publications";
import { InputPublicationTitle, InputPublicationPost } from "../Input"
import { DefaultButton } from "../Button"
import { ErrorMessage } from "../ErrorMessage"

export function PostFormPopup ({ isOpen, onRequestClose }) {
    const [user, setUser] = useState();
    const [title, setTitle] = useState('');
    const [publication, setPublication] = useState('');
    const [message, setMessage] = useState('');


    const CheckEmptyEntry = () => {
        if (title.trim() === '' || publication.trim() === '') {
          setMessage('existem campos vazios');
        } else {
            setMessage('')
            PostsFeed()
        }
      }

    const PostsFeed = () => {

        userCreatePublication(title, publication, user.token)
          .then(() => {
            setTitle('');
            setPublication('');
            onRequestClose()
            
          })
          .catch((error) => {
            if ((error.response)) {
    
              setMessage(error.response.data.error_message)
    
            }
          });
    
      }

      useEffect(() => {

        const loggedInUser = localStorage.getItem("user");
    
        if (loggedInUser) {
    
          const foundUser = JSON.parse(loggedInUser);
    
          setUser(foundUser);
    
        }
      }, []);


    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="confirmação" 
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

                    <div><InputPublicationTitle placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></div>

                    <div><InputPublicationPost placeholder="Post" type="text" value={publication} onChange={(e) => setPublication(e.target.value)} /></div>

                    <ButtonSection>

                        <DefaultButton type="submit" onClick={CheckEmptyEntry} text="Publicar uma postagem"/>

                        { message && <ErrorMessage>{message}</ErrorMessage>}

                    </ButtonSection>

                  </FormSection>
                </PostPopup>

            </Modal>
    )
}