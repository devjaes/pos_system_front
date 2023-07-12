import { useForm } from "react-hook-form";
import { IInputsForm } from "./Input";
import {
  IUserUpdate,
  TClientsResponse,
  TEnterpriseResponse,
} from "@/store/types/IUserResponses";
import { useEffect, useState } from "react";
import { ICityResponse } from "@/store/types/ICitiesResponses";
import { useProvinces } from "@/context/ProvinceProvider";
import { fetchGetCitiesByProvinceId } from "@/store/api/cityApi";
import {
  fetchClient,
  fetchCompany,
  fetchUpdateClient,
  fetchUpdateCompany,
} from "@/store/api/userApi";
import { toast } from "react-hot-toast";
import ComboBox, { CityComboBox } from "./ComboBox";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export const UserEditBox = ({
  user,
}: {
  user: TClientsResponse | TEnterpriseResponse;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const [inputsDisabled, setInputsDisabled] = useState(true);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [provinceDefaultValue, setProvinceDefaultValue] = useState("");

  const formDatas: IInputsForm[] = [
    {
      label: "Nombre",
      name: "name",
      type: "text",
      placeholder: "nombre",
      value: user.name,
      disabled: true,
    },
    {
      label: "Contraseña",
      name: "password",
      type: "password",
      placeholder: "contraseña",
      disabled: inputsDisabled,
      alertText:
        "La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula, una minúscula y un número",
    },
    {
      label: "Email",
      name: "email",
      type: "text",
      placeholder: "email",
      value: user.email,
      disabled: inputsDisabled,
    },
    {
      label: "Numero de telefono",
      name: "phoneNumber",
      type: "telf",
      placeholder: "Numero de telefono",
      disabled: inputsDisabled,
      value: user.phoneNumber,
      alertText: "Número de celular inválido",
    },
    {
      label: "Dirección",
      name: "address",
      type: "text",
      placeholder: "Dirección",
      disabled: inputsDisabled,
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

  const handleModificarClick = () => {
    setInputsDisabled(false);
    setShowSaveButton(true);
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

    if ("dni" in user) {
      fetchUpdateClient(user.id, userUpdate).then((res) => {
        if (res) {
          fetchClient(user.id).then((res) => {
            if (res) {
              const userUpdated = res as TClientsResponse;
              localStorage.setItem("user", JSON.stringify(userUpdated));
              user = userUpdated;
              router.refresh();
            }
          });
          toast.success("Cliente actualizado con éxito");
        }
      });
    } else {
      fetchUpdateCompany(user.id, userUpdate).then((res) => {
        if (res) {
          fetchCompany(user.id).then((res) => {
            if (res) {
              const userUpdated = res as TEnterpriseResponse;
              localStorage.setItem("user", JSON.stringify(userUpdated));
              user = userUpdated;
              router.refresh();
            }
          });
          toast.success("Empresa actualizada con éxito");
        }
      });
    }

    setInputsDisabled(true);
    setShowSaveButton(false);
  });

  return (
    <div className=" flex items-center justify-center bg-transparent ">
      <div className="bg-slate-100 p-4 rounded-b-2xl w-full border-2 border-solid border-slate-300">
        <h2 className="text-lg font-bold mb-2">Editar</h2>
        <div className="flex-1 flex flex-col w-">
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
                  required: false,
                  validate: (value) => {
                    if (formData.name === "phoneNumber") {
                      return (
                        /^09\d{8}$/.test(value) ||
                        "El número de teléfono debe tener 10 dígitos"
                      );
                    }
                    if (formData.name === "password") {
                      if (value === "") {
                        return true;
                      }
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
            {inputsDisabled && (
              <div className="flex-1">
                <label className="block pb-2 ">Provincia</label>
                <input
                  className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
                  type="text"
                  disabled={true}
                  value={user.province}
                />
              </div>
            )}
            {!inputsDisabled && (
              <div className="flex-1">
                <ComboBox
                  label="Provincia:"
                  options={provincesNames}
                  onChange={handleProvinceChange}
                  defaultValue={"Seleccione su provincia"}
                  disabled={inputsDisabled}
                />
              </div>
            )}
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
          {!showSaveButton && (
            <Button texto="Modificar" onclick={handleModificarClick} />
          )}
          {showSaveButton && (
            <>
              <Button
                texto="Cancelar"
                onclick={() => {
                  setInputsDisabled(true);
                  setShowSaveButton(false);
                  setIsProvinceSelected(false);
                  setProvince("");
                  setCityId(0);
                  router.refresh();
                }}
              />
              <Button onclick={handleSave} type="submit" texto="Guardar" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
