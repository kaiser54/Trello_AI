
interface Board {
    columns: Map<TypedColumn, Column>
}

type TypedColumn = 'TODO' | 'IN_PROGRESS' | 'DONE'

interface Column {
    id: TypedColumn
    todos: Todo[]
}

interface Todo {
    $id: string,
    $createdAt: string,
    title: string,
    status: TypedColumn,
    image?: Image,
}

interface Image {
    bucketId: string,
    fileId: string,
}

