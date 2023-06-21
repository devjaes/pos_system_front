export interface IRawTodo {
  _id: string
  description: string
}

export interface ITodo {
  id: string
  description: string
}

export const transformTodo = ({ _id, ...todo }: IRawTodo): ITodo => ({
  id: _id ?? '',
  description: todo.description ?? '',
})
