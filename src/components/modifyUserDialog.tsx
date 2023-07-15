import { handleUpdateProduct } from '@/store/api/productApi';
import { handleUpdateUser } from '@/store/api/userApi';
import { IInputsForm } from '@/store/types/IForms';
import IUserResponse, { IUserUpdate } from '@/store/types/IUserResponses';
import { Button } from 'primereact/button';
import { Dialog } from "primereact/dialog";
import { InputText } from 'primereact/inputtext';
import { KeyFilterType } from 'primereact/keyfilter';
import { Toast } from 'primereact/toast';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';

interface Props {
    user: IUserResponse;
    onHide: () => void;
    visible: boolean;
    setEditVisible: (value: boolean) => void;
}

export default function modifyUserDialog(
    {
        user,
        onHide,
        visible,
        setEditVisible,
    }: Props
) {

    const [userInfo, setUserInfo] = React.useState<IInputsForm[]>([]);
    const toast = React.useRef<Toast>(null);
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    React.useEffect(() => {
        if (user !== undefined) {
            createUserInfo(user);
        }
    }, [user]);

    const onSubmit = handleSubmit((data: any) => {

        const userUpdate: IUserUpdate = {
            name: data.name === user.name ? '' : data.name,
            lastName: data.lastName === user.lastName ? '' : data.lastName,
            email: data.email === user.email ? '' : data.email,
            password: data.password,
        }

        if (data.password !== data.confirmPassword) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Las contraseñas no coinciden', life: 3000 });
            console.log("Las contraseñas no coinciden");
            return;
        }

        handleUpdateUser(user.id, userUpdate).then((res) => {
            if (res) {
                toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Usuario Modificado', life: 3000 });
                setEditVisible(false);
            } else {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al modificar el usuario', life: 3000 });
            }
        });
    });

    const createUserInfo = (user: IUserResponse) => {
        const userInfo: IInputsForm[] = [
            {
                name: "name",
                label: "Nombre",
                keyfilter: "alpha",
                placeholder: "Nombre del Usuario",
                alertText: "*El nombre es obligatorio",
                value: user?.name,
                onChange: () => { },
            },
            {
                name: "lastName",
                label: "Apellido",
                keyfilter: "alpha",
                placeholder: "Apellido del Usuario",
                alertText: "*El apellido es obligatorio",
                value: user?.lastName,
                onChange: () => { },
            },
            {
                name: "email",
                label: "Correo",
                keyfilter: "email",
                placeholder: "Correo electrónico",
                alertText: "*El correo es obligatorio",
                value: user?.email,
                onChange: () => { },
            },
            {
                name: "password",
                label: "Contraseña",
                keyfilter: "alphanum",
                placeholder: "Contraseña",
                alertText: "*La contraseña es obligatoria",
            },
            {
                name: "confirmPassword",
                label: "Confirmar Contraseña",
                keyfilter: "alphanum",
                placeholder: "Confirmar Contraseña",
                alertText: "*La contraseña es obligatoria",
            },
        ];
        setUserInfo(userInfo);
    }


    const renderModifyDialog = (user: IUserResponse) => {
        return (
            <div>
                <form>
                    {userInfo.map((user, index) => (
                        <div className="py-4 block" key={index}>
                            <span className="p-float-label">
                                <Toast ref={toast} />
                                <Controller
                                    name={user.name}
                                    control={control}
                                    rules={{ required: false }}
                                    defaultValue={user.value}
                                    render={({ field }) => (
                                        <>
                                            <InputText
                                                {...field}
                                                className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
                                                keyfilter={user.keyfilter as KeyFilterType}
                                                placeholder={user.placeholder}
                                            />
                                            {errors[user.name] && (
                                                <small className="text-red-500">
                                                    {user.alertText}
                                                </small>
                                            )}
                                        </>
                                    )}
                                    shouldUnregister
                                />
                                <label className="block pb-2" htmlFor={user.name}>
                                    {user.label}
                                </label>
                            </span>
                        </div>
                    ))}



                </form>
                <div className="flex justify-center gap-8">
                    <Button
                        icon="pi pi-check"
                        className="p-button-success p-mr-2 w-1/2"
                        label="Modificar"
                        onClick={onSubmit}
                    />

                </div>
                <div className="flex justify-center items-center py-6">
                    <Button label="Cancelar" severity="danger" className="w-1/2" onClick={() => { setEditVisible(false) }} icon="pi pi-times" />
                </div>

            </div>
        )
    }

    return (
        <>
            <Dialog
                header={"Modificar " + `${user?.name}`}
                visible={visible}
                onHide={onHide}
                style={{ width: '50vw' }}
                modal={true}
            >
                {renderModifyDialog(user)}

            </Dialog>

        </>
    )
}


