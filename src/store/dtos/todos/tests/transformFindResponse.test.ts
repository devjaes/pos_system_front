import { transformFindResponse } from '../transformFindResponse'

const findTodoApiResponse = {
  data: [
    {
      _id: 'some-id',
      description: 'some-description',
    },
  ],
  total: 1,
}

describe('TransformFindResponse tests', () => {
  describe('when data is correct', () => {
    it('should return parsed data', () => {
      const parsedData = transformFindResponse(findTodoApiResponse)

      expect(parsedData.data[0].id).toBe('some-id')
      expect(parsedData.data[0].description).toBe('some-description')
      expect(parsedData.total).toBe(1)
    })
  })

  describe('when data is incorrect', () => {
    it('should return an empty reponse', () => {
      const parsedData = transformFindResponse({} as never)

      expect(parsedData.data).toHaveLength(0)
      expect(parsedData.total).toBe(0)
    })
  })
})
