import { fireEvent, render } from '@testing-library/react'

import { DropdownComponent, IDropdownOption } from '../DropdownComponent'

const options: IDropdownOption[] = [
  {
    label: 'Tennis',
    value: 1,
  },
]

const onChangeMock = jest.fn()

const commonProps = {
  options,
  onChange: onChangeMock,
}

describe('DropdownComponent tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when render with mandatory props', () => {
    it('should show a placeholder text', () => {
      const screen = render(
        <DropdownComponent {...commonProps} placeholder="pick an option">
          {(option) => <span>{option.label}</span>}
        </DropdownComponent>
      )
      expect(screen.getByText('pick an option')).toBeInTheDocument()
    })

    it('should show options', () => {
      const screen = render(
        <DropdownComponent {...commonProps} placeholder="pick an option">
          {(option) => <span>{option.label}</span>}
        </DropdownComponent>
      )
      fireEvent.click(screen.getByText('pick an option'))

      expect(screen.getByText('Tennis')).toBeInTheDocument()
    })

    it('should show a default placeholder text', () => {
      const screen = render(
        <DropdownComponent {...commonProps}>
          {(option) => <span>{option.label}</span>}
        </DropdownComponent>
      )
      expect(screen.getByText('pick some option')).toBeInTheDocument()
    })
  })

  describe('when render with icon instead of header', () => {
    it('should show icon header', () => {
      const screen = render(
        <DropdownComponent {...commonProps} iconHeader="MAIL">
          {(option) => <span>{option.label}</span>}
        </DropdownComponent>
      )
      expect(screen.queryByText('pick some option')).not.toBeInTheDocument()
      expect(
        screen.getByRole('dropdown-header-icon', { hidden: true })
      ).toBeInTheDocument()
    })
  })

  describe('when select a value', () => {
    it('should call the onChange callback', () => {
      const screen = render(
        <DropdownComponent {...commonProps} placeholder="pick an option">
          {(option) => <span>{option.label}</span>}
        </DropdownComponent>
      )

      fireEvent.click(screen.getByText('pick an option'))
      fireEvent.click(screen.getByText('Tennis'))

      expect(onChangeMock).toHaveBeenCalledWith({
        label: 'Tennis',
        value: 1,
      })
    })
  })

  describe('when a value is defined', () => {
    it('should show a value instead of placeholder', () => {
      const screen = render(
        <DropdownComponent
          {...commonProps}
          placeholder="pick an option"
          value={1}
        >
          {(option) => <span>{option.label}</span>}
        </DropdownComponent>
      )

      expect(screen.queryByText('pick an option')).not.toBeInTheDocument()
      expect(screen.getByText('Tennis')).toBeInTheDocument()
    })
  })

  describe('when include dividers', () => {
    it('should show a divider', () => {
      const screen = render(
        <DropdownComponent
          onChange={onChangeMock}
          options={[
            {
              label: 'Tennis',
              value: 1,
            },
            {
              label: 'Basket',
              value: 2,
            },
          ]}
          placeholder="pick an option"
          value={1}
          includeDividers={true}
        >
          {(option) => <span>{option.label}</span>}
        </DropdownComponent>
      )

      fireEvent.click(screen.getByText('Tennis'))

      expect(
        screen.container.getElementsByClassName('border-b border-gray-200')
      ).toHaveLength(1)
    })

    it('should not show a divider', () => {
      const screen = render(
        <DropdownComponent {...commonProps} value={1} includeDividers={true}>
          {(option) => <span>{option.label}</span>}
        </DropdownComponent>
      )

      fireEvent.click(screen.getByText('Tennis'))

      expect(
        screen.container.getElementsByClassName('border-b border-gray-200')
      ).toHaveLength(0)
    })
  })

  describe('when render with variant props', () => {
    it('should should primary variant', () => {
      const screen = render(
        <DropdownComponent {...commonProps} value={1} includeDividers={true}>
          {(option) => <span>{option.label}</span>}
        </DropdownComponent>
      )
      fireEvent.click(screen.getByText('Tennis'))

      expect(
        screen.container.getElementsByClassName('dropdown-items items-primary')
      ).toHaveLength(1)
      expect(
        screen.container.getElementsByClassName(
          'dropdown-item-selected selected-primary'
        )
      ).toHaveLength(1)

      expect(
        screen.container.getElementsByClassName('active-dropdown primary')
      ).toHaveLength(1)
    })

    it('should should secondary variant', () => {
      const screen = render(
        <DropdownComponent
          {...commonProps}
          value={1}
          includeDividers={true}
          variant="secondary"
        >
          {(option) => <span>{option.label}</span>}
        </DropdownComponent>
      )
      fireEvent.click(screen.getByText('Tennis'))

      expect(
        screen.container.getElementsByClassName(
          'dropdown-items items-secondary'
        )
      ).toHaveLength(1)
      expect(
        screen.container.getElementsByClassName(
          'dropdown-item-selected selected-secondary'
        )
      ).toHaveLength(1)

      expect(
        screen.container.getElementsByClassName('active-dropdown secondary')
      ).toHaveLength(1)
    })

    it('should should danger variant', () => {
      const screen = render(
        <DropdownComponent
          {...commonProps}
          value={1}
          includeDividers={true}
          variant="danger"
        >
          {(option) => <span>{option.label}</span>}
        </DropdownComponent>
      )
      fireEvent.click(screen.getByText('Tennis'))

      expect(
        screen.container.getElementsByClassName('dropdown-items items-danger')
      ).toHaveLength(1)
      expect(
        screen.container.getElementsByClassName(
          'dropdown-item-selected selected-danger'
        )
      ).toHaveLength(1)

      expect(
        screen.container.getElementsByClassName('active-dropdown danger')
      ).toHaveLength(1)
    })
  })
})
