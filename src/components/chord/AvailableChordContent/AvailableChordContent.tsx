import InputBox from "@/components/atoms/InputBox/InputBox";
import InputLabel from "@/components/atoms/InputLabel/InputLabel";
import InputRow from "@/components/atoms/InputRow/InputRow";
import { FUNCTIONS, NOTES } from "@/constants/music";
import { Type } from "@/type/music/chord";
import { useCallback, useMemo } from "react";
import { Chord } from "tonal";
import * as Tone from 'tone';
import styles from './AvailableChordContent.module.css';
import { MAJOR_3, MAJOR_4, MINOR_3, MINOR_4 } from "@/constants/chord";
import AvailableChordTable from "@/components/chord/AvailableChordTable/AvailableChordTable";
import FormSpace from "@/components/atoms/FormSpace/FormSpace";
import { TableContainer } from "@mui/material";

const screenWidth = document.documentElement.clientWidth;

type AvailableChordContentProps = {
  selectedKey: string;
  setSelectedKey: (key: string) => void;
  synth: Tone.PolySynth<Tone.Synth<Tone.SynthOptions>>;
  selectedFunction: string;
  setSelectedFunction: (func: string) => void;
};

function AvailableChordContent({ selectedKey, setSelectedKey, synth, selectedFunction, setSelectedFunction }: AvailableChordContentProps) {

  const displayMajorKeyChords4 = useMemo(() => {
    return selectedFunction === ''
      ? MAJOR_4
      : MAJOR_4.filter((chord) => chord.function === selectedFunction);
  }, [selectedFunction]);

  const displayMajorKeyChords3 = useMemo(() => {
    return selectedFunction === ''
      ? MAJOR_3
      : MAJOR_3.filter((chord) => chord.function === selectedFunction);
  }, [selectedFunction]);

  const displayMinorKeyChords4 = useMemo(() => {
    return selectedFunction === ''
      ? MINOR_4
      : MINOR_4.filter((chord) => chord.function === selectedFunction);
  }, [selectedFunction]);

  const displayMinorKeyChords3 = useMemo(() => {
    return selectedFunction === ''
      ? MINOR_3
      : MINOR_3.filter((chord) => chord.function === selectedFunction);
  }, [selectedFunction]);


  // キーを取得する関数
  const getChordName = useCallback((numberOfSeminotes: number, type: Type) => {
    const index = NOTES.indexOf(selectedKey);
    if (index === -1) return '';
    const keyIndex = (index + numberOfSeminotes + NOTES.length) % NOTES.length;

    return NOTES[keyIndex] + type;
  }, [selectedKey]);

  // コードを再生する関数
  const playChord = useCallback((numberOfSeminotes: number, type: Type) => {
    const index = (NOTES.indexOf(selectedKey) + numberOfSeminotes) % NOTES.length;
    const octave = Math.floor((NOTES.indexOf(selectedKey) + numberOfSeminotes) / NOTES.length);
    if (index === -1) return;
    const chordNotes = Chord.notes(type, `${NOTES[index]}${octave + 4}`);
    synth.triggerAttackRelease(chordNotes, 0.5);
  }, [synth, selectedKey]);

  return (
    <>
      <InputRow>
        <InputBox>
          <InputLabel htmlFor='key'>Key</InputLabel>
          <select className={styles.keySelect} id='key' defaultValue={selectedKey} onChange={ (e) => setSelectedKey(e.target.value) }>
            {NOTES.map((note) =>
              <option value={note} key={note}>{note}</option>
            )}
          </select>
        </InputBox>
        <FormSpace />
        <InputBox>
          <InputLabel htmlFor='function'>Function</InputLabel>
          <select className={styles.functionSelect} id='function' defaultValue={selectedFunction} onChange={ (e) => setSelectedFunction(e.target.value) }>
            <option value={''} key={''}></option>
            {FUNCTIONS.map((func) =>
              <option value={func} key={func}>{func}</option>
            )}
          </select>
        </InputBox>
      </InputRow>
      <div className={screenWidth < 450 ? styles.spWidth : styles.fullWidth}>
        <TableContainer sx={{width: screenWidth < 450 ? '800px' : '80%'}} >
          <AvailableChordTable
            title="Major Key Tetrad"
            chords={displayMajorKeyChords4}
            getChordName={getChordName}
            playChord={playChord}
          />
          <AvailableChordTable
            title="Major Key Triad"
            chords={displayMajorKeyChords3}
            getChordName={getChordName}
            playChord={playChord}
          />
          <AvailableChordTable
            title="Minor Key Tetrad"
            chords={displayMinorKeyChords4}
            getChordName={getChordName}
            playChord={playChord}
          />
          <AvailableChordTable
            title="Minor Key Triad"
            chords={displayMinorKeyChords3}
            getChordName={getChordName}
            playChord={playChord}
          />
        </TableContainer>
      </div>
    </>
  );
}

export default AvailableChordContent;