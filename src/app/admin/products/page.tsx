"use client"
import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { handleGetAllProducts } from '@/store/api/productApi';
import { IProductResponse } from '@/store/types/IProducts';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { IInputsForm } from '@/store/types/IForms';
import { useForm } from 'react-hook-form';
import { KeyFilterType } from 'primereact/keyfilter';
import { Dropdown } from 'primereact/dropdown';
import { ICE, IRBPNR, IVAS } from '@/store/types/Tables';


export default function DynamicColumnsDemo() {
    const toast = useRef<Toast>(null);
    const [products, setProducts] = useState<IProductResponse[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editVisible, setEditVisible] = useState(false);
    const [addVisible, setAddVisible] = useState(false);
    const [product, setProduct] = useState<IProductResponse>();
    const [selectedIVA, setSelectedIVA] = useState<any>(null);
    const [selectedICE, setSelectedICE] = useState<any>(null);
    const [selectedIRBP, setSelectedIRBP] = useState<any>(null);

    const columns = [
        { field: 'id', header: 'ID' },
        { field: 'name', header: 'Nombre' },
        { field: 'mainCode', header: 'Código Principal' },
        { field: 'auxCode', header: 'Código Auxiliar' },
        { field: 'description', header: 'Descripción' },
        { field: 'stock', header: 'Stock' },
        { field: 'unitPrice', header: 'Precio Unitario' },
        { field: 'ivaType', header: 'Tipo de IVA' },
        { field: 'iceType', header: 'Tipo de ICE' },
        { field: 'irbpType', header: 'Tipo de IRBP' },
        { field: 'actions', header: 'Acciones' },
    ];

    useEffect(() => {
        handleGetAllProducts().then((res) => {
            if (res) {
                setProducts(res);
            }
        });
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.filter((product) =>
        Object.values(product).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleModify = (product: IProductResponse) => {
        setProduct(product);
        setEditVisible(true);
    };

    const handleDelete = (product: IProductResponse) => {
        console.log(product);
    };

    const confirm = (event: MouseEvent<HTMLButtonElement>, product: IProductResponse) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to delete this record?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept() { accept(product) },
            reject
        });
    };

    const allForms: IInputsForm[] = [
        {
            name: 'name',
            label: 'Nombre',
            keyfilter: 'alpha',
            placeholder: 'Nombre del Producto',
            alertText: '*El nombre es obligatorio',
            onChange: () => { },
        },
        {
            name: 'mainCode',
            label: 'Código Principal',
            keyfilter: 'num',
            placeholder: 'Código Principal',
            alertText: '*El código principal es obligatorio',
            onChange: () => { },
        },
        {
            name: 'auxCode',
            label: 'Código Auxiliar',
            keyfilter: 'num',
            placeholder: 'Código Auxiliar',
            alertText: '*El código auxiliar es obligatorio',
            onChange: () => { },
        },
        {
            name: 'description',
            label: 'Descripción',
            keyfilter: 'alpha',
            placeholder: 'Contraseña',
            alertText: '*La contraseña es obligatoria',
            onChange: () => { },
        },
        {
            name: 'stock',
            label: 'Stock',
            keyfilter: 'num',
            placeholder: 'Stock',
            alertText: '*El stock es obligatorio',
            onChange: () => { },
        },
        {
            name: 'unitPrice',
            label: 'Precio Unitario',
            keyfilter: 'money',
            placeholder: 'Precio Unitario',
            alertText: '*El precio unitario es obligatorio',
            onChange: () => { },
        },

    ]

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const accept = (product: IProductResponse) => {
        toast.current?.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        handleDelete(product)
    };

    const reject = () => {
        toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };


    return (
        <div className="flex flex-col gap-8">

            <h1 className='text-neutral-100 text-3xl text-center font-bold'><span><i className="pi pi-search" style={{ fontSize: '1.5rem' }}></i></span>   Listado de productos</h1>

            <div className='flex gap-4 justify-between'>
                <div className="p-input-icon-left">

                    <i className="pi pi-search"></i>
                    <InputText
                        placeholder="Buscar"
                        value={searchTerm}
                        onChange={handleSearch}
                        className='w-96'
                    />

                </div>
                <Button label="Agregar Producto" severity="info" raised className='w-56' icon="pi pi-plus" onClick={() => { setAddVisible(true) }} />
            </div>
            <DataTable
                value={filteredProducts}
                tableStyle={{ minWidth: '50rem' }}
                className='centered-table'
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
            >
                {columns.map((col, i) => {
                    if (col.field === 'actions') {
                        return (
                            <Column
                                key={col.field}
                                style={{ display: 'flex', justifyContent: 'center' }}
                                header={col.header}
                                body={(rowData) => (
                                    <div className="action-buttons flex gap-6">
                                        <Button icon="pi pi-pencil" severity="info" aria-label="User" onClick={() => handleModify(rowData)} />
                                        <Toast ref={toast} />
                                        <ConfirmPopup />
                                        <Button icon="pi pi-eraser" severity="danger" aria-label="Cancel" onClick={(e) => confirm(e, rowData)} />
                                    </div>
                                )}
                            />
                        );
                    } else {
                        return (
                            <Column
                                key={col.field}
                                field={col.field}
                                header={col.header}
                                body={(rowData) => rowData[col.field] || '-'}
                                style={{ textAlign: 'center' }}
                            />
                        );
                    }
                })}
            </DataTable>

            <Dialog header="Header" visible={editVisible} style={{ width: '50vw' }} onHide={() => setEditVisible(false)}>
                <div>
                    <h1 className='font-bold text-center text-3xl'>Modificar {product?.name}</h1>
                    {product?.auxCode}
                    {product?.description}
                    {product?.iceType}
                    {product?.id}
                    {product?.irbpType}
                    {product?.ivaType}
                    {product?.mainCode}
                    {product?.name}
                    {product?.stock}
                    {product?.unitPrice}
                </div>
            </Dialog>

            <Dialog visible={addVisible} style={{ width: '50vw' }} onHide={() => setAddVisible(false)}>
                <div className='px-16'>
                    <h1 className='text-center font-bold text-3xl'>Agregar un producto</h1>
                    {allForms.map((allForm, index) => (
                        <div className="py-4 block" key={index}>
                            <span className="p-float-label">
                                <InputText
                                    id={allForm.name}
                                    className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
                                    keyfilter={allForm.keyfilter as KeyFilterType}
                                    placeholder={allForm.placeholder}
                                    {...register(allForm.name, {
                                        required: allForm.alertText,
                                    })} />
                                <label className="block pb-2" htmlFor={allForm.name}>{allForm.label}</label>
                            </span>
                        </div>
                    ))}
                    <div className='flex justify-around'>
                        <div className="card flex justify-content-center py-4">
                            <span className="p-float-label">
                                <Dropdown inputId="IVA" value={selectedIVA} onChange={(e) => setSelectedIVA(e.value)}
                                    options={IVAS} optionLabel="name" className="w-full md:w-14rem" />
                                <label htmlFor="IVA">IVA</label>
                            </span>
                        </div>
                        <div className="card flex justify-content-center py-4">
                            <span className="p-float-label">
                                <Dropdown inputId="ICE" value={selectedICE} onChange={(e) => setSelectedICE(e.value)}
                                    options={ICE} optionLabel="name" className="w-full md:w-14rem" />
                                <label htmlFor="ICE">ICE</label>
                            </span>
                        </div>
                        <div className="card flex justify-content-center py-4">
                            <span className="p-float-label">
                                <Dropdown inputId="IRBP" value={selectedIRBP} onChange={(e) => setSelectedIRBP(e.value)}
                                    options={IRBPNR} optionLabel="name" className="w-full md:w-14rem" />
                                <label htmlFor="IRBP">IRBP</label>
                            </span>
                        </div>
                    </div>
                    <div className='flex justify-evenly gap-4 py-4'>
                        <Button label="Agregar" severity="info" className='w-1/2' />
                        <Button label="Cancelar" severity="danger" className='w-1/2' />
                    </div>

                </div>
            </Dialog>

        </div >
    );
}