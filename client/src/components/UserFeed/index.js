import React,{ useState, useEffect }  from "react";
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import imgProfile from "../../assets/img-profile.jpg";
import { FavoriteUsers } from "../FavoriteUsers";
import { Container, GeneralContainer, ProfileSection, StyledIcon, Button, PublicationsSection, Publication, ProfileImage, 
    ProfilePostSection, CommentSection, Spinner, StyleIcon, NavbarContainer, NavbarButton} from "./style"

export function UserFeed ({ userProp, setUserProp, setScreen }) {
    const [listPublications, setListPublications] = useState([]);
    const [configPagination, setConfigPagination] = useState([]);
    const [offset, setOffset] = useState(1);
    const [loading, setLoading] = useState(false);
    const [activeButton, setActiveButton] = useState('feed');
    const [visibleFeed, setVisibleFeed] = useState(true)

    const handleClick = (buttonName) => {
        setActiveButton(buttonName);
    }
    
    const router = useRouter()
    const access_token = userProp && userProp.token

    useEffect(() => {
        
        CheckPublications()

      }, []);

    const CheckPublications = async () => {

        setLoading(true);
        await axios.get(`http://127.0.0.1:8080/posts/page?offset=${offset}`, {
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

    const formatDate = (dataString) => {

        const data = new Date(dataString)

        const dia = data.getDate().toString().padStart(2, '0')

        const mes = (data.getMonth() + 1).toString().padStart(2, '0')

        const ano = data.getFullYear()

        return `${dia}/${mes}/${ano}`
    }

    return (
        <GeneralContainer>

            <FavoriteUsers hideOnMobile={true} />

            <div>
            <Container>
                <ProfileSection>

                    <Image src={imgProfile} alt="image by Carter Baran, via Unsplash" width="100" height="100" />
                    <div>

                        <p>{userProp && userProp.username}</p>
                        <Button onClick={() => setScreen('PublicationsProfile')}>
                            <StyledIcon icon="tabler:edit" />
                            <p>Criar uma Publicação</p>
                        </Button>

                    </div>

                </ProfileSection>
            </Container>

            <NavbarContainer hide={true}>

                <NavbarButton
                    isActive={activeButton === 'feed'}
                    onClick={() => {handleClick('feed'); setVisibleFeed(true)}}
                >
                    Para você
                </NavbarButton>
      
                <NavbarButton
                    isActive={activeButton === 'connections'}
                    onClick={() => {handleClick('connections'); setVisibleFeed(false)}}
                >
                    Conexões
                </NavbarButton>
    
            </NavbarContainer>

            
            {visibleFeed ? (
                <PublicationsSection>
                {listPublications && listPublications.map(publication => (

                <Publication key={publication.id}>

                    <ProfilePostSection>
                        <ProfileImage src={imgProfile} alt="image by Carter Baran, via Unsplash" />
                        <p>{publication.username}</p>
                    </ProfilePostSection>



                        <button onClick={() => {
                            router.push(`/postPreview?UserPost=${publication.id}`)
                          }}>{publication.title}</button>

  

                    <CommentSection>
                            <p>0 comentário(s)</p>
                            <p>{'\u25CF'}</p>
                            <p>{formatDate(publication.time_created)}</p>
                    </CommentSection>
                    

                </Publication>))}
                {offset === null && <Container><StyleIcon icon="maki:cinema" /></Container>}
                {loading && <Container><Spinner></Spinner></Container>}

            </PublicationsSection>
            ) : (
                <Container>
                    <FavoriteUsers hideOnMobile={false} hideBoxShadow={true} hideTitleSection={true} expandHeight={true} />
                </Container>
            )}
            
            </div>
        </GeneralContainer>
    )
}