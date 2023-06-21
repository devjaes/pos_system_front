import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

import { SVG_ICONS } from '@/constants/icons'
import { IconWrappedComponent } from '@/wrappers/IconWrappedComponent'

type IDropdownVariants = 'primary' | 'secondary' | 'danger'

export interface IDropdownComponentProps {
  options: IDropdownOption[]
  value?: string | number
  placeholder?: string
  variant?: IDropdownVariants
  includeDividers?: boolean
  iconHeader?: keyof typeof SVG_ICONS
  onChange: (option: IDropdownOption) => void
  children: (option: IDropdownOption, active: boolean) => React.ReactNode
}

export interface IDropdownOption {
  label: string
  value: string | number
}

interface IDropdownStyles {
  selectedStyles: string
  optionStyles: string
  selectedStylesRounded: string
}

const dropdownClasses: Record<IDropdownVariants, IDropdownStyles> = {
  primary: {
    optionStyles: 'dropdown-items items-primary',
    selectedStyles: 'dropdown-item-selected selected-primary',
    selectedStylesRounded: 'dropdown-item-selected-rounded  selected-primary',
  },
  secondary: {
    optionStyles: 'dropdown-items items-secondary',
    selectedStyles: 'dropdown-item-selected selected-secondary',
    selectedStylesRounded: 'dropdown-item-selected-rounded  selected-secondary',
  },
  danger: {
    optionStyles: 'dropdown-items items-danger',
    selectedStyles: 'dropdown-item-selected selected-danger',
    selectedStylesRounded: ' .dropdown-item-selected-rounded selected-danger',
  },
}

export const DropdownComponent = (props: IDropdownComponentProps) => {
  const {
    children,
    placeholder = 'pick some option',
    options,
    value,
    variant = 'primary',
    iconHeader,
    onChange,
    includeDividers,
  } = props

  const getActiveStyle = (option: IDropdownOption, isLast: boolean) => {
    const selected = option.value === value
    let style =
      'hover:cursor-pointer w-full group flex items-center px-4 py-2 text-sm hover:bg-gray-200'

    if (includeDividers && !isLast) {
      style = style.concat(' border-b border-gray-200')
    }

    if (!selected) {
      return style
    }

    switch (variant) {
      case 'secondary':
        return style.concat(' active-dropdown secondary')
      case 'danger':
        return style.concat(' active-dropdown danger')
      default:
        return style.concat(' active-dropdown primary')
    }
  }

  const renderOption = (option: IDropdownOption, index: number) => (
    <div
      key={index}
      onClick={() => onChange(option)}
      className={getActiveStyle(option, index === options.length - 1)}
    >
      {children(option, option.value === value)}
    </div>
  )

  const selectedOption = React.useMemo(
    () => options.find(({ value: optionValue }) => optionValue === value),
    [options, value]
  )

  const renderHeader = () =>
    selectedOption ? (
      <>
        <div className="group flex items-center text-sm">
          {children(selectedOption, false)}
        </div>
        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </>
    ) : (
      <>
        {placeholder}
        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </>
    )

  return (
    <Menu as="div" className="dropdown-component">
      <div>
        <Menu.Button
          className={
            iconHeader
              ? dropdownClasses[variant].selectedStylesRounded
              : dropdownClasses[variant].selectedStyles
          }
        >
          {iconHeader ? (
            <IconWrappedComponent
              icon={iconHeader}
              role="dropdown-header-icon"
              className="w-6 h-6"
            />
          ) : (
            renderHeader()
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className={dropdownClasses[variant].optionStyles}>
          <div className="py-1">{options.map(renderOption)}</div>
        </div>
      </Transition>
    </Menu>
  )
}
