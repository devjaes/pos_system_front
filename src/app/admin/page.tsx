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
      <div>
        <Card title="Title">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
            numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
          </p>
        </Card>
      </div>
      <div >
        <Button label='Prueba' severity='warning' />
      </div>
    </main>

  );
}

export default HomePageAdmin;
