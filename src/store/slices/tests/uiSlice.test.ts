import uiReducer, { setUiState } from '../uiSlice'

const defaultState = {
  ui: {
    isTodosModalOpen: false,
  },
}

const uiState = {
  isTodosModalOpen: true,
}

describe('Test uiSlice reducer', () => {
  it('should return the initial state', () => {
    expect(uiReducer(undefined, { type: '' })).toEqual(defaultState)
  })

  it('should set isTodosModalOpen when setUiState is called', () => {
    expect(uiReducer(defaultState, setUiState(uiState)).ui).toStrictEqual({
      isTodosModalOpen: true,
    })
  })
})
