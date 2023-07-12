"use client";

import { CityComboBox } from "./ComboBox";
import Button from "./Button";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useProvinces } from "../context/ProvinceProvider";
import { IInputsForm } from "./Input";
import { useRouter } from "next/navigation";
import {
  fetchRegisterEnterprise,
  fetchRegisterUser,
} from "../store/api/userApi";
import { fetchGetCitiesByProvinceId } from "../store/api/cityApi";
import { ICityResponse } from "../store/types/ICitiesResponses";
import {
  IUserRegister,
  TClientsResponse,
  TEnterpriseResponse,
} from "../store/types/IUserResponses";

import { toast } from "react-hot-toast";
import ComboBox from "./ComboBox";
import validateDni, { validateRuc } from "@/utils/dniRucValidator";

const RegisterForm = ({ isUser }: { isUser: boolean }) => {
  const router = useRouter();
  const [gender, setGender] = useState("");
  const [province, setProvince] = useState("");
  const [cityId, setCityId] = useState(0);
  const [cities, setCities] = useState<ICityResponse[]>([]);
  const [isProvinceSelected, setIsProvinceSelected] = useState(false);
  const [isCitySelected, setIsCitySelected] = useState(false);
  const [isGenderSelected, setIsGenderSelected] = useState(false);
  const { provincesNames, provinces } = useProvinces();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const genderOptions = {
    Masculino: "MALE",
    Femenino: "FEMALE",
    Otro: "OTHER",
  };

  const userDatas: IInputsForm[] = [
    {
      name: "name",
      label: "Nombre:",
      alertText: "Nombre requerido",
      type: "text",
      placeholder: "Nombre",
    },
    {
      name: "lastName",
      label: "Apellido:",
      alertText: "Apellido requerido",
      type: "text",
      placeholder: "Apellido",
    },
    {
      name: "dni",
      label: "Cedula:",
      alertText:
        "Cédula invalida, debe tener 10 dígitos, sin puntos ni guiones",
      type: "number",
      placeholder: "Cédula",
    },
  ];

  const enterpriseDatas: IInputsForm[] = [
    {
      name: "enterpriseName",
      label: "Nombre de la empresa:",
      alertText: "Nombre de empresa requerido",
      type: "text",
      placeholder: "Nombre",
    },
    {
      name: "ruc",
      label: "Ruc:",
      alertText: "Ruc invalido, debe tener 13 dígitos, sin puntos ni guiones",
      type: "number",
      placeholder: "Ruc",
    },
  ];

  let formDatas: IInputsForm[] = [];

  if (isUser) {
    formDatas = userDatas;
  } else {
    formDatas = enterpriseDatas;
  }

  const formDatas2: IInputsForm[] = [
    {
      name: "email",
      label: "Correo electrónico:",
      alertText: "Correo electrónico requerido",
      type: "email",
      placeholder: "Correo electrónico",
    },
    {
      name: "password",
      label: "Contraseña:",
      alertText:
        "La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula, una minúscula y un número",
      type: "password",
      placeholder: "Contraseña",
    },
    {
      name: "repeatPassword",
      label: "Repite tu contraseña: ",
      alertText: "Las contraseñas no coinciden",
      type: "password",
      placeholder: "",
    },
    {
      name: "phoneNumber",
      label: "Número de celular:",
      alertText: "Número de celular inválido",
      type: "tel",
      placeholder: "Número de celular",
    },
  ];

  const handleCityChange = (selectedCity: number) => {
    setIsCitySelected(true);
    setCityId(selectedCity);
  };

  const handleGenderChange = (selectedGender: string) => {
    setGender(genderOptions[selectedGender as keyof typeof genderOptions]);
    setIsGenderSelected(true);
  };

  const handleProvinceChange = (selectedProvince: string) => {
    setProvince(selectedProvince);
    setIsProvinceSelected(true);
    setIsCitySelected(false);
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

  const handleRegister = handleSubmit((data) => {
    if (data.password !== data.repeatPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (data.birthDate === "") {
      toast.error("Fecha de nacimiento requerida");
      return;
    }

    if (!isCitySelected) {
      toast.error("Ciudad requerida");
      return;
    }

    const user: IUserRegister = {
      name: isUser ? data.name + " " + data.lastName : data.enterpriseName,
      email: data.email,
      password: data.password,
      rol: isUser ? "CLIENT" : "COMPANY",
      address: data.address,
      phoneNumber: data.phoneNumber,
      originDate: data.birthDate,
      cityId: cityId,
      dni_ruc: isUser ? data.dni : data.ruc,
      gender: isUser ? gender : "",
    };

    if (!isGenderSelected && isUser) {
      toast.error("Género requerido");
      return;
    }

    if (isUser) {
      fetchRegisterUser(user).then((user) => {
        if (user) {
          window.localStorage.setItem(
            "user",
            JSON.stringify(user as TClientsResponse)
          );
          toast.success("Preparate para el reconocimiento facial");
          router.push("/register/user/faceRecognition");
        } else {
          console.log("error", user);
          toast.error("No se pudo realizar el registro del usuario");
          //router.push("/register");
        }
      });
    } else {
      fetchRegisterEnterprise(user).then((user) => {
        if (user) {
          window.localStorage.setItem(
            "user",
            JSON.stringify(user as TEnterpriseResponse)
          );
          toast.success("Empresa registrada exitosamente");
          router.push("/enterprise");
        } else {
          console.log("error", user);
          toast.error("No se pudo realizar el registro de la empresa");
          //router.push("/register");
        }
      });
    }
  });

  return (
    <div className="">
      <form className="border-2 border-gray-300 border-solid rounded-b-3xl p-8">
        <div>
          {formDatas.map((formData, index) => (
            <div className="pb-4 block" key={index}>
              <label className="block pb-2 "> {formData.label}</label>
              <input
                className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
                type={formData.type}
                placeholder={formData.placeholder}
                {...register(formData.name, {
                  required: formData.alertText,
                  validate: (value) => {
                    if (formData.name === "dni") {
                      return (
                        validateDni(value) || "La cédula debe tener 10 dígitos"
                      );
                    }
                    if (formData.name === "ruc") {
                      return validateRuc(value);
                      // || "El ruc debe tener 13 dígitos"
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
        </div>
        <div className="flex gap-8">
          <div className="flex-1">
            <label className="block pb-2 ">Fecha de nacimiento:</label>
            <input
              className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
              type="date"
              placeholder="Fecha de nacimiento"
              {...register("birthDate", {
                required: "Fecha de nacimiento requerida",
              })}
            />
            {errors.birthDate && (
              <span className="text-red-500">
                Fecha de nacimiento requerida
              </span>
            )}
          </div>
          {isUser && (
            <div className="flex-1">
              <ComboBox
                label="Genero:"
                options={["Masculino", "Femenino", "Otro"]}
                onChange={handleGenderChange}
                defaultValue={"Seleccione su género"}
              />
            </div>
          )}
        </div>
        <div>
          {formDatas2.map((formData, index) => (
            <div className="pb-4 block" key={index}>
              <label className="block pb-2 "> {formData.label}</label>
              <input
                className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
                type={formData.type}
                placeholder={formData.placeholder}
                {...register(formData.name, {
                  required: formData.alertText,
                  validate: (value) => {
                    if (formData.name === "password") {
                      return (
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/.test(value) ||
                        formData.alertText
                      );
                    }
                    if (formData.name === "email") {
                      return (
                        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(
                          value
                        ) || "Correo electrónico inválido"
                      );
                    }
                    if (formData.name === "phoneNumber") {
                      return (
                        /^09\d{8}$/.test(value) ||
                        "El número de teléfono debe tener 10 dígitos"
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
        </div>
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
        <div className="pb-4 block">
          <label className="block pb-2 "> Dirección</label>
          <input
            className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
            type="text"
            placeholder="Dirección"
            {...register("address", {
              required: "Dirección requerida",
            })}
          />
          {errors.address && (
            <span className="text-red-500">Dirección requerida</span>
          )}
        </div>

        <div className="flex justify-end w-2/6 ">
          <Button texto="Crear cuenta" onclick={handleRegister} />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
