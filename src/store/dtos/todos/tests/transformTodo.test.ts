import { transformTodo } from '../transformTodo'

describe('Transform todo tests', () => {
  describe('when data is correct', () => {
    it('should return the parsed data', () => {
      const parsedData = transformTodo({
        _id: '1',
        description: 'description 1',
      })

      expect(parsedData.id).toBe('1')
      expect(parsedData.description).toBe('description 1')
    })
  })

  describe('when data is wrong', () => {
    it('should return and empty data', () => {
      const parsedData = transformTodo({
        description: null,
      } as never)

      expect(parsedData.id).toBe('')
      expect(parsedData.description).toBe('')
    })
  })
})
