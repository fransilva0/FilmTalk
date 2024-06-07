import styled from 'styled-components';
import { Icon } from '@iconify/react';


export const PresentationSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: left;
    margin: 0 2rem 0 2rem;

    p {
      color: #535564;
    }

    @media (min-width: 1025px) {
      justify-content: center;
      margin-top: 4rem;

    }

`;

export const ButtonSection = styled.section`

    margin-top: 0.5rem;

`;

export const Container = styled.div`

  display: flex;
  justify-content: center;

@media (min-width: 1025px) {
  align-items: center;
  margin-top: 2rem;
}
  
`;

export const StyledIcon = styled(Icon)`
  color: #B84032;
  font-size: 20rem;
  margin: 0;
  padding: 0;
  

  @media (min-width: 1025px) {

    font-size: 30rem;
  
  }

`;