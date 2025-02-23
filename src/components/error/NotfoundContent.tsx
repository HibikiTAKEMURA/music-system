import { styled } from 'styled-components';
import '../../App.css'
import Container from '../atoms/Container';
import Content from '../atoms/Content';
import Footer from '../atoms/Footer';

const NotFoundContainer = styled.div`
    margin: 0 auto;
`;

const NotfoundContent = () => {

    return (
    <>
        <Container>
            <Content>
                <NotFoundContainer>
                    <h1>ページが見つかりません</h1>
                    <a className="read-the-docs" href="/music-system/#/home">
                        ホームに戻る
                    </a>
                </NotFoundContainer>
            </Content>
            <Footer />
        </Container>
    </>
    );
    
};


export default NotfoundContent; 