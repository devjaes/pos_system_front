import { decrement, increment } from '../slices/counterSlice'
import { ICommonFindResponse } from '../globalTypes'
import { ENDPOINTS_TAGS, rootApi } from './rootApi'
import { IRawTodo, ITodo, transformTodo } from '../dtos/todos/transformTodo'
import { transformFindResponse } from '../dtos/todos/transformFindResponse'

export const todoApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    createTodo: builder.mutation<ITodo, Omit<IRawTodo, '_id'>>({
      query: (todo) => ({
        url: () => 'todo',
        method: 'POST',
        data: todo,
      }),
      transformResponse: transformTodo,
      invalidatesTags: [ENDPOINTS_TAGS.TODO],
    }),
    findTodos: builder.query<ICommonFindResponse<ITodo>, void>({
      query: () => ({
        url: () => 'todo',
        method: 'GET',
        extraSuccessActions: [increment],
        extraErrorAction: decrement,
      }),
      transformResponse: transformFindResponse,
      providesTags: [ENDPOINTS_TAGS.TODO],
    }),
  }),
})

export const { useCreateTodoMutation, useFindTodosQuery } = todoApi
