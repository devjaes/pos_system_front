import React, { ReactElement } from 'react'

export type IInputVariants = 'primary' | 'secondary' | 'danger'

export interface IInputTextComponentProps {
  id: string
  name: string
  placeholder?: string
  labelText?: string
  value?: string | number
  leading?: string | number | ReactElement
  trailing?: string | number | ReactElement
  variant?: IInputVariants
  className?: string
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
}

export interface IInputTextStyles {
  labelStyles: string
  inputStyles: string
}

const variantClasses: Record<IInputVariants, IInputTextStyles> = {
  primary: {
    labelStyles: 'label-primary',
    inputStyles: 'input-primary',
  },
  secondary: {
    labelStyles: 'label-secondary',
    inputStyles: 'input-secondary',
  },
  danger: {
    labelStyles: 'label-danger',
    inputStyles: 'input-danger',
  },
}

export const InputTextComponent = (props: IInputTextComponentProps) => {
  const {
    id,
    name,
    placeholder,
    value,
    labelText,
    leading,
    trailing,
    onChange,
    className,
    variant = 'primary',
  } = props

  const getInputStyles = () => {
    let inputStyles = variantClasses[variant].inputStyles

    if (leading) {
      inputStyles = inputStyles.concat(' pl-10')
    }

    if (trailing) {
      inputStyles = inputStyles.concat(' pr-10')
    }

    if (className) {
      inputStyles = inputStyles.concat(` ${className}`)
    }

    return inputStyles
  }

  return (
    <div className="input-text-component">
      {labelText && (
        <label htmlFor={name} className={variantClasses[variant].labelStyles}>
          {labelText}
        </label>
      )}
      <div className="mt-1 relative rounded-md shadow-sm">
        {leading && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leading}
          </div>
        )}
        <input
          id={id}
          role="input"
          name={name}
          type="text"
          className={getInputStyles()}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {trailing && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {trailing}
          </div>
        )}
      </div>
    </div>
  )
}
