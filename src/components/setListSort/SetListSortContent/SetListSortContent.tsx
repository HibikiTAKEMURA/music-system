import SetListSortTextInput from '@/components/setListSort/SetListSortTextInput/SetListSortTextInput';
import styles from './SetListSortContent.module.css';
import { useEffect, useMemo, useState } from 'react';

export default function SetListSortContent() {
  const [formText, setFormText] = useState('');

  const titles = useMemo(() => {
    return formText.split('\n').filter(line => line !== '');
  }, [formText]);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setFormText(event.target.value);
  }

  return (
  <div className={styles.body}>
    <div className={styles.topSpacer}></div>
    <h2>Set List Sort</h2>
    <SetListSortTextInput onChange={handleChange}/>
  </div>
  );
}