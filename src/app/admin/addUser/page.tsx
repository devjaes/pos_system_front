"use client";
import React from 'react'
import InputForm, { IInputsForm } from '@/components/Input'

export default function page() {
  const allForm: IInputsForm[] = [
    {
      name: 'name',
      label: 'Nombre',
      keyfilter: 'alpha',
      placeholder: 'Nombre',
      disabled: false,
      onChange: () => {},
    },
    {
      name: 'lastName',
      label: 'Apellido',
      keyfilter: 'alpha',
      placeholder: 'Apellido',
      disabled: false,
      onChange: () => {},
    },
    {
      name: 'email',
      label: 'Correo',
      keyfilter: 'email',
      placeholder: 'Correo',
      disabled: false,
      onChange: () => {},
    },
    ]
    
  return (
    <div>
      <InputForm allForm={allForm} />
    </div>
  )
}
