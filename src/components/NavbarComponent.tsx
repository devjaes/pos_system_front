import { Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Disclosure, Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import { appNavigation, IAppNavigation } from '@/constants/appNavigation'

interface INavBarComponentProps {
  navLogo?: React.ReactElement
}

interface INavButtonProps {
  item: IAppNavigation
  openPopover?: boolean
  isLink?: boolean
  customClassName?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export const NavbarComponent = (props: INavBarComponentProps) => {
  const router = useRouter()
  const isActiveRoute = (route: string) => router.pathname.includes(route)
  const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ')

  const NavButton = ({
    item,
    openPopover,
    isLink,
    onClick,
    customClassName,
  }: INavButtonProps) => {
    const anchor = (
      <a
        onClick={onClick}
        className={
          customClassName ||
          classNames(
            isActiveRoute(item.href) || openPopover
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'group flex items-center px-3 py-2 rounded-md text-sm font-medium'
          )
        }
        aria-current={isActiveRoute(item.href) ? 'page' : undefined}
      >
        {item.icon && (
          <item.icon
            className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
            aria-hidden="true"
          />
        )}
        <span className="flex-1">{item.name}</span>
      </a>
    )

    return isLink ? <Link href={item.href}>{anchor}</Link> : anchor
  }

  return (
    <Disclosure as="nav" className="bg-gray-800 navbar-component">
      {({ open, close }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                {props.navLogo && (
                  <div className="flex-shrink-0 flex items-center">
                    {props.navLogo}
                  </div>
                )}
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {appNavigation.map((item) =>
                      item.child?.length ? (
                        <Popover className="relative" key={item.name}>
                          {({ open: openPopover }) => (
                            <>
                              <Popover.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none">
                                <NavButton
                                  item={item}
                                  openPopover={openPopover}
                                />
                              </Popover.Button>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Popover.Panel className="origin-top-right absolute mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  {({ close: closePopover }) => (
                                    <>
                                      {item?.child?.map((child) => (
                                        <NavButton
                                          key={child.name}
                                          item={child}
                                          onClick={() => closePopover()}
                                          isLink={true}
                                          customClassName={classNames(
                                            isActiveRoute(child.href)
                                              ? 'bg-gray-100'
                                              : '',
                                            'group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                          )}
                                        />
                                      ))}
                                    </>
                                  )}
                                </Popover.Panel>
                              </Transition>
                            </>
                          )}
                        </Popover>
                      ) : (
                        <NavButton key={item.name} item={item} isLink={true} />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile menu*/}
          <Disclosure.Panel className="sm:hidden">
            <div className="px-3 pt-2 pb-3 space-y-1">
              {appNavigation.map((item) =>
                item.child?.length ? (
                  <Disclosure as="div" className="mt-2" key={item.name}>
                    <Disclosure.Button as="div">
                      <NavButton key={item.name} item={item} />
                    </Disclosure.Button>
                    <Disclosure.Panel>
                      {item.child.map((child) => (
                        <NavButton
                          key={child.name}
                          item={child}
                          onClick={() => close()}
                          isLink={true}
                          customClassName={classNames(
                            isActiveRoute(child.href)
                              ? 'text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'group w-full flex items-center pl-8 pr-2 py-2'
                          )}
                        />
                      ))}
                    </Disclosure.Panel>
                  </Disclosure>
                ) : (
                  <NavButton
                    key={item.name}
                    item={item}
                    isLink={true}
                    onClick={() => close()}
                  />
                )
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
