import styled from 'styled-components';

export const CommonStyling = styled.header`
  padding: 2rem;
  background: linear-gradient(90deg, #B84032, #535564);

  h1 {
    color: #FFF8F8;
    font-size: 2rem;
  }

`;

export const HeaderHomeStyled = styled(CommonStyling)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
`;

export const HeaderLoginLogoutStyled = styled(CommonStyling)`
    display: flex;
    justify-content: center;
`;