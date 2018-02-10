import styled from 'styled-components';

export default styled.section`
  width: 95%;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
  font-size: 2rem;
  font-family: ${({ theme }) => theme.font};
  & p,
  & nav {
    margin-top: 0;
    text-align: center;
  }
`;
