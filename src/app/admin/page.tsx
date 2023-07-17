"use client";
import React, { use, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { UserRoles } from "@/store/types/IUserResponses";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

function HomePageAdmin() {
  const router = useRouter();
  const header = (
    <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
);

  useEffect(() => {
    const user = window.localStorage.getItem("user");
    const userData = user ? JSON.parse(user) : null;

    if (!user) {
      toast.error("Debes iniciar sesión primero");
      router.push("/user/");
    }

    if (userData.rol != UserRoles.ADMIN) {
      toast.error("No tienes permisos para acceder a esta página");
      router.push("/");
    }
  }, []);

  return (

    <main className='bg-primary-Jair w-11/12'>
      <div className="card justify-center items-center bg-center flex h-screen">
        <Card  header = {header} className="w-2/3">
        <h1 className="text-2xl font-bold text-center">{"POST SISTEM"}</h1>
          <p className="m-0">
            Bienvenido! Aquí podrás administrar tu empresa.
          </p>
        </Card>
      </div>
    </main>

  );
}

export default HomePageAdmin;
