'use client'
import { useBoardStore } from '@/store/Boardstore';
import { useEffect } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from './Column';

function Board() {

    // const { getBoard, board } = useBoardStore((state) => state);

    const [board, getBoard] = useBoardStore((state) => [
        state.board,
        state.getBoard
    ]);

    useEffect(() => {
        getBoard(); // Ensure the getBoard function exists before calling
    }, [getBoard]);

    console.log(Array.from(board.columns.entries()))

    const handleonDragEnd = (result: DropResult) => {

    }

    return (
        <DragDropContext
            onDragEnd={handleonDragEnd}
        >
            <Droppable droppableId='board' direction='horizontal' type='column'>
                {(provided) => (
                    <div
                        className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {provided.placeholder}
                        {
                            Array.from(board.columns.entries()).map(([id, column], index) => {
                                // Returning JSX component for rendering (if needed)
                                return (
                                    <Column
                                        key={id}
                                        id={id}
                                        todos={column.todos}
                                        index={index}
                                    />
                                );
                            })
                        }
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default Board