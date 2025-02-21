import '../../App.css'
import Container from '../atoms/Container';
import Content from '../atoms/Content';
import Footer from '../atoms/Footer';


const NotfoundContent = () => {

    return (
    <>
        <Container>
            <Content>
                <h1>ページが見つかりません</h1>
                <a className="read-the-docs" href="/music-system/#/home">
                    ホームに戻る
                </a>
            </Content>
            <Footer />
        </Container>
    </>
    );
    
};


export default NotfoundContent; 