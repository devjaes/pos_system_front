import reducer, {
  closeModal,
  IModalState,
  IOpenModalComponentPayload,
  openModalComponent,
} from '../modalSlice'

const initialState = {
  containerConfig: {
    alignActions: 'around',
    hideBackdrop: false,
    modalAlign: 'center',
    variant: 'primary',
  },
  isOpen: false,
} as IModalState

describe('Modal slice tests', () => {
  describe('when dispatch closeModal action', () => {
    it('should close modal', () => {
      const newState = reducer(
        {
          ...initialState,
          isOpen: true,
        },
        closeModal(null)
      )

      expect(newState.contentData).toBeFalsy()
      expect(newState.isOpen).toBe(false)
    })
  })

  describe('when dispatch setComponent action', () => {
    it('should setComponent', () => {
      const actionPayload: IOpenModalComponentPayload = {
        componentKey: 'CreateUpdateTodoModal',
        componentProps: { title: 'some-title' },
        config: {},
      }
      const newState = reducer(initialState, openModalComponent(actionPayload))

      expect(newState.contentData?.children.props).toStrictEqual({
        title: 'some-title',
      })
      expect(newState.isOpen).toBe(true)
    })

    it('should set component with config', () => {
      const actionPayload: IOpenModalComponentPayload = {
        componentKey: 'CreateUpdateTodoModal',
        componentProps: { title: 'some-title' },
        config: {
          modalAlign: 'start',
          fullHeight: true,
        },
      }
      const newState = reducer(initialState, openModalComponent(actionPayload))

      expect(newState.containerConfig?.modalAlign).toBe('start')
      expect(newState.containerConfig?.fullHeight).toBe(true)
      expect(newState.contentData?.children.componentKey).toBe(
        'CreateUpdateTodoModal'
      )
    })

    it('should set component with default config', () => {
      const actionPayload: IOpenModalComponentPayload = {
        componentKey: 'CreateUpdateTodoModal',
        componentProps: { title: 'some-title' },
      }
      const newState = reducer(initialState, openModalComponent(actionPayload))

      expect(newState.containerConfig?.modalAlign).toBe('center')
      expect(newState.containerConfig?.hideCloseIcon).toBe(false)
    })

    it('should set component with default config and custom config', () => {
      const actionPayload: IOpenModalComponentPayload = {
        componentKey: 'CreateUpdateTodoModal',
        componentProps: { title: 'some-title' },
        config: {
          hideCloseIcon: true,
        },
      }
      const newState = reducer(initialState, openModalComponent(actionPayload))

      expect(newState.containerConfig?.modalAlign).toBe('center')
      expect(newState.containerConfig?.hideCloseIcon).toBe(true)
    })
  })
})
