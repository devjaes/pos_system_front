"use client"
import React, { Key } from 'react'
import { IInputsForm } from '../../../store/types/IForms'
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { KeyFilterType } from 'primereact/keyfilter';
import { on } from 'events';


export default function page() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const formDatas: IInputsForm[] = [
        {
            name: 'name',
            label: 'Nombre',
            keyfilter: 'alpha',
            placeholder: 'Nombre del producto',
            alertText: 'El nombre es obligatorio'
        },
        {
            name: 'description',
            label: 'Descripción',
            keyfilter: 'alphanum',
            placeholder: 'Descripción del producto',
            alertText: 'La descripción es obligatoria',
            onChange: () => { },
        },
    ]

    return (
        <div>
            {formDatas.map((formData, index) => (
                <div className="pb-4 block" key={index}>
                    <label className="block pb-2 "> {formData.label}</label>
                    <InputText
                        className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
                        keyfilter={formData.keyfilter as KeyFilterType}
                        placeholder={formData.placeholder}
                        {...register(formData.name, {
                            required: formData.alertText,

                        })}
                    />
                    {errors[formData.name] && (
                        <span className="text-red-500">{formData.alertText}</span>
                    )}
                </div>
            ))}
        </div>
    )
}
