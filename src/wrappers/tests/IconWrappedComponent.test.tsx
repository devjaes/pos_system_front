import { render } from '@testing-library/react'

import { IconWrappedComponent } from '../IconWrappedComponent'

describe('IconWrappedComponent tests', () => {
  describe('when render with mandatory props', () => {
    it('should show an icon', () => {
      const screen = render(<IconWrappedComponent icon="MAIL" />)
      expect(screen.container.getElementsByTagName('svg')).toHaveLength(1)
    })

    it('should have a the default role', () => {
      const screen = render(<IconWrappedComponent icon="MAIL" role="icon" />)
      expect(screen.getByRole('icon', { hidden: true })).toBeTruthy()
    })
  })

  describe('when render with className', () => {
    it('should show an icon', () => {
      const screen = render(
        <IconWrappedComponent icon="MAIL" className="w-6 h-6" />
      )
      expect(screen.container.getElementsByClassName('w-6 h-6')).toHaveLength(1)
    })
  })

  describe('when render with role', () => {
    it('should have a role', () => {
      const screen = render(
        <IconWrappedComponent icon="MAIL" role="menu-icon" />
      )
      expect(screen.getByRole('menu-icon', { hidden: true })).toBeTruthy()
    })
  })
})
