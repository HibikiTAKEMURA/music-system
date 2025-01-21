import React, { useState, useEffect } from 'react';
import abcjs from 'abcjs';

const ScorePageSample = () => {
  // CメジャースケールのABC記述をステートで管理
  const [abcString, setAbcString] = useState('X:1\nL:1/4\nK:C\nC^^DE__AB|');

  useEffect(() => {
    // ステートが変更されるたびに楽譜を再描画
    abcjs.renderAbc('sheet-music', abcString);
  }, [abcString]);

  return (
    <div>
      <h2>Cメジャースケールの音階</h2>
      <div id="sheet-music"></div>
      <button onClick={() => setAbcString('X:1\nT:C Major Scale\nM:C|\nL:1/4\nK:C\ncdefgabc\'|')}>
        変更
      </button>
    </div>
  );
};

export default ScorePageSample;