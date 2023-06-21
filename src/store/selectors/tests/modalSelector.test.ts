import { IRootState } from '@/store/store'
import { getModaltSelector } from '../modalSelector'

const modalState = {
  isOpen: true,
  containerConfig: {},
  contentData: {
    children: {
      componentKey: 'CreateUpdateTodoModal',
      props: {},
    },
  },
}

describe('Test modalSelector', () => {
  describe('when call getModalSelector', () => {
    it('should return a transfomer selector', () => {
      const state = {
        modal: modalState,
      } as IRootState

      expect(getModaltSelector(state)).toStrictEqual({
        hasContent: true,
        componentKey: 'CreateUpdateTodoModal',
        componentProps: {},
        containerConfig: {},
      })
    })
  })

  it('should return has content false', () => {
    const state = {
      modal: {
        ...modalState,
        isOpen: false,
      },
    } as IRootState

    expect(getModaltSelector(state)).toStrictEqual(
      expect.objectContaining({
        hasContent: false,
      })
    )
  })
})
