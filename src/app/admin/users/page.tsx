"use client"
import React, { useState, useEffect, useRef, MouseEvent } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { handleGetAllUsers } from '@/store/api/userApi';
import IUserResponse from "@/store/types/IUserResponses";
import  {  IUserUpdate , IUserRegister}  from '@/store/types/IUserResponses';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { IInputsForm } from '@/store/types/IForms';
import { useForm } from 'react-hook-form';
import { KeyFilterType } from 'primereact/keyfilter';

export default function DynamicColumnsDemo() {
  const toast = useRef<Toast>(null);
  const [users, setUsers] = useState<IUserResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editVisible, setEditVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [userM, setUser] = useState<IUserUpdate>();

  const columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Nombre' },
    { field: 'lastName', header: 'Apellido' },
    { field: 'email', header: 'Correo' },
    { field: 'rol', header: 'Rol' },
    { field: 'actions', header: 'Acciones' },
  ];

  useEffect(() => {
    handleGetAllUsers().then((res) => {
      if (res) {
        setUsers(res);
      }
    });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  const filteredUsers = users.filter((users) =>
    Object.values(users).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleModify = (userM: IUserUpdate) => {
    setUser(userM);
    setEditVisible(true);
  }

  const handleDelete = (user: IUserResponse) => {
    console.log(user);
  }

  const confirm = (event: MouseEvent<HTMLButtonElement>,user: IUserResponse) => {
    confirmPopup({
      target: event.currentTarget,
      message: '¿Está seguro que desea eliminar este usuario?',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => handleDelete(user),
    });
  }

  const allForms: IInputsForm[] = [
    {
      name: 'name',
      label: 'Nombre',
      keyfilter: 'alpha',
      placeholder: 'Nombre del Usuario',
      alertText: '*El nombre es obligatorio',
      onChange: () => { },
    },
    {
      name: 'lastName',
      label: 'Apellido',
      keyfilter: 'alpha',
      placeholder: 'Apellido del Usuario',
      alertText: '*El apellido es obligatorio',
      onChange: () => { },
    },
    {
      name: 'email',
      label: 'Correo',
      keyfilter: 'email',
      placeholder: 'Correo electrónico',
      alertText: '*El correo es obligatorio',
      onChange: () => { },
    },
    {
      name: 'password',
      label: 'Contraseña',
      keyfilter: 'alphanum',
      placeholder: 'Contraseña',
      alertText: '*La contraseña es obligatoria',
      onChange: () => { },
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const accept = () => {
    toast.current?.show({
      severity: 'info',
      summary: 'SConfirmed',
      detail: 'You have accepted',
      life: 3000,
    });
  }

  const reject = () => {
    toast.current?.show({
      severity: 'info',
      summary: 'Rejected',
      detail: 'You have rejected',
      life: 3000,
    });
  }

  return(
    <div className='flex flex-col gap-8'>
        <h1 className='text-neutral-100 text-3xl text-center font-bold'><span><i className="pi pi-search" style={{ fontSize: '1.5rem' }}></i></span> Listado de Usuarios</h1>
        <div className='flex gap-4 justify-between'>
          <div className='p-input-icon-left'>
            <i className="pi pi-search" style={{ fontSize: '1.2rem' }}></i>
            <InputText 
              type='search' 
              placeholder='Buscar' 
              value={searchTerm} 
              onChange={handleSearch} 
              className="w-96"
            />
          </div>
          <Button label="Agregar Usuario" severity= "info" raised icon="pi pi-plus" className="p-button-success" onClick={() => setAddVisible(true)} />
        </div>
        <DataTable 
          value={filteredUsers}
          tableStyle={{ minWidth: '50rem' }}
          className='centered-table'
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 15]}
        >
          {columns.map((col,i) => {
            if(col.field === 'actions'){
              return (
                <Column
                  key = {col.field}
                  style={{ display: 'flex', justifyContent: 'center' }}
                  header= {col.header}
                  body={(rowData) => (
                    <div className="action-buttons flex gap-6">
                    <Button icon="pi pi-pencil" severity="info" aria-label="User" onClick={() => handleModify(rowData)} />
                    <Toast ref={toast} />
                    <ConfirmPopup />
                    <Button icon="pi pi-eraser" severity="danger" aria-label="Cancel" onClick={(e) => confirm(e,rowData)} />
                    </div>
                  )}

                />
              );
              
          }else{
            return (
              <Column
                key = {col.field}
                field= {col.field}
                header= {col.header}
                body={(rowData) => rowData[col.field] || '-'}
                style={{ textAlign: 'center' }}
              />
            );
          }}
        )}
        </DataTable>
        <Dialog header="Modificar Usuario" visible={editVisible} style={{ width: '50vw' }} onHide={() => setEditVisible(false)}>
        <h1 className='font-bold text-center text-3xl'>Modificar {userM?.name}</h1>
        {allForms.map((form, i) => (
          <div className="pb-4 block" key={i}>
            <label className="block pb-2">{form.label}</label>
            <InputText
              className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
              keyfilter={form.keyfilter as KeyFilterType}
              placeholder={form.placeholder}
              {...register(form.name, {
                required: form.alertText,
              })}
            />
          </div>
        ))}
         <div className="flex justify-between space-x-8">
            <Button label="Aceptar" severity= "info" raised icon="pi pi-check" className="p-button-success w-1/2" onClick={() => setAddVisible(true)} />
            <Button label="Cancelar" severity= "danger" raised icon="pi pi-times" className="p-button-success w-1/2 " onClick={() => setAddVisible(true)} />
          </div>
        </Dialog>

        <Dialog header="Agregar Usuario" visible={addVisible} style={{ width: '50vw' }} onHide={() => setAddVisible(false)}>
          <h1 className="text-center font-bold text-3xl">Agregar un usuario</h1>
          {allForms.map((form, i) => (
            <div className="pb-4 block" key={i} >
              <label className="block pb-2">{form.label}</label>
              <InputText
                className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
                keyfilter={form.keyfilter as KeyFilterType}
                placeholder={form.placeholder}
                {...register(form.name, {
                  required: form.alertText,
              })} />
              
            </div>
           
          ))}
          <div className="flex justify-between space-x-8">
            <Button label="Aceptar" severity= "info" raised icon="pi pi-check" className="p-button-success w-1/2" onClick={() => setAddVisible(true)} />
            <Button label="Cancelar" severity= "danger" raised icon="pi pi-times" className="p-button-success w-1/2 " onClick={() => setAddVisible(true)} />
          </div>
        </Dialog>

    </div>
  )



}
