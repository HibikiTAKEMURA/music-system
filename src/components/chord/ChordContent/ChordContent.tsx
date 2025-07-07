import '@/App.css'
import styles from './ChordContent.module.css'
import Content from '@/components/atoms/Content';


const screenWidth = document.documentElement.clientWidth;

const ChordContent = () => {

    return (
        <Content>
          <div className={styles.noteStyle}>
            <h1>Chord</h1>
          </div>
        </Content>
    );
};


export default ChordContent;