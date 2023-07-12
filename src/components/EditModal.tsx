import React, { useEffect, useState } from "react";
import { IInputsForm } from "./Input";
import { useForm } from "react-hook-form";
import { useProvinces } from "@/context/ProvinceProvider";
import { ICityResponse } from "@/store/types/ICitiesResponses";
import { fetchGetCitiesByProvinceId } from "@/store/api/cityApi";
import ComboBox, { CityComboBox } from "./ComboBox";
import Button from "@/components/Button";
import {
  fetchUpdateClient,
  fetchUpdateCompany,
  fetchUpdateUser,
} from "@/store/api/userApi";
import { IUserUpdate } from "@/store/types/IUserResponses";
import { toast } from "react-hot-toast";
import { useClientsCompanies } from "@/context/ClientsCompaniesProvider";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, user }) => {
  if (!isOpen) {
    return null;
  }

  const { setResearch } = useClientsCompanies();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formDatas: IInputsForm[] = [
    {
      label: "name",
      name: "name",
      type: "text",
      placeholder: "nombre",
      value: user.name,
      disabled: true,
    },
    {
      label: "password",
      name: "password",
      type: "text",
      placeholder: "contraseña",
      disabled: false,
      alertText:
        "La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula, una minúscula y un número",
    },
    {
      label: "email",
      name: "email",
      type: "text",
      placeholder: "email",
      value: user.email,
      disabled: false,
    },
    {
      label: "phoneNumber",
      name: "phoneNumber",
      type: "number",
      placeholder: "Numero de telefono",
      disabled: false,
      value: user.phoneNumber,
      alertText: "Número de telefono invalido",
    },
    {
      label: "Dirección",
      name: "address",
      type: "text",
      placeholder: "Dirección",
      disabled: false,
      value: user.address,
    },
  ];
  const [province, setProvince] = useState("");
  const [cityId, setCityId] = useState(0);
  const [cities, setCities] = useState<ICityResponse[]>([]);
  const { provincesNames, provinces } = useProvinces();
  const [isProvinceSelected, setIsProvinceSelected] = useState(false);
  const [isCitySelected, setIsCitySelected] = useState(false);

  const handleProvinceChange = (selectedProvince: string) => {
    setProvince(selectedProvince);
    setIsProvinceSelected(true);
  };

  useEffect(() => {
    if (province !== "") {
      fetchGetCitiesByProvinceId(
        provinces.find((p) => p.name === province)?.id as number
      ).then((res) => {
        setCities(res as ICityResponse[]);
      });
    }
  }, [province]);

  const handleCityChange = (selectedCity: number) => {
    setCityId(selectedCity);
  };

  const handleSave = handleSubmit((data) => {
    const userUpdate: IUserUpdate = {
      email: data.email ? data.email : "",
      phoneNumber: data.phoneNumber ? data.phoneNumber : "",
      password: data.password ? data.password : "",
      address: data.address ? data.address : "",
      cityId: cityId ? cityId : 0,
    };

    if (user.dni) {
      fetchUpdateClient(user.id, userUpdate).then((res) => {
        if (res) {
          toast.success("Cliente actualizado con éxito");
          onClose();
          setResearch(true);
        }
      });
    } else {
      fetchUpdateCompany(user.id, userUpdate).then((res) => {
        if (res) {
          toast.success("Empresa actualizada con éxito");
          onClose();
          setResearch(true);
        }
      });
    }
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-4 rounded">
        <h2 className="text-lg font-bold mb-2">Edit User</h2>
        <div className="flex-1 flex flex-col w-96">
          {formDatas.map((formData, index) => (
            <div className="pb-4 block" key={index}>
              <label className="block pb-2 "> {formData.label}</label>
              <input
                className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
                type={formData.type}
                defaultValue={formData.value}
                disabled={formData.disabled}
                placeholder={formData.placeholder}
                {...register(formData.name, {
                  required: formData.alertText,
                  validate: (value) => {
                    if (formData.name === "phoneNumber") {
                      return (
                        /^09\d{8}$/.test(value) ||
                        "El número de teléfono debe tener 10 dígitos"
                      );
                    }
                    if (formData.name === "password") {
                      return (
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/.test(value) ||
                        formData.alertText
                      );
                    }
                    return true;
                  },
                })}
              />
              {errors[formData.name] && (
                <span className="text-red-500">{formData.alertText}</span>
              )}
            </div>
          ))}
          <div className="flex gap-8">
            <div className="flex-1">
              <ComboBox
                label="Provincia:"
                options={provincesNames}
                onChange={handleProvinceChange}
                defaultValue={"Seleccione su provincia"}
              />
            </div>

            {isProvinceSelected && (
              <div className="flex-1">
                <CityComboBox
                  label="Ciudad:"
                  arrayDeOpciones={cities}
                  onChange={handleCityChange}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <Button onclick={onClose} texto="Cancelar" />
          <Button onclick={handleSave} type="submit" texto="Guardar" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
