import SongTitleContent from "@/components/setListSort/SongTitleContent/SongTitleContent";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import styles from './DndArea.module.css';

const screenWidth = document.documentElement.clientWidth;

type DndAreaProps = {
    items: string[];
    // 並び替え後のアイテムリストを親に伝えるためのハンドラ
    onSortEnd: (activeId: string, overId: string) => void; 
};


export default function DndArea({ items, onSortEnd }: DndAreaProps) {
    const className = screenWidth <= 400 ? styles.body + ' ' + styles.bodySp : styles.body;

    // ドラッグ終了時に実行されるハンドラ
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        // ドロップ先がない場合や、同じ要素にドロップした場合は何もしない
        if (over && active.id !== over.id) {
            onSortEnd(active.id as string, over.id as string);
        }
    }

    return (
        <div className={className}>
            {/* onDragEnd ハンドラを設定 */}
            <DndContext onDragEnd={handleDragEnd}>
                <SortableContext 
                    // itemsはidのリストである必要があります
                    items={items} 
                    strategy={verticalListSortingStrategy}
                >
                    {items.map((title) => (
                        // keyはindexではなくtitle（ユニークなID）を使用する方が望ましいです
                        <SongTitleContent title={title} key={title}></SongTitleContent> 
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
}