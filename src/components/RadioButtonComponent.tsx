import React from 'react'
interface IRadioButtonProps {
  id: string
  label: string
  name: string
  defaultChecked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export const RadioButtonComponent = (props: IRadioButtonProps) => {
  const { id, label, defaultChecked, onChange, name } = props

  return (
    <div key={id} className="radio-button-component flex items-center">
      <input
        id={id}
        name={name}
        type="radio"
        defaultChecked={defaultChecked}
        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="ml-3 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
    </div>
  )
}
