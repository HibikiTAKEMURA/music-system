import SetListSortTextInput from '@/components/setListSort/SetListSortTextInput/SetListSortTextInput';
import styles from './SetListSortContent.module.css';
import { useEffect, useMemo, useState } from 'react';
import DndArea from '@/components/setListSort/DndErea/DndArea';
import { arrayMove } from '@dnd-kit/sortable';

export default function SetListSortContent() {
  const [formText, setFormText] = useState('');
  
  // 曲タイトルの配列
  const initialTitles = useMemo(() => {
    return formText.split('\n').filter(line => line !== '');
  }, [formText]);

  // 実際には、この項目リスト自体をuseStateで管理する必要があります
  const [titles, setTitles] = useState<string[]>(initialTitles);
  
  // 順番が変更されたときの動作
  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newFormText = event.target.value;
    setFormText(newFormText);
    
    // 入力エリアの内容が変わったら、titlesの状態も更新
    const newTitles = newFormText.split('\n');
    setTitles(newTitles);

  }

  // 並び替えた際のハンドラの実装
  function handleSortEnd(activeId: string, overId: string) {
    // 現在のリストの状態に対して並び替えを実行
    const activeIndex = titles.indexOf(activeId);
    const overIndex = titles.indexOf(overId);

    if (activeIndex !== -1 && overIndex !== -1) {
      // arrayMoveを使って新しい順序のリストを作成し、Stateを更新
      setTitles((items) => arrayMove(items, activeIndex, overIndex));
    }
  }

  // 入力フォームの内容反映
  useEffect(() => {
    setFormText(titles.join('\n'));
  }, [titles]);

  return (
  <div className={styles.body}>
    <div className={styles.topSpacer}></div>
    <h2>Set List Sort</h2>
    <SetListSortTextInput onChange={handleChange} formText={formText} />
    <div className={styles.dndArea}>
      <DndArea items={titles} onSortEnd={handleSortEnd} />
    </div>
  </div>
  );
}