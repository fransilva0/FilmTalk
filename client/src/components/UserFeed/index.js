import React,{ useState, useEffect }  from "react";
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import styled from 'styled-components';
import imgProfile from "../../assets/img-profile.jpg";
import { Icon } from '@iconify/react';


const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const ProfileSection = styled.section`

    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem;
    background: linear-gradient(90deg, #B84032, #535564);
    padding: 2rem;
    border-radius: 2rem;

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

export function UserFeed ({ userProp, setUserProp, setScreen }) {
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

    return (
        <>
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

            <Container>
            <PublicationsSection>
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
            </Container>
        </>
    )
}