import { HomeIcon } from '@heroicons/react/outline'
import { fireEvent, render } from '@testing-library/react'
import { LinkProps } from 'next/link'
import Image from 'next/image'

import { IAppNavigation } from '@/constants/appNavigation'
import { NavbarComponent } from '../NavbarComponent'

interface ILinkProps extends LinkProps {
  children: React.ReactElement
}

const mockOnPresLink = jest.fn()

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: () => ({
    basePath: '',
    pathname: '/',
    route: '/',
  }),
}))

jest.mock('next/link', () => (props: ILinkProps) => (
  <span onClick={() => mockOnPresLink(props.href)}>{props.children}</span>
))

jest.mock(
  '@/constants/appNavigation',
  (): { appNavigation: IAppNavigation[] } => ({
    appNavigation: [
      {
        name: 'Home',
        href: '/home',
        icon: HomeIcon,
        child: [
          {
            name: 'Dashboard',
            href: '/home/dashboard',
          },
          {
            name: 'About',
            href: '/home/about',
          },
        ],
      },
      {
        name: 'Projects',
        href: '/projects',
      },
    ],
  })
)

describe('<NavbarComponent /> test', () => {
  describe('When render component', () => {
    it('should have a default className', () => {
      const { container } = render(<NavbarComponent />)
      expect(container.firstElementChild).toHaveClass('navbar-component')
    })

    it('should show navigation items', () => {
      const { getByText } = render(<NavbarComponent />)
      expect(getByText('Home')).toBeInTheDocument()
      expect(getByText('Projects')).toBeInTheDocument()
    })

    it('should show navigation item icon if receive icon', () => {
      const { container } = render(<NavbarComponent />)
      expect(container.querySelector('svg')).toBeInTheDocument()
    })
  })

  describe('When click on navigation item', () => {
    it('should open sub navigation if receive child items', () => {
      const { getByText } = render(<NavbarComponent />)
      fireEvent.click(getByText('Home'))
      expect(getByText('Dashboard')).toBeInTheDocument()
      expect(getByText('About')).toBeInTheDocument()
    })

    it('should navigate to the correct url', () => {
      const { getByText } = render(<NavbarComponent />)
      fireEvent.click(getByText('Projects'))
      expect(mockOnPresLink).toHaveBeenCalledWith('/projects')
    })
  })

  describe('When receive props', () => {
    it('should show navigation logo', () => {
      const { getByTestId } = render(
        <NavbarComponent
          navLogo={
            <Image
              src="/logo.png"
              width={10}
              height={10}
              alt="logo"
              data-testid="logo-id"
            />
          }
        />
      )
      expect(getByTestId('logo-id')).toBeInTheDocument()
    })
  })
})
