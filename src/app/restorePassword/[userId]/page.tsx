"use client";
import { IInputsForm } from "@/components/Input";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { fetchResetPassword } from "@/store/api/userApi";

export default function page({ params }: { params: { userId: number } }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formData: IInputsForm[] = [
    {
      name: "password",
      label: "Nueva contraseña:",
      alertText: "Contraseña requerida",
      type: "password",
      placeholder: "Contraseña",
    },
    {
      name: "confirmPassword",
      label: "Confirmar contraseña:",
      alertText: "Confirmar contraseña requerida",
      type: "password",
      placeholder: "Confirmar contraseña",
    },
  ];

  useEffect(() => {
    const locUserId = window.localStorage.getItem("resetPasswordToken");

    const recUserId = locUserId
      ? (locUserId.replaceAll("token", "") as unknown as number)
      : null;

    console.log(recUserId, params, params.userId);

    if (!recUserId) {
      toast.error("No se ha seleccionado un usuario");
      router.push("/");
    }

    if (recUserId != params.userId) {
      toast.error("No puedes cambiar la contraseña de otro usuario");
      router.push("/");
    }
  }, []);

  const handleNewPsswd = handleSubmit((data) => {
    console.log(data.password);
    console.log(window.localStorage.getItem("email"));

    if (data.password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres");
    }
    if (data.password != data.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    fetchResetPassword(params.userId, { newPassword: data.password }).then(
      (response) => {
        if (response) {
          toast.success("Contraseña actualizada");
          window.localStorage.removeItem("resetPasswordToken");
          router.push("/");
        } else {
          toast.error("Error al actualizar la contraseña");
        }
      }
    );
  });

  return (
    <div className="mx-auto my-4 max-w-screen-md ">
      <div className="border-2 border-solid border-slate-300 p-4 rounded-3xl">
        <p className="italic font-light">
          Para restablecer tu contraseña de forma segura, elige una combinación
          de al menos 8 caracteres que incluya letras (mayúsculas y minúsculas),
          números y caracteres especiales. Evita usar información personal y
          secuencias obvias
        </p>
      </div>
      <div className="mt-8">
        {formData.map((data, index) => (
          <div className="pb-4 block mt-4" key={index}>
            <label className="block pb-2 "> {data.label}</label>
            <input
              className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
              type={data.type}
              placeholder={data.placeholder}
              {...register(data.name, {
                required: data.alertText,
              })}
            />
            {errors[data.name] && (
              <span className="text-red-500">{data.alertText}</span>
            )}
          </div>
        ))}
        <div className="mt-4">
          <Button texto="Reestablecer contraseña " onclick={handleNewPsswd} />
        </div>
      </div>
    </div>
  );
}
