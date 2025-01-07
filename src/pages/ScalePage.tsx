import { useCallback, useState } from 'react'
import '../App.css'
import styled from "styled-components"

import { Scale } from "tonal";
import * as Tone from 'tone'
import Content from '../components/atoms/Content';

const screenWidth = document.documentElement.clientWidth;

const NoteStyle = styled.div`

`;

const NoteSelectStyle = styled.select`
  width: 48px;
  height: 32px;
  font-size: 12pt;
`;

const ScaleSelectStyle = styled.select`
  width: 192px;
  height: 32px;
  font-size: 12pt;
`;

const OctaveSelectStyle = styled.select`
  width: 48px;
  height: 36px;
  font-size: 12pt;
`;

const PlayButtonStyle = styled.button`
  width: 96px;
  height: 40px;
  font-size: 12pt;
  vertical-align: middle;
  align-items: top;
`;

const FormSpace = styled.span`
  margin: 4px;
`;

const FormSpaceV = styled.div`
  padding: 4px;
`;

const NotesStringStyle = styled.div`
  // width: 300px;
  width: ${(screenWidth >= 300 ? '300px' : '100%')};
  overflow-x: auto; /* 横方向のスクロールを有効化 */
  overflow-y: hidden; /* 縦方向のスクロールを非表示 */
  white-space: nowrap; /* コンテンツの折り返しを防ぐ */
  box-sizing: border-box; /* パディングやボーダーを幅に含める */
  p {
    font-size: 26pt;
    font-weight: bold;
  }

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
  const scaleNotesString = Scale.get(nowNote + " " + nowScale).notes.join(',');
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
          <h1>Scale</h1>
          <NoteStyle>
              <NoteSelectStyle onChange={ (e) => setNowNote(e.target.value) }>
                {notes.map((note) =>
                  <option value={note} key={note}>{note}</option>
                )}
              </NoteSelectStyle>
              <FormSpace />
              <ScaleSelectStyle onChange={ (e) => setNowScale(e.target.value)}>
                {scales.map((scale) =>
                  <option value={scale} key={scale}>{scale}</option>
                )}
              </ScaleSelectStyle>
              <NotesStringStyle>
                <p>{ scaleNotesString }</p>
              </NotesStringStyle>
              <FormSpaceV />
              <OctaveSelectStyle onChange={ (e) => setNowOctave(parseInt(e.target.value))}>
                {octaves.map((octave) =>
                  <option value={octave} key={octave}>{ octave}</option>
                )}
              </OctaveSelectStyle>
              <FormSpace />
              <PlayButtonStyle onClick={ playScale }>
                Play
              </PlayButtonStyle>
          </NoteStyle>
        </Content>
    );
    
};


export default ScalePage; 