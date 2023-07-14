"use client";
import React from 'react'
import InputForm, { IInputsForm } from '@/components/Input'
import { InputText } from 'primereact/inputtext';
import { KeyFilterType } from 'primereact/keyfilter';
import { useForm } from 'react-hook-form';
import 'primeicons/primeicons.css';
import IComboOptions from '@/components/ComboBox';
import ComboBox from '@/components/ComboBox';
import { fr } from 'date-fns/locale';

export default function page() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRoleChange = (selectedValue: string) => {
    console.log('Valor seleccionado:', selectedValue);
  };

  const allForms: IInputsForm[]= [
    {
      name: 'name',
      label: 'Nombre',
      keyfilter: 'alpha',
      placeholder: 'Nombre del Usuario',
      alertText: '*El nombre es obligatorio',
      onChange: () => {},
    },
    {
      name: 'lastName',
      label: 'Apellido',
      keyfilter: 'alpha',
      placeholder: 'Apellido del Usuario',
      alertText: '*El apellido es obligatorio',
      onChange: () => {},
    },
    {
      name: 'email',
      label: 'Correo',
      keyfilter: 'email',
      placeholder: 'Correo electrónico',
      alertText: '*El correo es obligatorio',
      onChange: () => {},
    },
    {
      name: 'password',
      label: 'Contraseña',
      keyfilter: 'alphanum',
      placeholder: 'Contraseña',
      alertText: '*La contraseña es obligatoria',
      onChange: () => {},
    },{
      name: 'rol',
      label: 'Rol',
      keyfilter: 'alpha',
      placeholder: 'Seleccione un rol',
      alertText: '*El rol es obligatorio',
      onChange: () => {},
    }
    ]
  return (
    
    <div className=" w-max grid grid-cols-2 gap-4">
        
        {allForms.map((allForm, index) => (
            <div className="pb-4 block" key={index}>
                <label className="block pb-2">{allForm.label}</label>
                {allForm.name === 'rol' ? (
                <ComboBox 
                label={allForm.label}
                options={['Usuario', 'Administrador']} 
                onChange={handleRoleChange}
                  defaultValue={allForm.placeholder}/>
                  ) : (
                <InputText
                  className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
                  keyfilter={allForm.keyfilter as KeyFilterType}
                  placeholder={allForm.placeholder}
                  {...register(allForm.name, {
                    required: allForm.alertText,
                  })}
                  />
              )}
                  
            </div>
        ))}
    </div>
  )
}
