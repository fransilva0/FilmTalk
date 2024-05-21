import React,{ useState, useEffect }  from "react";
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import styled from 'styled-components';
import imgProfile from "../../assets/img-profile.jpg";
import { Icon } from '@iconify/react';
import { FavoriteUsers } from "../FavoriteUsers";


const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const GeneralContainer = styled.section`

display: flex;
flex-direction: column;

@media (min-width: 1025px) {
    flex-direction: row;

    div {
   
        width: 100%;
    }
    
}


`;

const ProfileSection = styled.section`

    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem;
    background: linear-gradient(90deg, #B84032, #535564);
    padding: 2rem;
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.3);

    div {
        margin-left: 1rem;

    }

    p {
        color: #fff;
        margin-top: 0.5rem;
    }

`;

const StyledIcon = styled(Icon)`
  color: #fff;
  font-size: 2rem;
  margin: 0;
  margin-right: 0.5rem;
  padding: 0;

`;

const Button = styled.button`

    background: transparent;
    border: none;
    cursor: pointer;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    text-align: left;

    p {
        color: #fff;
        font-size: 1rem;
    }
`;

const PublicationsSection = styled.section`

    padding: 1rem;
    padding-top: 4rem;


    @media (min-width: 1025px) {

        width: 40%;
        margin-left: auto;
        margin-right: auto;
        
    }

`;

const Publication = styled.div`

    background: transparent;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    margin-top: 2rem; 
    border: 1px solid rgba(0, 0, 0, 0.25);
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.25);

    button {
        color: #535564;
        font-size: 1.3rem;
        background: transparent;
        border: none;
        text-align: left;
        cursor: pointer;
        margin: 1rem;
    }




`;

const ProfileImage = styled(Image)`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-right: 0.5rem;
`;

const ProfilePostSection = styled.section`

    display: flex;
    align-items: center;

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

const StyleIcon = styled(Icon)`
  color: #B84032;
  font-size: 5rem;
  margin: 1rem;
  border-radius: 5rem;
  border: 3px solid #B84032;
  padding: 0;
  

`;

export function UserFeed ({ userProp, setUserProp, setScreen }) {
    const [listPublications, setListPublications] = useState([]);
    const [configPagination, setConfigPagination] = useState([]);
    const [offset, setOffset] = useState(1);
    const [loading, setLoading] = useState(false);
    
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

            <FavoriteUsers />

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
            </div>
        </GeneralContainer>
    )
}