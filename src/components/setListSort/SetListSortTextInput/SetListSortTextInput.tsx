import styles from './SetListSortTextInput.module.css';

const screenWidth = document.documentElement.clientWidth;
type SetListSortTextInputProps = {
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function SetListSortTextInput({ onChange }: SetListSortTextInputProps) {
    const className = screenWidth <= 400 ? styles.body + ' ' + styles.bodySp : styles.body;

    return (
        <textarea className={className} onChange={onChange} />
    );
}