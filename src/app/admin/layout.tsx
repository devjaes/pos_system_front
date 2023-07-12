"use client";
import "@/app/globals.css";
import Navegador from "@/components/Nav";
import { IOption } from "@/components/Nav";
import { useRouter } from "next/navigation";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    window.localStorage.removeItem("user");

    router.push(`/`);
  };

  const options: IOption[] = [
    { label: "Cerrar sesión", redirect: handleLogout, type: "button" },
  ];
  return (
    <>
      <div>
        <Navegador options={options} imageRedirect="/admin" />
            <main>{children}</main>
      </div>
    </>
  );
}
