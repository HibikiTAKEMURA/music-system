import styled from 'styled-components';

const StyledFooter = styled.footer`
  margin-top: auto;
  bottom: 0;
  width: 100%;
  height: 68px;
  text-align: center;
  background-color: #242424;
  padding: 0.5rem 0;
  font-size: 0.9rem;
  color: #888;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>&copy; {new Date().getFullYear()} Hibiki TAKEMURA. All rights reserved.</p>
    </StyledFooter>
  );
};

export default Footer;
