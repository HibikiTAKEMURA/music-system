import styles from './SongTitleContent.module.css';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";

const screenWidth = document.documentElement.clientWidth;
type SongTitleContentProps = {
    title: string;
};

export default function SongTitleContent({ title }: SongTitleContentProps) {
    const className = screenWidth <= 400 ? styles.body + ' ' + styles.bodySp : styles.body;
    const { listeners, setNodeRef, transform } = useSortable({
        id: title,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div className={className} ref={setNodeRef} style={style} {...listeners}>
            <p>{title}</p>
        </div>
    );
}