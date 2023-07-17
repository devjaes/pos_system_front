"use client"
import { handleGetStore, handleUpdateStore } from '@/store/api/storeApi';
import { IInputsForm } from '@/store/types/IForms';
import { IStoreResponse, IStoreUpdate } from '@/store/types/IStore';
import { InputText } from 'primereact/inputtext';
import { KeyFilterType } from 'primereact/keyfilter';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';

export default function page() {
    const [store, setStore] = React.useState<IStoreResponse>();
    const toast = useRef<Toast>(null);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        handleGetStore().then((res) => {
            if (res !== undefined) {
                setStore(res);
            }
        }
        );
    }, [])

    const storeInfo: IInputsForm[] = [
        {
            name: "storeName",
            label: "Nombre de la Empresa",
            keyfilter: /^[a-zA-Z ]*$/,
            placeholder: "Nombre de la Empresa",
            alertText: "*El nombre es obligatorio",
            value: store?.storeName,
        },
        {
            name: "tradeName",
            label: "Nombre Comercial",
            keyfilter: /^[a-zA-Z ]*$/,
            placeholder: "Nombre Comercial de la Empresa",
            alertText: "*El nombre comercial es obligatorio",
            value: store?.tradeName,
        },
        {
            name: "ruc",
            label: "RUC",
            keyfilter: "num",
            placeholder: "RUC de la Empresa",
            alertText: "*El RUC es obligatorio",
            value: store?.ruc,
        },
        {
            name: "address",
            label: "Dirección",
            keyfilter: /^[a-zA-Z ]*$/,
            placeholder: "Dirección de la Empresa",
            alertText: "*La dirección es obligatoria",
            value: store?.address,
        },
    ]

    const onSubmit = handleSubmit((data: any) => {
        const storeUpdateData: IStoreUpdate = {
            storeName: data.storeName === store?.storeName ? null : data.storeName,
            tradeName: data.tradeName === store?.tradeName ? null : data.tradeName,
            ruc: data.ruc === store?.ruc ? null : data.ruc,
            address: data.address === store?.address ? null : data.address,
            especialTaxpayer: data.especialTaxpayer === store?.especialTaxpayer ? null : data.especialTaxpayer,
            forcedAccounting: data.forcedAccounting === store?.forcedAccounting ? null : data.forcedAccounting,
        }
        console.log(storeUpdateData);
        handleUpdateStore(storeUpdateData).then((res) => {
            if (res) {
                toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Datos actualizados correctamente' });
            } else {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar los datos' });
            }
        })
    });

    return (
        <div className=' border-2 border-slate-400 px-32  py-8 rounded-lg'>
            <div className='flex gap-8 flex-col justify-evenly'>
                <i className="pi pi-user" style={{ fontSize: '5rem', textAlign: 'center' }}></i>
                <div >
                    <h1 className='text-center font-bold text-5xl'>Modificar Perfil</h1>
                </div>

                <div >
                    {
                        storeInfo.map((store, index) => (
                            <div className="py-4 block" key={index}>
                                <span className="p-float-label">
                                    <Toast ref={toast} />
                                    <Controller
                                        name={store.name}
                                        control={control}
                                        rules={{ required: false }}
                                        defaultValue={store.value}
                                        render={({ field }) => (
                                            <>
                                                <InputText
                                                    {...field}
                                                    className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
                                                    keyfilter={store.keyfilter as KeyFilterType}
                                                    placeholder={store.placeholder}
                                                    defaultValue={store.value}
                                                />
                                                {errors[store.name] && (
                                                    <small className="text-red-500">
                                                        {store.alertText}
                                                    </small>
                                                )}
                                            </>
                                        )}
                                        shouldUnregister
                                    />
                                    <label className="block pb-2" htmlFor={store.name}>
                                        {store.label}
                                    </label>
                                </span>
                            </div>
                        ))
                    }
                </div>



            </div>
            <div className='flex flex-col gap-5'>
                <div >
                    <h5 className='font-bold '>Firma electrónica</h5>
                    <FileUpload name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
                </div>

                <div className="flex justify-center gap-8">
                    <Button
                        icon="pi pi-check"
                        className="p-button-success p-mr-2 w-1/2"
                        label="Guardar cambios"
                        typeof='submit'
                        severity='help'
                        onClick={onSubmit}
                    />

                </div>
            </div>

        </div>
    )
}
