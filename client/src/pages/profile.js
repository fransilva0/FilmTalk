import React, { useState, useEffect } from "react"
import { useRouter } from 'next/router';
import { MainHeader } from "../components/Header"
import { DefaultButton } from "../components/Button"
import { ImageStyle, Container, CentralLine, Button, StyledIconButton, NavbarContainer, NavbarButton, 
    VisualizationContainer, PublicationsSection, CommentSection, Spinner, Publication, GeneralContainer, ButtonSection, SectionProfile } from "../styles/profileStyled"
import { FavoriteUsers } from "../components/FavoriteUsers"
import { MovieListsSection } from "../components/MovieListsSection"
import { ErrorMessage } from "../components/ErrorMessage"
import imgProfile from "../assets/img-profile.jpg"
import { checkPostsFeed } from "../api/feeds";
import { userProfile, userProfileViewPosts } from "../api/user"
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
    const [listUserProfile, setListUserProfile] = useState([])

    const handleClick = (buttonName) => {
        setActiveButton(buttonName);
    }

    const router = useRouter();

    const { User } = router.query

    useEffect(() => {
      if (offset === 1) {
          CheckPublications(User);
      }
      
  }, [offset]);

  useEffect(() => {

    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {

      const foundUser = JSON.parse(loggedInUser);

     

      if (User) {

        userProfileData(User)
        CheckPublications(User);

      } else {

        userProfileData(foundUser.username)
        CheckPublications(foundUser.username);

      }

      setUser(foundUser);

    } else {
        
        router.push('/login');
        
      }
  }, []);

  const userProfileData = (username) => {
    userProfile(username)
    .then(response => {
        setListUserProfile(response.data.requested_data)
    }) 
  }



    const CheckPublications = async (username) => {

        setLoading(true);
        await userProfileViewPosts(username, offset)
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

                CheckPublications(User);

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

        CheckPublications(User);
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

            <SectionProfile>
            <Container>
                <ImageStyle src={imgProfile} alt="image by Carter Baran, via Unsplash" />
                <h1>{listUserProfile.username}</h1>
                <p>{listUserProfile.user_bio ? listUserProfile.user_bio : " "}</p>
            </Container>

            <CentralLine />

            {listUserProfile.user_link ? (<Container>
                <a href={listUserProfile.user_link} target="_blank" rel="noopener noreferrer">
                    <Button>
                        <StyledIconButton icon="iconoir:internet" />
                        <p>{listUserProfile.user_link}</p>
                    </Button>
                </a>
            </Container>) : (
                <Container>
                    <StyledIconButton icon="iconoir:internet" />
                </Container>
            )}

            <PostFormPopup isOpen={modalIsOpen} onRequestClose={closeModal} />

            { listUserProfile.username === JSON.parse(localStorage.getItem("user")).username ? (<ButtonSection>
                <DefaultButton type="submit" onClick={openModal} text="Crie uma Publicação" />
            </ButtonSection>) : (
                <ButtonSection>
                    <DefaultButton type="submit" text="Favoritar Usuário" />
                </ButtonSection>
            )}

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

            </SectionProfile>

            </GeneralContainer>

        </>
    )
}