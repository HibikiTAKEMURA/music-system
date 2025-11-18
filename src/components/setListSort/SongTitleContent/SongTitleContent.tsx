import styles from './SetListSortTextInput.module.css';

const screenWidth = document.documentElement.clientWidth;
type SongTitleContentProps = {
    title: string;
};

export default function SongTitleContent({ title }: SongTitleContentProps) {
    const className = screenWidth <= 400 ? styles.body + ' ' + styles.bodySp : styles.body;

    return (
        <p className={className}>{title}</p>
    );
}