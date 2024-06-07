import React, { useState, useEffect } from "react"
import { useRouter } from 'next/router';
import { MainHeader } from "../components/Header"
import { DefaultButton } from "../components/Button"
import { ImageStyle, Container, CentralLine, Button, StyledIconButton, NavbarContainer, NavbarButton, 
    VisualizationContainer, PublicationsSection, CommentSection, Spinner, Publication, GeneralContainer, ButtonSection } from "../styles/profileStyled"
import { FavoriteUsers } from "../components/FavoriteUsers"
import { MovieListsSection } from "../components/MovieListsSection"
import { ErrorMessage } from "../components/ErrorMessage"
import imgProfile from "../assets/img-profile.jpg"
import { checkPostsFeed } from "../api/feeds";
import { PostFormPopup } from "../components/PostFormPopup";


export default function Profile() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [user, setUser] = useState();
    const [activeButton, setActiveButton] = useState('publications');
    const [mobileNavbar, setMobileNavbar] = useState(true);
    const [message, setMessage] = useState('');
    const [listPublications, setListPublications] = useState([]);
    const [configPagination, setConfigPagination] = useState([]);
    const [offset, setOffset] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleClick = (buttonName) => {
        setActiveButton(buttonName);
    }

    const router = useRouter();

    useEffect(() => {
      if (offset === 1) {
          CheckPublications();
      }
      
  }, [offset]);

  useEffect(() => {

    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {

      const foundUser = JSON.parse(loggedInUser);

      CheckPublications(foundUser.token);

      setUser(foundUser);

    } else {
        
        router.push('/login');
        
      }
  }, []);



    const CheckPublications = async (access_token) => {

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

                CheckPublications(user.token)

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
              CheckPublications(user.token)
          }
      }
  };

      const formatDate = (dataString) => {

        const data = new Date(dataString)

        const dia = data.getDate().toString().padStart(2, '0')

        const mes = (data.getMonth() + 1).toString().padStart(2, '0')

        const ano = data.getFullYear()

        return `${dia}/${mes}/${ano}`
    }

    const openModal = () => {
        setModalIsOpen(true);
      }
  
      const closeModal = () => {
        setModalIsOpen(false);
      }

    return (
        <>
            <MainHeader />
            <GeneralContainer>

            <div>
                <FavoriteUsers hideOnMobile={true} TitleSection={"Meus Favoritos"} />
                <MovieListsSection hideOnMobile={true} TitleSection={"Biografia Cinematográfica"} />
            </div>

            <div>
            <Container>
                <ImageStyle src={imgProfile} alt="image by Carter Baran, via Unsplash" />
                <h1>Username</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet venenatis feugiat. Maecenas eget placerat arcu, sit amet maximus nunc.</p>
            </Container>

            <CentralLine />

            <Container>
                <Button onClick={() => { router.push('/home'); }}>
                    <StyledIconButton icon="iconoir:internet" />
                    <p>google.com</p>
                </Button>
            </Container>

            <PostFormPopup isOpen={modalIsOpen} onRequestClose={closeModal} />

            <ButtonSection>
                <DefaultButton type="submit" onClick={openModal} text="Crie uma Publicação" />
            </ButtonSection>

            <VisualizationContainer>

            <NavbarContainer hide={true}>

                <NavbarButton
                    isActive={activeButton === 'publications'}
                    onClick={() => {handleClick('publications'); setMobileNavbar(true)}}
                >
                    Minhas publicações
                </NavbarButton>
      
                <NavbarButton
                    isActive={activeButton === 'favorites'}
                    onClick={() => {handleClick('favorites'); setMobileNavbar(false)}}
                >
                    Meus Favoritos
                </NavbarButton>
    
            </NavbarContainer>

            {mobileNavbar ? (
                <PublicationsSection onScroll={handleScroll} style={{ maxHeight: '80vh', overflow: 'auto' }}>

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
            ) : (
                <Container>
                    <FavoriteUsers hideOnMobile={false} hideBoxShadow={true} expandHeight={true} hideTitleSection={true} />
                </Container>
            )}

            </VisualizationContainer>

            </div>

            </GeneralContainer>

        </>
    )
}