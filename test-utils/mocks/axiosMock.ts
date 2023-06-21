import axios, { AxiosStatic } from 'axios'

jest.mock('axios')

interface AxiosValue<T> {
  data: T
}

interface AxiosMock<T> extends AxiosStatic {
  mockResolvedValueOnce: (value: AxiosValue<T>) => Promise<T>
  mockRejectedValueOnce: (value: T) => Promise<T>
}

const resolveValue = <T>(value: T) => {
  const mockedAxios = axios as AxiosMock<T>

  return mockedAxios.mockResolvedValueOnce({
    data: value,
  })
}

const rejectValue = <T>(value: T) => {
  const mockedAxios = axios as AxiosMock<T>

  return mockedAxios.mockRejectedValueOnce(value)
}

const axiosMock = {
  resolveValue,
  rejectValue,
}

export default axiosMock
