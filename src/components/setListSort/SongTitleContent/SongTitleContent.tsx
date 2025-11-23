import styles from './SongTitleContent.module.css';

const screenWidth = document.documentElement.clientWidth;
type SongTitleContentProps = {
    title: string;
};

export default function SongTitleContent({ title }: SongTitleContentProps) {
    const className = screenWidth <= 400 ? styles.body + ' ' + styles.bodySp : styles.body;

    return (
        <div className={className}>
            <p>{title}</p>
        </div>
    );
}