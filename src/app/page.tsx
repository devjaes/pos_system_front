"use client";
import { useEffect, useState } from "react";
import Input, { IInputsForm } from "../components/Input";
import Button from "../components/Button";
import Navegador, { IOption } from "../components/Nav";
import SecondaryButton from "@/components/secondaryButton";
import logo from "../../public/images/lookPay.png";
import { useRouter } from "next/navigation";
import { fetchLogin } from "@/store/api/loginApi";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Link from "next/link";

function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formDatas: IInputsForm[] = [
    {
      name: "email",
      alertText: "El email es requerido",
      label: "Correo electrónico:",
      type: "email",
      placeholder: "email",
    },
    {
      name: "password",
      alertText: "La contraseña es requerida",
      label: "Contraseña:",
      type: "password",
      placeholder: "password",
    },
  ];

  useEffect(() => {
    const user = window.localStorage.getItem("user");
    const userData = user ? JSON.parse(user) : null;

    if (!user) {
      return;
    }

    if (userData.rol == "ADMIN") {
      toast.success("Bienvenido administrador");
      toast.loading("Cargando...", { duration: 1500 });
      router.push(`/admin/`);
    }

    if ("gender" in userData) {
      toast.success("Bienvenido usuario");
      toast.loading("Cargando...", { duration: 1500 });
      router.push(`/user/`);
    }

    if ("ruc" in userData) {
      toast.success("Bienvenida empresa");
      toast.loading("Cargando...", { duration: 1500 });
      router.push(`/enterprise/`);
    }
  }, []);

  const handleLogin = handleSubmit((data) => {
    try {
      fetchLogin(data.email, data.password).then((user) => {
        if (user) {
          window.localStorage.setItem("user", JSON.stringify(user));

          if ("gender" in user) {
            toast.success("Bienvenido usuario");
            toast.loading("Cargando...", { duration: 1500 });

            router.push(`/user/`);
          } else if ("ruc" in user) {
            toast.success("Bienvenida empresa");
            toast.loading("Cargando...", { duration: 1500 });

            router.push(`/enterprise/`);
          } else if (user.rol == "ADMIN") {
            toast.success("Bienvenido administrador");
            toast.loading("Cargando...", { duration: 1500 });

            router.push(`/admin/`);
          } else {
            toast.error("Hubo un error al iniciar sesión");
            router.push(`/`);
          }
        } else {
          toast.error("Usuario o contraseña incorrectos");
          router.push("/");
        }
      });
    } catch (error) {
      toast.error("Error al iniciar sesión");
      console.log(error);
    }
  });

  const options: IOption[] = [
    { label: "Sobre Nosotros", redirect: "/about", type: "option" },
  ];

  return (
    <div>
      <Navegador options={options} imageRedirect="/" />
      <main className="my-0 mx-auto max-w-screen-lg ">
        <div className="flex mt-28 shadow-lg rounded-l-3xl ">
          <div className="bg-blue-500 flex-2 rounded-l-3xl flex justify-center">
            <img className="w-5/6" src={logo.src} />
          </div>

          <div className="flex flex-col justify-center px-12 flex-1 rounded-r-3xl bg-white gap-2">
            <div className="flex justify-center text-3xl font-bold ">
              <h1>Bienvenido!</h1>
            </div>
            <div className="flex justify-center text-red-500 font-bold "></div>
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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
                      })}
                    />
                    {errors[formData.name] && (
                      <span className="text-red-500">{formData.alertText}</span>
                    )}
                  </div>
                ))}
                <Link
                  href="/restorePassword"
                  className="flex justify-end text-sm my-0 text-blue-800 cursor-pointer"
                >
                  Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center ">
                <Button texto="Ingresar" type="submit" />
                <SecondaryButton
                  texto="Crear cuenta"
                  onclick={() => router.push("/register")}
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
