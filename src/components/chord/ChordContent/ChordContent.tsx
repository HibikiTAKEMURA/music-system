import '@/App.css'
import styles from './ChordContent.module.css'
import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import ChordFunctionContent from '@/components/chord/ChordFunctionContent/ChordFunctionContent';
import MajorKeyContent from '@/components/chord/MajorKeyContent/MajorKeyContent';
import MinorKeyContent from '@/components/chord/MinorKeyContent/MinorKeyContent';
import { Type } from '@/type/music/chord';


const screenWidth = document.documentElement.clientWidth;

function ChordContent() {
  const [value, setValue] = useState(0);
  const [selectedNote, setSelectedNote] = useState<string>('C');
  const [selectedChord, setSelectedChord] = useState<Type>('maj');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={styles.noteStyle}>
      <div className={styles.content}>
        <h1>Chord</h1>
      </div>
      {/* <Box
        sx={{
          width: screenWidth < 450 ? '320px' : screenWidth < 800 ? '425px' : '100%',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="Chord Tabs"
          centered={screenWidth > 450}
        >
          <Tab value={0} label="Chord Function" sx={{fontSize: screenWidth < 450 ? '14px' : '20px'}}/>
          <Tab value={1} label="Major Key" sx={{fontSize: screenWidth < 450 ? '14px' : '20px'}} />
          <Tab value={2} label="Minor Key" sx={{fontSize: screenWidth < 450 ? '14px' : '20px'}} />
        </Tabs>
      </Box> */}
      <div className={styles.tabContent}>
        {value === 0 && (
          <ChordFunctionContent
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
            selectedChord={selectedChord}
            setSelectedChord={setSelectedChord}
          />
        )}
        {value === 1 && <MajorKeyContent />}
        {value === 2 && <MinorKeyContent />}
      </div>
    </div>
  );
};


export default ChordContent;