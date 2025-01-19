import { useCallback, useState } from 'react'
import '../App.css'
import styled from "styled-components"

import { Scale } from "tonal";
import * as Tone from 'tone'
import Content from '../components/atoms/Content';

const screenWidth = document.documentElement.clientWidth;

const NoteStyle = styled.div`
  padding: 48px 16px;
`;

const NoteSelectStyle = styled.select`
  width: 48px;
  height: 32px;
  font-size: 14pt;
`;

const ScaleSelectStyle = styled.select`
  width: 192px;
  height: 32px;
  font-size: 13pt;
`;

const OctaveSelectStyle = styled.select`
  width: 48px;
  height: 36px;
  font-size: 14pt;
`;

const PlayButtonStyle = styled.button`
  width: 96px;
  height: 40px;
  font-size: 12pt;
  vertical-align: middle;
  font-weight: 400;
  margin-top: 26px;
`;

const FormSpace = styled.span`
  margin: 4px;
`;

const FormSpaceV = styled.div`
  padding: 4px;
`;

const NotesStringStyle = styled.div`
  width: ${(screenWidth <= 400 ? '300px' : '100%')};
  overflow-x: auto; /* 横方向のスクロールを有効化 */
  overflow-y: hidden; /* 縦方向のスクロールを非表示 */
  white-space: nowrap; /* コンテンツの折り返しを防ぐ */
  box-sizing: border-box; /* パディングやボーダーを幅に含める */
  p {
    font-size: 26pt;
    font-weight: bold;
  }
`;

const InputLabel = styled.label`
  font-size: 16px;
  margin-bottom: 4px;
  margin-left: 2px;
  display: block;
  text-align: left;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;       /* 必要に応じて変更 */
`;

const InputBox = styled.div`
  display: block;
`;

const notes =  ["C","Db","D","Eb","E","F","F#","G","Ab","A","Bb","B",];
const octaves = [2,3,4,5,6];
const scales = ["Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian","Harmonic Minor","Melodic Minor","Phrygian Dominant","Major Pentatonic","Minor Pentatonic","Whole Tone","Chromatic","Whole-Half Diminished","Half-Whole Diminished","Altered"];
const synth = new Tone.Synth().toDestination();
let noteLength = 0.5;

const ScalePage = () => {
  const [nowNote, setNowNote] = useState("C");
  const [nowScale, setNowScale] = useState("ionian");
  const [nowOctave, setNowOctave] = useState(4);
  const scaleNotesString = Scale.get(nowNote + " " + nowScale).notes.join(' ');
  const scaleNotesArray = Scale.get(nowNote + nowOctave + " " + nowScale).notes;

  const playScale = useCallback(() => {
    const now = Tone.now();
    scaleNotesArray.map((scaleNote, index)=>
      synth.triggerAttackRelease(scaleNote, "8n", now + noteLength * index)
    );
    synth.triggerAttackRelease(nowNote + (nowOctave+1) , "8n", now + noteLength * scaleNotesArray.length)
  }, [scaleNotesArray, nowNote, nowOctave]);

    return (
        <Content>        
          <NoteStyle>
            <h1>Scale</h1>
            <InputRow>
              <InputBox>
                <InputLabel htmlFor='note'>Note</InputLabel>
                <NoteSelectStyle id='note' onChange={ (e) => setNowNote(e.target.value) }>
                  {notes.map((note) =>
                    <option value={note} key={note}>{note}</option>
                  )}
                </NoteSelectStyle>
              </InputBox>              
              <FormSpace />
              <InputBox>
                <InputLabel htmlFor='scale'>Scale</InputLabel>
                <ScaleSelectStyle id='scale' onChange={ (e) => setNowScale(e.target.value)}>
                  {scales.map((scale) =>
                    <option value={scale} key={scale}>{scale}</option>
                  )}
                </ScaleSelectStyle>
              </InputBox>
            </InputRow>

            <NotesStringStyle>
              <p>{ scaleNotesString }</p>
            </NotesStringStyle>
            <FormSpaceV />
            <InputRow>
              <InputBox>
                <InputLabel htmlFor='octave'>Octave</InputLabel>
                <OctaveSelectStyle id='octave' defaultValue={4} onChange={ (e) => setNowOctave(parseInt(e.target.value))}>
                  {octaves.map((octave) =>
                    <option value={octave} key={octave}>{octave}</option>
                  )}
                </OctaveSelectStyle>
              </InputBox>
              <FormSpace />
              <InputBox>
                <PlayButtonStyle onClick={ playScale }>
                  Play
                </PlayButtonStyle>
              </InputBox>
            </InputRow>
          </NoteStyle>
        </Content>
    );
    
};


export default ScalePage; 