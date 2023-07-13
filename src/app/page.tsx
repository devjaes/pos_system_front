"use client";
import { useEffect, useState } from "react";
import Input, { IInputsForm } from '../components/Input';
import Button from '../components/Button';
import Navegador, { IOption } from '../components/Nav';
import SecondaryButton from '@/components/secondaryButton';
import { useRouter } from 'next/navigation';
import { fetchLogin } from '@/store/api/loginApi';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useForm } from "react-hook-form";

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
    { label: "Contacto", redirect: "/contact", type: "option" },
    { label: "Iniciar sesión", redirect: "/ELogin", type: "option" },
  ];

  return (
    <div>
      <Navegador options={options} imageRedirect='/' />
      <main className="h-screen flex justify-center items-center">

      </main>
    </div>
  );
}

export default Login;
