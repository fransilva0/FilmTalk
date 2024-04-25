import React,{ useState, useEffect }  from "react"
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
import axios from 'axios';

const GeneralDiv = styled.div`
    @media (min-width: 1025px) {
        display: flex;
        justify-content: space-between;
    }

`;

const FormSection = styled.section`
    display: flex;
    flex-direction: column;
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
    resize: none;

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
        width: 50rem;
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
    transition: background-color border-color 0.3s, color 0.3s;

    &:hover {
        background-color: #c20000;
        border-color: #c20000; 
    }

`;

const ErrorMensage = styled.p`
    font-size: 1rem;
    color: #fff;
    background: #DF2222;
    padding: 1rem;
    margin-top: 1rem;

`;

const PublicationsSection = styled.section`

    padding: 1rem;
    padding-top: 4rem;

    h2 {
        border-bottom: 1px solid #DF2222;
        color: #fff;
        padding-bottom: 1rem;
        font-size: 1rem;
    }

    @media (min-width: 1025px) {

        width: 40%;
        
    }

`;

const Publication = styled.div`

    background: #DF2222;
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    margin-top: 2rem; 
    align-items: center;

    button {
        color: #fff;
        font-size: 1.3rem;
        background: transparent;
        border: none;
        text-align: left;
        width: 40%;
        cursor: pointer;
    }

    div {
        display: flex;
        color: #fff;
        font-size: 0.8rem;
        align-items: center;

        p {
            padding-right: 0.5rem;
        }
    }

`;

export function UserPosts ({ userProp, setUserProp }) {
    const [title, setTitle] = useState('');
    const [publication, setPublication] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState();
    const [listPublications, setListPublications] = useState([]);

    const router = useRouter()

    const access_token = userProp && userProp.token

    useEffect(() => {
        
        CheckPublications()

      }, []);

    const CheckPublications = () => {

        axios.get('http://127.0.0.1:8080/posts', {
            headers: {
              'Authorization': `Bearer ${access_token}`
            }
          })
        .then(response => {

            setListPublications(response.data.requested_data);

         })
      .catch(error => {

        console.log(error.response.data.error_message)

      });

    }

    const CheckEmptyEntry = () => {
        if (title.trim() === '' || publication.trim() === '') {
          setMessage('existem campos vazios');
        } else {
            setMessage('')
            DataJSON()
        }
      }

      const DataJSON = () => {

        const userDataJson = {
          title: title,
          publication: publication
        };
    
        axios.post('http://127.0.0.1:8080/posts', userDataJson, {
            headers: {
              'Authorization': `Bearer ${access_token}`
            }
          })
          .then((response) => {
            setTitle('');
            setPublication('');
            CheckPublications();
            
          })
          .catch((error) => {
            if ((error.response)) {
    
              setMessage(error.response.data.error_message)
    
            }
          });
    
      }

    return (
        <GeneralDiv>
            <FormSection>
                <div><Input placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
                <div><InputPost placeholder="Post" type="text" value={publication} onChange={(e) => setPublication(e.target.value)} /></div>
                <ButtonSection>
                    <Button type="submit" onClick={CheckEmptyEntry}>Publicar uma postagem</Button>
                </ButtonSection>
                { message && <ErrorMensage>{message}</ErrorMensage>}
            </FormSection>

            <PublicationsSection>
                <h2>Minhas Postagens</h2>

                {listPublications && listPublications.map(publication => (
                <Publication key={publication.id}>

                    <button onClick={() => {
                        router.push(`/postPreview?UserPost=${publication.id}`)
                      }}>{publication.title}</button>

                    <div>
                        <p>0 comentário(s)</p>
                        <Icon icon="tabler:message-circle-2" style={{ color: '#fff', fontSize: '3rem', margin: "0", padding: "0" }} />
                    </div>

                </Publication>))}

            </PublicationsSection>
        </GeneralDiv>
    )
}