import { fireEvent, render } from '@testing-library/react'

import { RadioButtonComponent } from '../RadioButtonComponent'

describe('<RadioButtonComponent /> test', () => {
  describe('When render component', () => {
    it('should have a default className', () => {
      const { container } = render(
        <RadioButtonComponent
          id="radio-id"
          label="Radio Label"
          name="radio-name"
        />
      )
      expect(container.firstChild).toHaveClass('radio-button-component')
    })
  })

  describe('When pass props', () => {
    it('should have attribute id', () => {
      const { getByRole } = render(
        <RadioButtonComponent
          id="radio-id"
          label="Radio Label"
          name="radio-name"
        />
      )
      expect(getByRole('radio')).toHaveAttribute('id', 'radio-id')
    })

    it('should have attribute name', () => {
      const { getByRole } = render(
        <RadioButtonComponent
          id="radio-id"
          label="Radio Label"
          name="radio-name"
        />
      )
      expect(getByRole('radio')).toHaveAttribute('name', 'radio-name')
    })

    it('should show label text', () => {
      const { getByText } = render(
        <RadioButtonComponent
          id="radio-id"
          label="Radio Label"
          name="radio-name"
        />
      )
      expect(getByText('Radio Label')).toBeInTheDocument()
    })

    it('should check "defaultChecked" radio', () => {
      const { getByRole } = render(
        <RadioButtonComponent
          id="radio-id"
          label="Radio Label"
          name="radio-name"
          defaultChecked
        />
      )
      expect(getByRole('radio')).toHaveAttribute('checked')
    })
  })

  describe('When click radio', () => {
    it('should call onChange function', () => {
      const onChange = jest.fn()
      const { getByRole } = render(
        <RadioButtonComponent
          id="radio-id"
          label="Radio Label"
          name="radio-name"
          onChange={onChange}
        />
      )
      fireEvent.click(getByRole('radio'))
      expect(onChange).toHaveBeenCalled()
    })
  })
})
