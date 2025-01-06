import '../../App.css'
import Container from '../../components/atoms/Container';
import Content from '../../components/atoms/Content';
import Footer from '../../components/atoms/Footer';


const Notfound = () => {

    return (
    <>
        <Container>
            <Content>
                <h1>ページが見つかりません</h1>
                <a className="read-the-docs" href="/home">
                    ホームに戻る
                </a>
            </Content>
        </Container>
        <Footer />
    </>
    );
    
};


export default Notfound; 