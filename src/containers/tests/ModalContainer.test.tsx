import { fireEvent, waitFor } from '@testing-library/react'

import { IModalState } from '@/store/slices/modalSlice'
import { renderUIWithRedux } from '@/test-utils/renderWithRedux'
import { ModalContainer } from '../ModalContainer'

const modalState = {
  isOpen: true,
  containerConfig: {},
  contentData: {
    children: {
      componentKey: 'CreateUpdateTodoModal',
      props: {},
    },
  },
} as IModalState

describe('Modal Container tests', () => {
  describe('when initial render', () => {
    it('should not show any content', () => {
      const screen = renderUIWithRedux(<ModalContainer />)

      expect(
        screen.container.getElementsByClassName('modal-container')
      ).toHaveLength(0)
    })
  })

  describe('when componentKey changes from state', () => {
    it('should show content', () => {
      const screen = renderUIWithRedux(<ModalContainer />, {
        state: {
          modal: modalState,
        },
      })

      expect(
        screen.container.getElementsByClassName('modal-container')
      ).toHaveLength(1)

      expect(screen.getByText('create todo')).toBeInTheDocument()
    })

    it('should show close icon', () => {
      const screen = renderUIWithRedux(<ModalContainer />, {
        state: {
          modal: modalState,
        },
      })

      expect(
        screen.getByRole('close-button', { hidden: true })
      ).toBeInTheDocument()
    })
  })

  describe('when config changes from state', () => {
    it('should render with align classname', () => {
      const screen = renderUIWithRedux(<ModalContainer />, {
        state: {
          modal: {
            ...modalState,
            containerConfig: {
              modalAlign: 'end',
            },
          },
        },
      })

      expect(screen.container.getElementsByClassName('end')).toHaveLength(1)
    })
  })

  describe('when close button is clicked', () => {
    it('should render with align classname', async () => {
      const screen = renderUIWithRedux(<ModalContainer />, {
        state: {
          modal: modalState,
        },
      })

      fireEvent.click(screen.getByRole('close-button', { hidden: true }))

      await waitFor(() => {
        expect(
          screen.container.getElementsByClassName('modal-container')
        ).toHaveLength(0)
      })
    })
  })

  describe('when fullHeight config option changes from state', () => {
    it('should have the className full-height', () => {
      const screen = renderUIWithRedux(<ModalContainer />, {
        state: {
          modal: {
            ...modalState,
            containerConfig: {
              fullHeight: true,
            },
          },
        },
      })

      expect(
        screen.container.getElementsByClassName('full-height')
      ).toHaveLength(1)
    })
  })
})
