import SongTitleContent from "@/components/setListSort/SongTitleContent/SongTitleContent";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import styles from './DndArea.module.css';

const screenWidth = document.documentElement.clientWidth;

type DndAreaProps = {
    items: string[];
};


export default function DndArea({ items }: DndAreaProps) {
    const className = screenWidth <= 400 ? styles.body + ' ' + styles.bodySp : styles.body;

    return (
        <div className={className}>
            <DndContext>
                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                    {items.map((title, index) => (
                        <SongTitleContent title={title} key={index + title}></SongTitleContent>
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
}