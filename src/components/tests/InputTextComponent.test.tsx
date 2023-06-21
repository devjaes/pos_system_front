import { fireEvent, render } from '@testing-library/react'

import { InputTextComponent } from '../InputTextComponent'
import { IconWrappedComponent } from '@/wrappers/IconWrappedComponent'

const onChangeMock = jest.fn()

const commonProps = {
  id: 'input',
  name: 'inputFoo',
  placeholder: 'foo',
  onChange: onChangeMock,
}

describe('InputTextComponent tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when render with mandatory props', () => {
    it('should show a placeholder', () => {
      const screen = render(<InputTextComponent {...commonProps} />)

      expect(screen.getByPlaceholderText('foo')).toBeInTheDocument()
    })

    it('should show with custom className', () => {
      const screen = render(
        <InputTextComponent {...commonProps} className="custom-class" />
      )
      expect(
        screen.container.getElementsByClassName('custom-class')
      ).toHaveLength(1)
    })
  })

  describe('when render with a value prop', () => {
    it('should show a default value instead of placeholder', () => {
      const screen = render(<InputTextComponent {...commonProps} value="bar" />)

      expect(screen.queryByText('foo')).not.toBeInTheDocument()
      expect(screen.getByDisplayValue('bar')).toBeInTheDocument()
    })
  })

  describe('when render with a labelText prop', () => {
    it('should show a label', () => {
      const screen = render(
        <InputTextComponent {...commonProps} labelText="Some label" />
      )
      expect(screen.getByText('Some label')).toBeInTheDocument()
    })

    it('should show a label with other variant style', () => {
      const screen = render(
        <InputTextComponent
          {...commonProps}
          variant="danger"
          labelText="Some label"
        />
      )

      expect(screen.getByText('Some label')).toBeInTheDocument()
      expect(
        screen.container.getElementsByClassName('label-danger')
      ).toHaveLength(1)
    })
  })

  describe('when render with leading or trailing props', () => {
    it('should show a leading component', () => {
      const screen = render(
        <InputTextComponent
          {...commonProps}
          leading={
            <IconWrappedComponent
              icon="MAIL"
              className="h-5 w-5 text-gray-400"
            />
          }
        />
      )
      expect(screen.container.getElementsByClassName('h-5 w-5')).toHaveLength(1)
      expect(screen.container.getElementsByClassName('pl-10')).toHaveLength(1)
    })

    it('should show a trainling component', () => {
      const screen = render(
        <InputTextComponent
          {...commonProps}
          trailing={
            <IconWrappedComponent
              icon="MAIL"
              className="h-5 w-5 text-gray-400"
            />
          }
        />
      )

      expect(screen.container.getElementsByClassName('h-5 w-5')).toHaveLength(1)
      expect(screen.container.getElementsByClassName('pr-10')).toHaveLength(1)
    })
  })

  describe('when input changes', () => {
    it('should change call to be called onChange', () => {
      const screen = render(<InputTextComponent {...commonProps} />)

      const inputRef = screen.getByPlaceholderText('foo')

      fireEvent.change(inputRef, { target: { value: 'new bar' } })

      expect(onChangeMock).toHaveBeenCalledTimes(1)
    })
  })
})
