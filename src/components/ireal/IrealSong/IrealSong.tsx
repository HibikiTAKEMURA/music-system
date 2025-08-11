import styles from './IrealSong.module.css';

type IrealSongProps = {
    title: string;
    composer: string;
    url: string;
};

export default function IrealSong({title, composer, url}: IrealSongProps) {
    return (
        <>
            <h3 className={styles.song}><a href={url}>{title}</a> - {composer}<br/><br/></h3><br/>
        </>
    );
}