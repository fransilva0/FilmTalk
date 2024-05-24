import React,{ useState, useEffect }  from "react";
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { DefaultButton } from "../Button"
import { InputUserForm } from "../Input"
import { ErrorMessage } from "../ErrorMessage"
import { FormSection, Container, ButtonSection, TitleSection, ConfigContainer, ConfigSection, ConfirmPopup, ButtonIcon } from "./style"


export function SettingsScreen ({setScreen}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);

    
    const [usernameEditing, setUsernameEditing] = useState(false);
    const [emailEditing, setEmailEditing] = useState(false);
    const [passwordEditing, setPasswordEditing] = useState(false);
    const [bioEditing, setBioEditing] = useState(false);
    const [linkEditing, setLinkEditing] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');




    const router = useRouter()

    const openModal = () => {
      setModalIsOpen(true);
    }

    const closeModal = () => {
      setModalIsOpen(false);
    }

    const handleConfirm = () => {

      {/* lógica do axios para mudar aqui, para verificar a senha*/}
        
      axios.get(`http://127.0.0.1:8080/posts`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        .then(() => {
          
          if (confirmAction) {
            confirmAction();
          }

          closeModal();
          
        })
        .catch((error) => {

          if ((error.response && error.response.data && error.response.data.error_message)) {
  
            setMessage(error.response.data.error_message)
  
          } else {

              return
  
          }

        });


    }


    const UpdateUserData = (field, value) => {
      const userDataJson = {
        [field]: value
      };
    
      axios.patch('http://127.0.0.1:8080/users', userDataJson, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
        .then(() => {
          if ([field] != "password") {

            const user = JSON.parse(localStorage.getItem('user'))
            user[field] = value;
            localStorage.setItem('user', JSON.stringify(user));
            
          }
    
          router.reload();
        })
        .catch((error) => {
          if ((error.response)) {
            setMessage(error.response.data.error_message)
          }
        });
    }
  
  
    const CheckUsername= () => {
      if (username.trim() === '') {
        setMessage('o username não pode ser vazio');
      } else {
        setMessage('')
        setConfirmAction(() => () => UpdateUserData("username", username));
        openModal()
      }
    }
  
    const CheckPassword = () => {
    
      if (password.trim() === '' || repeatPassword.trim() === '') {

        setMessage('Os campos de senha não podem ser vazios');
        
      } else if (password == repeatPassword ) {

        setMessage('')
        setConfirmAction(() => () => UpdateUserData("password", password));
        openModal()
        
        
      } else {
        setMessage('Os campos de senha precisam ser iguais');
      }
    }
  
    const CheckEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(email);
      
      if (isValid) {
        setMessage('');
        setConfirmAction(() => () => UpdateUserData("email", email));
        openModal()

      } else {
        setMessage('Por favor, insira um email válido.');
      }
  
    }

    useEffect(() => {

      const loggedInUser = localStorage.getItem("user");

      if (loggedInUser) {

        const foundUser = JSON.parse(loggedInUser);

        setUser(foundUser);

      } else {
          
          router.push('/login');
          
        }
    }, []);




    return (
      <ConfigContainer>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="confirmação" 
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

                <ConfirmPopup>
                    <h2>Confirme com sua senha atual</h2>

                    <FormSection>
                      <InputUserForm placeholder="current password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </FormSection>
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
                    
                </ConfirmPopup>

            </Modal>
      <ConfigSection>
        <Container><TitleSection>Configurações Gerais</TitleSection></Container>

          <FormSection>
              {!usernameEditing && 
                <>
                  <p>Username atual: {user && user.username}</p>
                  
                  <ButtonSection>
                
                    <DefaultButton type="button" onClick={() => {setUsernameEditing(!usernameEditing); setMessage(''); setEmailEditing(false); setPasswordEditing(false)}} text="Editar" />
                
                  </ButtonSection>
              </>
              }
              
              {usernameEditing && (
                <div>
                  <InputUserForm placeholder={user && user.username} type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                  <ButtonSection>
                    <DefaultButton type="submit" onClick={CheckUsername} text="Salvar" />
                    <DefaultButton type="button" onClick={() => {setUsernameEditing(!usernameEditing); setMessage('')}} text="Cancelar" />
                  </ButtonSection>
                  <Container> { message && <ErrorMessage>{message}</ErrorMessage>} </Container>
                </div>
              )}

          </FormSection>

        <FormSection>
          {!emailEditing && 
            <>
              <p>E-mail atual: {user && user.email}</p>
              <ButtonSection>
            
                <DefaultButton type="button" onClick={() => {setEmailEditing(!emailEditing); setMessage(''); setUsernameEditing(false); setPasswordEditing(false)}} text="Editar" />
            
              </ButtonSection>

            </>
          }

          {emailEditing && (
            <div>
              <InputUserForm placeholder={user && user.email} type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <ButtonSection>
                <DefaultButton type="submit" onClick={CheckEmail} text="Salvar" />
                <DefaultButton type="button" onClick={() => {setEmailEditing(!emailEditing); setMessage('')}} text="Cancelar" />
              </ButtonSection>
              <Container> { message && <ErrorMessage>{message}</ErrorMessage>} </Container>
            </div>
          )}

        </FormSection>      

        <FormSection>
          {!passwordEditing && 
              <>
                <ButtonSection>

                  <DefaultButton type="button" onClick={() => {setPasswordEditing(!passwordEditing); setMessage(''); setUsernameEditing(false); setEmailEditing(false)}} text="Atualizar Senha" />

                </ButtonSection>

              </>
          }

          {passwordEditing && (
            <div>
              <div><InputUserForm placeholder="new password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/></div>
              <div><InputUserForm placeholder="confirm new password" type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} /></div>
              <ButtonSection>
                <DefaultButton type="submit" onClick={CheckPassword} text="Salvar" />
                <DefaultButton type="button" onClick={() => {setPasswordEditing(!passwordEditing); setMessage('')}} text="Cancelar" />
              </ButtonSection>
              <Container> { message && <ErrorMessage>{message}</ErrorMessage>} </Container>
            </div>
          )}
        </FormSection>

      </ConfigSection>

      <ConfigSection>

      <Container><TitleSection>Configurações de Perfil</TitleSection></Container>

          <FormSection>
              {!bioEditing && 
                <>
                  <p>Status de perfil atual: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet venenatis feugiat. Maecenas eget placerat arcu, sit amet maximus nunc.</p>
                  
                  <ButtonSection>
                
                    <DefaultButton type="button" onClick={() => {setBioEditing(!bioEditing); setMessage(''); }} text="Editar" />
                
                  </ButtonSection>
              </>
              }
              
              {bioEditing && (
                <div>
                  <InputUserForm placeholder={user && user.username} type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                  <ButtonSection>
                    <DefaultButton type="submit" onClick={CheckUsername} text="Salvar" />
                    <DefaultButton type="button" onClick={() => {setBioEditing(!bioEditing); setMessage('')}} text="Cancelar" />
                  </ButtonSection>
                  <Container> { message && <ErrorMessage>{message}</ErrorMessage>} </Container>
                </div>
              )}

          </FormSection>

          <FormSection>
              {!linkEditing && 
                <>
                  <p>link: https://www.google.com</p>
                  
                  <ButtonSection>
                
                    <DefaultButton type="button" onClick={() => {setLinkEditing(!linkEditing); setMessage(''); }} text="Editar" />
                
                  </ButtonSection>
              </>
              }
              
              {linkEditing && (
                <div>
                  <InputUserForm placeholder={user && user.username} type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                  <ButtonSection>
                    <DefaultButton type="submit" onClick={CheckUsername} text="Salvar" />
                    <DefaultButton type="button" onClick={() => {setLinkEditing(!linkEditing); setMessage('')}} text="Cancelar" />
                  </ButtonSection>
                  <Container> { message && <ErrorMessage>{message}</ErrorMessage>} </Container>
                </div>
              )}

          </FormSection>


      </ConfigSection>
        
        
      </ConfigContainer>
    )
}