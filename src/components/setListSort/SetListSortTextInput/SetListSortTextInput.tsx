import { useEffect } from 'react';
import styles from './SetListSortTextInput.module.css';

const screenWidth = document.documentElement.clientWidth;
type SetListSortTextInputProps = {
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    formText: string;
};

export default function SetListSortTextInput({ onChange, formText }: SetListSortTextInputProps) {
    const className = screenWidth <= 400 ? styles.body + ' ' + styles.bodySp : styles.body;

    // formTextが変更された際、textareaを更新する
    // useEffect(() => {
    //     const textarea = document.querySelector(`.${styles.body}`) as HTMLTextAreaElement;
    //     if (textarea) {
    //         textarea.value = formText;
    //     }
    // }, [formText]);

    return (
        <textarea className={className} onChange={onChange} value={formText} />
    );
}