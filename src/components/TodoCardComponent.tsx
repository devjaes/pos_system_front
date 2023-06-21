import React from 'react'

import { ITodo } from '@/store/dtos/todos/transformTodo'

export interface ITodoCardComponentProps {
  todo: ITodo
}

export const TodoCardComponent = ({ todo }: ITodoCardComponentProps) => (
  <div>{todo.description}</div>
)
