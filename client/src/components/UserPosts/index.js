import React,{ useState, useEffect }  from "react"
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { DefaultButton } from "../Button"
import { ErrorMessage } from "../ErrorMessage"
import { InputPublicationTitle, InputPublicationPost } from "../Input"

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
`;

const ButtonSection = styled.section`

    display: flex;
    flex-direction: column;
    margin-top: 1rem;

    @media (min-width: 1025px) {
   
        justify-content: left;
        flex-direction: row;
        
    }
`;



const PublicationsSection = styled.section`

    padding: 1rem;
    padding-top: 4rem;

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

const Publication = styled.div`

    background: transparent;
    padding: 2rem;
    display: flex;
    justify-content: space-between;
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
        width: 40%;
        cursor: pointer;
    }

    div {
        display: flex;
        color: #535564;
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
                <div><InputPublicationTitle placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
                <div><InputPublicationPost placeholder="Post" type="text" value={publication} onChange={(e) => setPublication(e.target.value)} /></div>
                <ButtonSection>
                    <DefaultButton type="submit" onClick={CheckEmptyEntry} text="Publicar uma postagem"/>
                    { message && <ErrorMessage>{message}</ErrorMessage>}
                </ButtonSection>
                
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
                        <Icon icon="tabler:message-circle-2" style={{ color: '#535564', fontSize: '3rem', margin: "0", padding: "0" }} />
                    </div>

                </Publication>))}

            </PublicationsSection>
        </GeneralDiv>
    )
}