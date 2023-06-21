import { ICommonFindResponse } from '../../globalTypes'
import { IRawTodo, ITodo, transformTodo } from './transformTodo'

export const transformFindResponse = (
  response: ICommonFindResponse<IRawTodo>
): ICommonFindResponse<ITodo> => {
  if (!response?.data?.map) {
    return {
      data: [],
      total: 0,
    }
  }

  const parseTodos = response.data.map(transformTodo)

  return {
    data: parseTodos,
    total: response.total,
  }
}
