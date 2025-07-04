import { useCallback, useEffect, useState } from 'react'
import '@/App.css'
import styled from "styled-components"

import { Scale } from "tonal";
import * as Tone from 'tone'

import abcjs from 'abcjs';
import { NOTES, OCTAVES, SCALES } from '@/constants/music';
import Content from '@/components/atoms/Content';

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

const NotesSheetStyle = styled.div`
  overflowX: 'scroll';
  width: ${(screenWidth <= 800 ? '800px' : '100%')};
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

const synth = new Tone.Synth().toDestination();
const noteLength = 0.5;

const ScaleContent = () => {
  const [nowNote, setNowNote] = useState("C");
  const [nowScale, setNowScale] = useState("ionian");
  const [nowOctave, setNowOctave] = useState(4);

  const scaleNotesString = Scale.get(nowNote + " " + nowScale).notes.join(' ');
  const scaleNotesArray = Scale.get(nowNote + nowOctave + " " + nowScale).notes;
  const scaleNotesScoreArray = Scale.get(nowNote + 4 + " " + nowScale).notes;

  // CメジャースケールのABC記述をステートで管理
  const [abcString, setAbcString] = useState('');

  useEffect(() => {
    const noteString = [];
    for (let i = 0; i < scaleNotesScoreArray.length; i++) {
      if (scaleNotesScoreArray[i].includes('5')) {
        scaleNotesScoreArray[i] = scaleNotesScoreArray[i].toLowerCase();
      }
      scaleNotesScoreArray[i] = scaleNotesScoreArray[i].replace('4', '').replace('5', '');
      if (scaleNotesScoreArray[i].length > 1 ) {
        // 文字列が2文字以上の時：臨時記号あり
        noteString.push(scaleNotesScoreArray[i].substring(1) + scaleNotesScoreArray[i].substring(0, 1));
      } else {
        noteString.push(scaleNotesScoreArray[i]);
      }
    }
    setAbcString('X:1\nL:1/4\nK:C\n' + noteString.join('').replace(/#/g, "^").replace(/b/g, '_') + '|');
  });

  useEffect(() => {
    // ステートが変更されるたびに楽譜を再描画
    abcjs.renderAbc('sheet-music', abcString, {
      selectionColor: '#EEEEEE',
      scale: (screenWidth >= 400 ? 1.5 : 1),
    });
  }, [abcString]);

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
                  {NOTES.map((note) =>
                    <option value={note} key={note}>{note}</option>
                  )}
                </NoteSelectStyle>
              </InputBox>              
              <FormSpace />
              <InputBox>
                <InputLabel htmlFor='scale'>Scale</InputLabel>
                <ScaleSelectStyle id='scale' onChange={ (e) => setNowScale(e.target.value)}>
                  {SCALES.map((scale) =>
                    <option value={scale} key={scale}>{scale}</option>
                  )}
                </ScaleSelectStyle>
              </InputBox>
            </InputRow>

            <NotesStringStyle>
              <p>{ scaleNotesString }</p>
            </NotesStringStyle>
            <NotesStringStyle>
              <NotesSheetStyle id="sheet-music"></NotesSheetStyle>
            </NotesStringStyle>
            <FormSpaceV />
            <InputRow>
              <InputBox>
                <InputLabel htmlFor='octave'>Octave</InputLabel>
                <OctaveSelectStyle id='octave' defaultValue={4} onChange={ (e) => setNowOctave(parseInt(e.target.value))}>
                  {OCTAVES.map((octave) =>
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


export default ScaleContent; 