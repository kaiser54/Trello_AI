'use client'
import { useBoardStore } from '@/store/Boardstore';
import { useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function Board() {

    const getBoard = useBoardStore((state) => state.getBoard);

    useEffect(() => {
        getBoard(); // Ensure the getBoard function exists before calling
    }, [getBoard]);


    return (
        <h1>hello </h1>
        // <DragDropContext>
        //     <Droppable droppableId='board' direction='horizontal' type='column'>
        // {(provided) => (
        //      <div>
        //         {/* rendering all the columns  */}
        //      </div>
        // )}
        //     </Droppable>
        // </DragDropContext>
    )
}

export default Board