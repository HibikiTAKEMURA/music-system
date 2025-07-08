import styles from './ChordFunctionContent.module.css';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useCallback, useMemo, useState } from 'react';
import { Type } from '@/type/music/chord';
import { MAJOR } from '@/constants/chord';
import { NOTES, TYPES } from '@/constants/music';
import TableTitle from '@/components/atoms/TableTitle/TableTitle';
import InputRow from '@/components/atoms/InputRow/InputRow';
import InputBox from '@/components/atoms/InputBox/InputBox';
import InputLabel from '@/components/atoms/InputLabel/InputLabel';
import FormSpace from '@/components/atoms/FormSpace/FormSpace';
import PlayButtonStyle from '@/components/atoms/PlayButtonStyle/PlayButtonStyle';
import * as Tone from 'tone'
import { Chord } from "tonal";


const screenWidth = document.documentElement.clientWidth;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: screenWidth < 450 ? 14 : 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: screenWidth < 450 ? 14 : 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: '#202020',
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const synth = new Tone.PolySynth().toDestination();

function ChordFunctionContent() {
  const [selectedNote, setSelectedNote] = useState<string>('C');
  const [selectedChord, setSelectedChord] = useState<Type>('maj');

  const displayMajorKeyChords = useMemo(() => {
    return MAJOR.filter((chord) => chord.type === selectedChord);
  }, [selectedChord]);

  const displayMinorKeyChords = useMemo(() => {
    return MAJOR.filter((chord) => chord.type === selectedChord);
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
      <InputRow>
        <InputBox>
          <PlayButtonStyle onClick={playChord}>
            Play
          </PlayButtonStyle>
        </InputBox>
      </InputRow>
      <div className={screenWidth < 450 ? styles.spWidth : styles.fullWidth}>
        <TableContainer sx={{width: screenWidth < 450 ? '640px' : '80%'}} >
          <TableTitle>Major Key</TableTitle>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Key</StyledTableCell>
                <StyledTableCell align="left">Degree Name</StyledTableCell>
                <StyledTableCell align="left">Function</StyledTableCell>
                <StyledTableCell align="left">Modality</StyledTableCell>
                <StyledTableCell align="left">Scale</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayMajorKeyChords.map((chord) => (
                <StyledTableRow key={chord.degreeName}>
                  <StyledTableCell scope="row">
                    {getKey(chord.numberOfSeminotes)}
                  </StyledTableCell>
                  <StyledTableCell align="left">{chord.degreeName}</StyledTableCell>
                  <StyledTableCell align="left">{chord.function}</StyledTableCell>
                  <StyledTableCell align="left">{chord.modality}</StyledTableCell>
                  <StyledTableCell align="left">{chord.scales}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          {/* <TableTitle>Minor Key</TableTitle>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Key</StyledTableCell>
                <StyledTableCell align="left">Degree Name</StyledTableCell>
                <StyledTableCell align="left">Function</StyledTableCell>
                <StyledTableCell align="left">Modality</StyledTableCell>
                <StyledTableCell align="left">Scale</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayMinorKeyChords.map((chord) => (
                <StyledTableRow key={chord.degreeName}>
                  <StyledTableCell scope="row">
                    {getKey(chord.numberOfSeminotes)}
                  </StyledTableCell>
                  <StyledTableCell align="left">{chord.degreeName}</StyledTableCell>
                  <StyledTableCell align="left">{chord.function}</StyledTableCell>
                  <StyledTableCell align="left">{chord.modality}</StyledTableCell>
                  <StyledTableCell align="left">{chord.scales}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table> */}
        </TableContainer>
      </div>
    </>
  );
}

export default ChordFunctionContent;