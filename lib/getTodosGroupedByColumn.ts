import { databases } from "@/appwrite"

export const getTodosGroupedByColumn = async () => {
    const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
    );
    const todos = data.documents;
    const columns = todos.reduce((acc, todo) => {
        if(!acc.get(todo.status)) {
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            })
        }

        acc.get(todo.status)!.todos.push(
            {
                $id: todo.$id,
                $createdAt: todo.$createdAt,
                title: todo.title,
                status: todo.status,
                // get todo image if it exists on the todo data attribute
                ...(todo.image && {image: JSON.parse(todo.image)})
            }
        );
        return acc;
    }, new Map<TypedColumn, Column>)

    // if columns doesnt have the inprogress, todo, and done, add them with an empty todos array
    const columnTypes: TypedColumn[] = ['TODO', 'IN_PROGRESS', 'DONE'];
    for (const columnType of columnTypes) {
        if(!columns.get(columnType)) {
            columns.set(columnType, {
                id: columnType,
                todos: []
            })
        }
    };

    // sort columns by the columnTypes

    const sortedColumns  = new Map (
        Array.from(columns.entries()).sort((a, b) => (
            columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0]) 
        ))
    );

    console.log(sortedColumns);

    const board: Board = {
        columns: sortedColumns,
    };

    return board
};