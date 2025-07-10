import styles from './ChordFunctionContent.module.css';
import TableContainer from '@mui/material/TableContainer';
import { useCallback, useMemo } from 'react';
import { Type } from '@/type/music/chord';
import { MAJOR, MINOR } from '@/constants/chord';
import { NOTES, TYPES } from '@/constants/music';
import InputRow from '@/components/atoms/InputRow/InputRow';
import InputBox from '@/components/atoms/InputBox/InputBox';
import InputLabel from '@/components/atoms/InputLabel/InputLabel';
import FormSpace from '@/components/atoms/FormSpace/FormSpace';
import PlayButtonStyle from '@/components/atoms/PlayButtonStyle/PlayButtonStyle';
import * as Tone from 'tone'
import { Chord } from "tonal";
import ChordFunctionTable from '@/components/chord/ChordFunctionTable/ChordFunctionTable';

type ChordFunctionContentProps = {
  selectedNote: string;
  setSelectedNote: (note: string) => void;
  selectedChord: Type;
  setSelectedChord: (chord: Type) => void;
  synth: Tone.PolySynth<Tone.Synth<Tone.SynthOptions>>;
};

const screenWidth = document.documentElement.clientWidth;

function ChordFunctionContent({selectedNote, setSelectedNote, selectedChord, setSelectedChord, synth}: ChordFunctionContentProps) {

  const displayMajorKeyChords = useMemo(() => {
    return MAJOR.filter((chord) => chord.type === selectedChord);
  }, [selectedChord]);

  const displayMinorKeyChords = useMemo(() => {
    return MINOR.filter((chord) => chord.type === selectedChord);
  }, [selectedChord]);

  const selectedChordNotes = useMemo(() => {
    return Chord.get(`${selectedNote}${selectedChord}`).notes.join(', ');
  }, [Chord, selectedNote, selectedChord]);

  // キーを取得する関数
  const getKey = useCallback((numberOfSeminotes: number) => {
    const index = NOTES.indexOf(selectedNote);
    if (index === -1) return '';
    const keyIndex = (index - numberOfSeminotes + NOTES.length) % NOTES.length;

    return NOTES[keyIndex];
  }, [selectedNote]);

  const playChord = useCallback(() => {
    const chordNotes = Chord.notes(selectedChord, `${selectedNote}4`);
    synth.triggerAttackRelease(chordNotes, 0.5);
  }, [selectedNote, selectedChord]);

  return (
    <>
      <InputRow>
        <InputBox>
          <InputLabel htmlFor='note'>Note</InputLabel>
          <select className={styles.noteSelect} id='note' onChange={ (e) => setSelectedNote(e.target.value) }>
            {NOTES.map((note) =>
              <option value={note} key={note}>{note}</option>
            )}
          </select>
        </InputBox>              
        <FormSpace />
        <InputBox>
          <InputLabel htmlFor='scale'>Scale</InputLabel>
          <select className={styles.typeSelect} id='scale' onChange={ (e) => setSelectedChord(e.target.value)}>
            {TYPES.map((type) =>
              <option value={type} key={type}>{type}</option>
            )}
          </select>
        </InputBox>
      </InputRow>
      <div className={styles.chordNotes}>
        <p>{selectedChordNotes}</p>
      </div>
      <FormSpace />
      <InputRow>
        <InputBox>
          <PlayButtonStyle onClick={playChord}>
            Play
          </PlayButtonStyle>
        </InputBox>
      </InputRow>
      <div className={screenWidth < 450 ? styles.spWidth : styles.fullWidth}>
        <TableContainer sx={{width: screenWidth < 450 ? '640px' : '80%'}} >
          <ChordFunctionTable
            title="Major Key"
            chords={displayMajorKeyChords}
            getKey={getKey}
          />
          <ChordFunctionTable
            title="Minor Key"
            chords={displayMinorKeyChords}
            getKey={getKey}
          />
        </TableContainer>
      </div>
    </>
  );
}

export default ChordFunctionContent;