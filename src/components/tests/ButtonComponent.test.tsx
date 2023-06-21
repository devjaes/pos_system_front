import { fireEvent, render } from '@testing-library/react'
import { MailIcon } from '@heroicons/react/solid'

import { ButtonComponent } from '../ButtonComponent'

describe('<ButtonComponent /> test', () => {
  describe('When render ButtonComponent', () => {
    it('should have a default className', () => {
      const { getByRole } = render(
        <ButtonComponent shape="circular">ButtonComponent Text</ButtonComponent>
      )
      expect(getByRole('button')).toHaveClass('button-component')
      expect(getByRole('button')).toHaveClass('btn-primary-medium')
    })

    it('should show children content', () => {
      const { getByRole } = render(
        <ButtonComponent>Button Text</ButtonComponent>
      )
      expect(getByRole('button')).toHaveTextContent('Button Text')
    })
  })

  describe('When receive icons props', () => {
    it('should show start icon', () => {
      const { container } = render(
        <ButtonComponent startIcon={MailIcon}>Button Text</ButtonComponent>
      )
      expect(container.querySelector('svg')).toBeInTheDocument()
      expect(container.querySelector('svg')).toHaveClass('start-icon-medium')
    })

    it('should show end icon', () => {
      const { container } = render(
        <ButtonComponent endIcon={MailIcon}>
          ButtonComponent Text
        </ButtonComponent>
      )
      expect(container.querySelector('svg')).toBeInTheDocument()
      expect(container.querySelector('svg')).toHaveClass('end-icon-medium')
    })
  })

  describe('When click on button', () => {
    it('should call onClick function if receive onClick prop', () => {
      const onClick = jest.fn()
      const { getByRole } = render(
        <ButtonComponent onClick={onClick}>Button Text</ButtonComponent>
      )
      fireEvent.click(getByRole('button'))
      expect(onClick).toHaveBeenCalled()
    })

    it('should call onSubmit function if receive onSubmit prop', () => {
      const onSubmit = jest.fn()
      const { getByRole } = render(
        <ButtonComponent onSubmit={onSubmit}>Button Text</ButtonComponent>
      )
      fireEvent.submit(getByRole('button'))
      expect(onSubmit).toHaveBeenCalled()
    })
  })

  describe('When receive isAnchorButton and href props', () => {
    it('should have a href value', () => {
      const { getByRole } = render(
        <ButtonComponent href="#" isAnchorButton>
          ButtonComponent Text
        </ButtonComponent>
      )
      expect(getByRole('link')).toHaveAttribute('href', '#')
    })
  })

  describe('When receive custom variants props', () => {
    it('should have a custom size & variant', () => {
      const { getByRole } = render(
        <ButtonComponent size="large" variant="secondary">
          ButtonComponent Text
        </ButtonComponent>
      )
      expect(getByRole('button')).toHaveClass('btn-secondary-large')
    })

    it('should have a custom shape', () => {
      const { getByRole } = render(
        <ButtonComponent shape="circular">ButtonComponent Text</ButtonComponent>
      )
      expect(getByRole('button')).toHaveClass('btn-circular')
    })

    it('should have an extra className', () => {
      const { getByRole } = render(
        <ButtonComponent extraClasses="custom-class">
          ButtonComponent Text
        </ButtonComponent>
      )
      expect(getByRole('button')).toHaveClass('custom-class')
    })
  })
})
