import '../App.css'
import Footer from '../components/atoms/Footer';
import Container from '../components/atoms/Container';


const DefaultPage = (props: { children: React.ReactNode }) => {

    return (
    <>
        <Container>
            {props.children}
            <Footer />
        </Container>
    </>
    );
};


export default DefaultPage; 