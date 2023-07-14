"use client"
import { useState, useEffect, useRef, MouseEvent } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { IInputsForm } from '@/store/types/IForms';
import { useForm } from 'react-hook-form';
import { KeyFilterType } from 'primereact/keyfilter';
import { Dropdown } from 'primereact/dropdown';
import { IBranchResponse } from '@/store/types/IBranch';
import { handleGetAllBranchs } from '@/store/api/branchApi';
import Modal from '@/components/Modal';

const branchs = () => {
    const toast = useRef<Toast>(null);
    const [branchs, setBranchs] = useState<IBranchResponse[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editVisible, setEditVisible] = useState(false);
    const [addVisible, setAddVisible] = useState(false);
    const [branch, setBranch] = useState<IBranchResponse | null>(null);
    const [showModal, setShowModal] = useState(false);

    const columns = [
        { field: 'id', header: 'ID' },
        { field: 'key', header: 'Key' },
        { field: 'name', header: 'Nombre sucursal' },
        { field: 'address', header: 'Dirección' },
    ];

    useEffect(() => {
        handleGetAllBranchs().then((res) => {
            if (res) {
                setBranchs(res);
            }
        });
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredBranchs = branchs.filter((branch) =>
        Object.values(branch).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleModify = (branch: IBranchResponse) => {
        setBranch(branch);
        setEditVisible(true);
    };

    const handleDelete = (branch: IBranchResponse) => {
        console.log(branch);
    };

    const confirm = (event: MouseEvent<HTMLButtonElement>, branch: IBranchResponse) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to delete this record?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept() { accept(branch) },
            reject
        });
    };

    const allForms: IInputsForm[] = [
        {
            name: 'name',
            label: 'Nombre',
            keyfilter: 'alpha',
            placeholder: 'Nombre de la sucursal',
            alertText: '*El nombre es obligatorio',
            onChange: () => { },
        },
        {
            name: 'address',
            label: 'Dirección',
            keyfilter: 'alpha',
            placeholder: 'Dirección de la sucursal',
            alertText: '*La dirección es obligatoria',
            onChange: () => { },
        },
    ]

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const accept = (branch: IBranchResponse) => {
        toast.current?.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        handleDelete(branch)
    };

    const reject = () => {
        toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };

    return (
        <div className="flex flex-col gap-8">

            <h1 className='text-neutral-100 text-3xl text-center font-bold'><span><i className="pi pi-search" style={{ fontSize: '1.5rem' }}></i></span>   Listado de sucursales</h1>

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
                <Button label="Agregar Producto" severity="info" raised className='w-56' icon="pi pi-plus" onClick={() => { setShowModal(true) }} />
            </div>
            <DataTable
                value={filteredBranchs}
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
                                        <Button icon="pi pi-pencil" severity="info" aria-label="User" onClick={() => {
                                            setShowModal(true)
                                            handleModify(rowData)}} />
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
                    <h1 className='font-bold text-center text-3xl'>Modificar {branch?.name}</h1>
                    {branch?.name}
                    {branch?.address}
                </div>
            </Dialog>

            <Dialog visible={addVisible} style={{ width: '50vw' }} onHide={() => setAddVisible(false)}>
                <div className='px-16'>
                    <h1 className='text-center font-bold text-3xl'>Agregar una sucursal</h1>
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
                    <div className='flex justify-evenly gap-4 py-4'>
                        <Button label="Agregar" severity="info" className='w-1/2' />
                        <Button label="Cancelar" severity="danger" className='w-1/2' />
                    </div>

                </div>
            </Dialog>
            
            <Modal isVisible={showModal} onClose={()=> setShowModal(false)}>
                <div className='px-16'>
                    <h1 className='text-center font-bold text-3xl'>Modificar {branch?.name}</h1>
                    </div>
            </Modal>
        </div >
    );
}

export default branchs