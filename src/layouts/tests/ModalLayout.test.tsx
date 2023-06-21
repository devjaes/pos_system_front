import { fireEvent, render } from '@testing-library/react'

import * as modalSlice from '@/store/slices/modalSlice'

import { ModalLayout } from '../ModalLayout'
import { renderUIWithRedux } from '@/test-utils/renderWithRedux'

jest.spyOn(modalSlice, 'closeModal')

describe('ModalLayoutProps', () => {
  describe('When render layout with Title child', () => {
    it('should show a title', () => {
      const screen = render(
        <ModalLayout>
          <ModalLayout.Title title="My modal title" />
        </ModalLayout>
      )
      expect(screen.getByText('My modal title')).toBeInTheDocument()
    })
  })

  describe('When render layout with Icon child', () => {
    it('should show a title icon', () => {
      const screen = render(
        <ModalLayout>
          <ModalLayout.Icon iconName="EXCLAMATION" />
        </ModalLayout>
      )
      expect(
        screen.getByRole('modal-icon', { hidden: true })
      ).toBeInTheDocument()
    })

    it('should show a title icon with className prop', () => {
      const screen = render(
        <ModalLayout>
          <ModalLayout.Icon iconName="EXCLAMATION" className="bg-red-500" />
        </ModalLayout>
      )

      expect(
        screen.container.getElementsByClassName('bg-red-500')
      ).toHaveLength(1)
    })

    it('should show a title icon with iconClasName prop', () => {
      const screen = render(
        <ModalLayout>
          <ModalLayout.Icon iconName="EXCLAMATION" iconClassName="text-blue" />
        </ModalLayout>
      )

      expect(screen.container.getElementsByClassName('text-blue')).toHaveLength(
        1
      )
    })
  })

  describe('When render layout with body', () => {
    it('should show body content', () => {
      const screen = render(
        <ModalLayout>
          <ModalLayout.Body>
            <span>Body Content</span>
          </ModalLayout.Body>
        </ModalLayout>
      )
      expect(screen.getByText('Body Content')).toBeInTheDocument()
    })
  })

  describe('When render layout with footerActions', () => {
    const onSuccessMock = jest.fn()
    const onCancelMock = jest.fn()

    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should show cancel and success actions with default labels', () => {
      const screen = renderUIWithRedux(
        <ModalLayout>
          <ModalLayout.FooterActions
            onCancel={onCancelMock}
            onSubmit={onSuccessMock}
          />
        </ModalLayout>
      )
      expect(screen.getByText('Submit')).toBeInTheDocument()
      expect(screen.getByText('Cancel')).toBeInTheDocument()
    })

    it('should show cancel and success actions with custom labels', () => {
      const screen = renderUIWithRedux(
        <ModalLayout>
          <ModalLayout.FooterActions
            submitLabel="Create"
            cancelLabel="No, Thanks"
            onCancel={onCancelMock}
            onSubmit={onSuccessMock}
          />
        </ModalLayout>
      )
      expect(screen.getByText('Create')).toBeInTheDocument()
      expect(screen.getByText('No, Thanks')).toBeInTheDocument()
    })

    it('should show only submit button', () => {
      const screen = renderUIWithRedux(
        <ModalLayout>
          <ModalLayout.FooterActions
            onSubmit={onSuccessMock}
            showCancel={false}
          />
        </ModalLayout>
      )
      expect(screen.getByText('Submit')).toBeInTheDocument()
      expect(screen.queryByText('Cancel')).not.toBeInTheDocument()
    })

    it('should show only cancel button', () => {
      const screen = renderUIWithRedux(
        <ModalLayout>
          <ModalLayout.FooterActions onCancel={onCancelMock} />
        </ModalLayout>
      )
      expect(screen.getByText('Cancel')).toBeInTheDocument()
      expect(screen.queryByText('Submit')).not.toBeInTheDocument()
    })

    it('should show actions align', () => {
      const screen = renderUIWithRedux(
        <ModalLayout>
          <ModalLayout.FooterActions alignActions="start" />
        </ModalLayout>
      )
      expect(
        screen.container.getElementsByClassName('footer-actions start')
      ).toHaveLength(1)
    })

    it('should show default align', () => {
      const screen = renderUIWithRedux(
        <ModalLayout>
          <ModalLayout.FooterActions />
        </ModalLayout>
      )
      expect(
        screen.container.getElementsByClassName('footer-actions end')
      ).toHaveLength(1)
    })

    it('should show call onSubmit callback', () => {
      const screen = renderUIWithRedux(
        <ModalLayout>
          <ModalLayout.FooterActions onSubmit={onSuccessMock} />
        </ModalLayout>
      )

      fireEvent.click(screen.getByText('Submit'))
      expect(onSuccessMock).toHaveBeenCalledTimes(1)
    })

    it('should show call onCancel callback', () => {
      const screen = renderUIWithRedux(
        <ModalLayout>
          <ModalLayout.FooterActions onCancel={onCancelMock} />
        </ModalLayout>
      )

      fireEvent.click(screen.getByText('Cancel'))
      expect(onCancelMock).toHaveBeenCalledTimes(1)
      expect(modalSlice.closeModal).toHaveBeenCalledTimes(1)
    })

    it('should show submit action with other variant', () => {
      // bg-red-600
      const screen = renderUIWithRedux(
        <ModalLayout>
          <ModalLayout.FooterActions
            onSubmit={onSuccessMock}
            variant="danger"
          />
        </ModalLayout>
      )

      screen.getByText('Submit').getAttribute('class')

      expect(screen.getByText('Submit').getAttribute('class')).toBe(
        'button-component btn-danger-medium'
      )
    })
  })
})
