import React,{ useState, useEffect }  from "react"
import styled from 'styled-components';
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

    max-height: 80vh;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      display: none; 
  }

  -ms-overflow-style: none;  
  scrollbar-width: none;

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
        cursor: pointer;
    }

`;

const CommentSection = styled.div`
    margin-top: 10px;
    display: flex;
    color: #535564;
    font-size: 0.8rem;
    justify-content: right;

    p {
        padding-right: 0.5rem;
    }


`;

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const Spinner = styled.span`

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




export function UserPosts ({ userProp, setUserProp }) {
    const [title, setTitle] = useState('');
    const [publication, setPublication] = useState('');
    const [message, setMessage] = useState('');
    const [listPublications, setListPublications] = useState([]);

    const [configPagination, setConfigPagination] = useState([]);
    const [offset, setOffset] = useState(1);
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    const access_token = userProp && userProp.token

    useEffect(() => {
      if (offset === 1) {
          CheckPublications();
      }
      
  }, [offset]);

    useEffect(() => {
        
        CheckPublications()

      }, []);

    const CheckPublications = async () => {

        setLoading(true);
        await axios.get(`http://127.0.0.1:8080/posts?offset=${offset}`, {
            headers: {
              'Authorization': `Bearer ${access_token}`
            }
          })
        .then(response => {

          setTimeout(() => {
            setListPublications([...listPublications, ...response.data.requested_data.data]);
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
      const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            if(offset != null) {

                CheckPublications()

            }
        }
    };

    window.addEventListener('scroll', handleScroll)

    return () => {
        window.removeEventListener('scroll', handleScroll)
    };

  }, [listPublications]);

    const handleScroll = (event) => {
      const element = event.target;
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
          if(offset != null) {
              CheckPublications()
          }
      }
  };

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
          .then(() => {
            setTitle('');
            setPublication('');
            setListPublications([])
            setOffset(1)
            
          })
          .catch((error) => {
            if ((error.response)) {
    
              setMessage(error.response.data.error_message)
    
            }
          });
    
      }

      const formatDate = (dataString) => {

        const data = new Date(dataString)

        const dia = data.getDate().toString().padStart(2, '0')

        const mes = (data.getMonth() + 1).toString().padStart(2, '0')

        const ano = data.getFullYear()

        return `${dia}/${mes}/${ano}`
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

            <PublicationsSection onScroll={handleScroll} style={{ maxHeight: '80vh', overflow: 'auto' }}>
                <h2>Minhas Postagens</h2>

                {listPublications && listPublications.map(publication => (
                <Publication key={publication.id}>

                    <button onClick={() => {
                        router.push(`/postPreview?UserPost=${publication.id}`)
                      }}>{publication.title}</button>

                    <CommentSection>
                        <p>0 comentário(s)</p>
                        <p>{'\u25CF'}</p>
                        <p>{formatDate(publication.time_created)}</p>
                    </CommentSection>

                </Publication>))}
                {loading && <Container><Spinner></Spinner></Container>}

            </PublicationsSection>
        </GeneralDiv>
    )
}