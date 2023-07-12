"use client";
import React, { use, useEffect } from "react";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { UserRoles } from "@/store/types/IUserResponses";

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
    <div>
      <main className="flex h-screen">
        <div className="opcion__usuario">
          <div className="opcionUsuario__content h-full p-56 px-80 flex flex-col">
            <div className="font-bold text-white text-center flex-1">
              <h1 className="text-5xl">Usuarios</h1>
            </div>
            <div className="flex-1">
              <Link href="/admin/users">
                <Button texto="Administrar" />
              </Link>
            </div>
          </div>
        </div>

        <div className="opcion__empresa">
          <div className="opcionEmpresa__content h-full p-56 px-80 flex flex-col">
            <div className="font-bold text-white text-center flex-1">
              <h1 className="text-5xl">Productos</h1>
            </div>
            <div className="flex-1">
              <Link href="/admin/enterprises">
                <Button texto="Administrar" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePageAdmin;
