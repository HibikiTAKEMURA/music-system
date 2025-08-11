import IrealContentFooter from '@/components/ireal/IrealContentFooter/IrealContentFooter';
import styles from './IrealContent.module.css';
import IrealSong from '@/components/ireal/IrealSong/IrealSong';
import { useAtom } from 'jotai';
import { scoreDataAtom } from '@/jotais/default';
import { useEffect } from 'react';
import getScoreData from '@/helper/getScoreData';


export default function IrealContent() {
  const [rows, setRows] = useAtom(scoreDataAtom);

  useEffect(() => {
    if (rows.length !== 0) {
      return; // 既にデータがある場合は再取得しない
    }
    getScoreData().then((data) => {
      if (data) {
        setRows(data);
      } else {
        console.error('Failed to fetch score data');
      }
    });
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.topSpacer}></div>
      <h2>iReal Data</h2>
      {
        rows
          .filter((row) => Boolean(row.irealUrl))
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((row, index) => (
            <IrealSong
              key={index}
              title={row.title}
              composer={row.composer}
              url={row.irealUrl!}
            />
          ))
      }
      <IrealContentFooter />
    </div>
  );
}