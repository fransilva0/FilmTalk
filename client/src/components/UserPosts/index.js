import React,{ useState, useEffect }  from "react"
import { useRouter } from 'next/router';
import { DefaultButton } from "../Button"
import { ErrorMessage } from "../ErrorMessage"
import { InputPublicationTitle, InputPublicationPost } from "../Input"
import { GeneralDiv, FormSection, ButtonSection, PublicationsSection, Publication, CommentSection, Container, Spinner } from "./style"
import { checkPostsFeed } from "../../api/feeds";
import {userCreatePublication } from "../../api/publications";

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
        await checkPostsFeed(offset, access_token)
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
            PostsFeed()
        }
      }

      const PostsFeed = () => {

        userCreatePublication(title, publication, access_token)
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