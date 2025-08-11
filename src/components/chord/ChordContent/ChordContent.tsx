import '@/App.css';
import styles from './ChordContent.module.css';
import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import ChordFunctionContent from '@/components/chord/ChordFunctionContent/ChordFunctionContent';
import { Type } from '@/type/music/chord';
import AvailableChordContent from '@/components/chord/AvailableChordContent/AvailableChordContent';
import * as Tone from 'tone';


const screenWidth = document.documentElement.clientWidth;
const synth = new Tone.PolySynth().toDestination();

function ChordContent() {
  const [value, setValue] = useState(0);
  const [selectedNote, setSelectedNote] = useState<string>('C');
  const [selectedChord, setSelectedChord] = useState<Type>('maj');
  const [selectedKey, setSelectedKey] = useState<string>('C');
  const [selectedFunction, setSelectedFunction] = useState<string>('');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={styles.noteStyle}>
      <div className={styles.content}>
        <h1>Chord</h1>
      </div>
      <Box
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
          <Tab value={1} label="Available Chord" sx={{fontSize: screenWidth < 450 ? '14px' : '20px'}} />
        </Tabs>
      </Box>
      <div className={styles.tabContent}>
        {value === 0 && (
          <ChordFunctionContent
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
            selectedChord={selectedChord}
            setSelectedChord={setSelectedChord}
            synth={synth}
          />
        )}
        {value === 1 && (
          <AvailableChordContent
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
            synth={synth}
            selectedFunction={selectedFunction}
            setSelectedFunction={setSelectedFunction}
          />)}
      </div>
    </div>
  );
};


export default ChordContent;