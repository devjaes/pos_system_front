import reducer, {
  decrement,
  increment,
  incrementByAmount,
} from '../counterSlice'

test('should increment', () => {
  const previousState = {
    value: 0,
  }
  expect(reducer(previousState, increment())).toEqual({
    value: 1,
  })
})

test('should decrement', () => {
  const previousState = {
    value: 10,
  }
  expect(reducer(previousState, decrement())).toEqual({
    value: 9,
  })
})

test('should incrementByAmount', () => {
  const previousState = {
    value: 20,
  }
  expect(reducer(previousState, incrementByAmount(10))).toEqual({
    value: 30,
  })
})
