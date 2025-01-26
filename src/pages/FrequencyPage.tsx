import { useCallback, useEffect, useRef, useState } from 'react'
import '../App.css'
import styled from "styled-components"

import { Note, Scale } from "tonal";
import * as Tone from 'tone'
import Content from '../components/atoms/Content';
import abcjs from 'abcjs';
import { NOTES, OCTAVES, SCALES, STANDARD_PITCH } from '../constants/music';

const screenWidth = document.documentElement.clientWidth;

const NoteStyle = styled.div`
  padding: 48px 16px;
`;

const NoteSelectStyle = styled.select`
  width: 48px;
  height: 36px;
  font-size: 14pt;
`;

const OctaveSelectStyle = styled.select`
  width: 48px;
  height: 36px;
  font-size: 14pt;
`;

const InputPitch = styled.input`
  width: 300px
`;

const PitchDisplay = styled.p`
  font-size: 32px;
  font-weight: bold;
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
  padding: 16px;
`;

const NotesStringStyle = styled.div`
  display: flex;
  justify-content: center;
  width: ${(screenWidth <= 400 ? '300px' : '100%')};
  overflow-x: auto; /* 横方向のスクロールを有効化 */
  overflow-y: hidden; /* 縦方向のスクロールを非表示 */
  white-space: nowrap; /* コンテンツの折り返しを防ぐ */
  box-sizing: border-box; /* パディングやボーダーを幅に含める */
  p {
    font-size: ${(screenWidth <= 400 ? '20pt' : '28pt')};
    font-weight: bold;
  }
`;

const NotesStringDiv = styled.div`
  text-align: left;
  width: 400px;
  padding: 0 16px;
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

const defaultVolume = -8;

const FrequencyPage = () => {
  const [nowNote, setNowNote] = useState("C");
  const [nowOctave, setNowOctave] = useState(4);
  const [nowNoteNum, setNowNoteNum] = useState(60);
  const [nowFrequency, setNowFrequency] = useState(261.63);
  const [nowPitch, setNowPitch] = useState(440);
  const [isPlaying, setIsPlaying] = useState(false);

  const oscillatorRef = useRef<Tone.Oscillator | null>(null); // オシレーターの参照

  // 初期化処理とクリーンアップ
  useEffect(() => {
    const volume = new Tone.Volume(defaultVolume).toDestination(); // 音量を設定
    // オシレーターの初期化
    const oscillator = new Tone.Oscillator(nowFrequency, 'sine').toDestination().connect(volume);
    oscillatorRef.current = oscillator;
    oscillatorRef.current.volume.rampTo(-Infinity, 0); // 徐々に音量を下げる

    // コンポーネントのアンマウント時にオシレーターを停止
    return () => {
      oscillator.stop();
      oscillator.dispose();
    };
  }, []);

  // 周波数の変更を監視
  useEffect(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.frequency.setValueAtTime(nowFrequency, Tone.now());
    }
  }, [nowFrequency]);

  useEffect(() => {
    setNowNoteNum(Number(Note.midi(nowNote + nowOctave)));
  }, [nowNote, nowOctave]);

  useEffect(() => {
    setNowFrequency(calcFreq(nowNoteNum, nowPitch));
  }, [nowNoteNum, nowPitch]);

  // const playScale = useCallback(() => {
  //   const now = Tone.now();
  //   scaleNotesArray.map((scaleNote, index)=>
  //     synth.triggerAttackRelease(scaleNote, "8n", now + noteLength * index)
  //   );
  //   synth.triggerAttackRelease(nowNote + (nowOctave+1) , "8n", now + noteLength * scaleNotesArray.length)
  // }, [scaleNotesArray, nowNote, nowOctave]);


  // 再生の制御
  const togglePlay = () => {
    if (oscillatorRef.current) {
      if (isPlaying) {
        // 音量を徐々に下げて停止
        oscillatorRef.current.volume.rampTo(-Infinity, 0.5); // 0.5秒で音量を徐々に下げる
        setTimeout(() => {
          oscillatorRef.current?.stop();
        }, 500); // 音量がゼロになった後に停止
      } else {
        oscillatorRef.current.volume.rampTo(defaultVolume, 0.2); // 再生時は音量を徐々に戻す
        oscillatorRef.current.start();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const calcFreq = (noteNumber: number, basePitch: number): number => {
    // A4のMIDIノートナンバーは69
    const semitoneDifference = noteNumber - 69;
    // 周波数を計算
    const frequency = basePitch * Math.pow(2, semitoneDifference / 12);
    // 小数第3位で四捨五入して返す
    return Math.round(frequency * 100) / 100;
  };
  

    return (
        <Content>        
          <NoteStyle>
            <h1>
              Frequency<br/>
              And<br/>
              NoteNumber
            </h1>
            <InputBox>
              <PitchDisplay>{ nowPitch + 'Hz'}</PitchDisplay>
              <InputPitch type="range" defaultValue={440} min={437} max={445} id="temp" name="temp" list="markers" onChange={(e) => setNowPitch(Number(e.target.value))} />
              <datalist id="markers">
                {STANDARD_PITCH.map((standardPitch) =>
                  <option value={standardPitch} key={standardPitch}></option>
                )}
              </datalist>
            </InputBox>
            <FormSpaceV />
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
                <InputLabel htmlFor='octave'>Octave</InputLabel>
                <OctaveSelectStyle id='octave' defaultValue={4} onChange={ (e) => setNowOctave(parseInt(e.target.value))}>
                  {OCTAVES.map((octave) =>
                    <option value={octave} key={octave}>{octave}</option>
                  )}
                </OctaveSelectStyle>
              </InputBox>
            </InputRow>
            <FormSpaceV />
            <NotesStringStyle>
              <NotesStringDiv>
                <p>{ 'Note Number: ' + nowNoteNum }</p>
                <p>{ 'Frequency: ' + nowFrequency + 'Hz' }</p>
              </NotesStringDiv>
            </NotesStringStyle>
            <InputRow>
              <InputBox>
                <PlayButtonStyle onClick={togglePlay} >
                  { isPlaying ? 'Stop' : 'Play' }
                </PlayButtonStyle>
              </InputBox>
            </InputRow>
          </NoteStyle>
        </Content>
    );
    
};


export default FrequencyPage; 