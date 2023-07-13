import React from 'react'
import { IInputsForm } from '../../../store/types/IForms';

export default function page() {
    const formDatas: IInputsForm[] = [
        {
            name: 'name',
            label: 'Nombre',
            keyfilter: 'text',
            placeholder: 'Nombre del producto',
        },
    ];
    return (
        <div>
            <h1>hola</h1>
        </div>
    )
}
