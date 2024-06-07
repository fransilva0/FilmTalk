import styled from 'styled-components';

export const CommonStyling = styled.button`
    font-size: 1rem;
    line-height: center;
    padding: 0.5rem 2rem 0.5rem 2rem;
    cursor: pointer;

`;

export const ButtonloginStyled = styled(CommonStyling)`
    background: #040404;
    border-radius: 0.5rem;
    border: 4px solid #040404;
    color: #FFF8F8;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
    }

    &:focus {
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
    }
`;

export const ButtonregisterStyled = styled(CommonStyling)`
    background: #B84032;
    border-radius: 0.5rem;
    border: none;
    color: #fff;
    font-weight: bold;
    padding: 1rem;
    
    &:hover {
      background-image: linear-gradient(90deg, #DF8271, #B84032);
      animation: slide 0.5s linear;
      background-size: 200% 100%;
      border: none;
      transition: background-position 0.3s ease;
    }

    @keyframes slide {
      0% {
        background-position: 100% 0;
      }
      100% {
        background-position: 0 0;
      }
    }

`;

export const Button = styled(ButtonregisterStyled)`
    color: #fff;
    position: relative;
    overflow: hidden;
    border: none;
    margin: 0.5rem;

    &:hover {
      background-image: linear-gradient(90deg, #DF8271, #B84032);
      animation: slide 0.5s linear;
      background-size: 200% 100%;
      color: #fff;
      border: none;
      transition: background-position 0.3s ease;
    }

    @keyframes slide {
      0% {
        background-position: 100% 0;
      }
      100% {
        background-position: 0 0;
      }
    }

    
`;