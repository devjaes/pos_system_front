import { renderUIWithRedux } from '@/test-utils/renderWithRedux'
import * as todoApi from '@/store/api/todoApi'

import TodosPage from '..'

const useFindTodosQueryMock = jest.spyOn(todoApi, 'useFindTodosQuery')

const findTodoApiResponse = {
  data: [
    {
      id: 'some-id',
      description: 'some-description',
    },
  ],
  total: 1,
}

describe('Todos Page tests', () => {
  describe('when find todos', () => {
    beforeEach(() => {
      jest.clearAllMocks()

      useFindTodosQueryMock.mockReturnValue({
        data: findTodoApiResponse,
        error: null,
        loading: false,
        refetch: jest.fn(),
      })
    })

    it('should list todos', () => {
      const screen = renderUIWithRedux(<TodosPage />)

      expect(screen.getByText('some-description')).toBeInTheDocument()
    })
  })

  describe('when not find todos', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      useFindTodosQueryMock.mockReturnValue({
        data: null,
        isError: true,
        loading: false,
        refetch: jest.fn(),
      })
    })

    it('should show a error message', () => {
      const screen = renderUIWithRedux(<TodosPage />)

      expect(screen.getByText('some error has happened')).toBeInTheDocument()
    })
  })
})
