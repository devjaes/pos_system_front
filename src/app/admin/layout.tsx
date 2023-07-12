"use client";
import "@/app/globals.css";
import Navegador from "@/components/Nav";
import { IOption } from "@/components/Nav";
import { ClientsCompaniesProvider } from "@/context/ClientsCompaniesProvider";
import { useRouter } from "next/navigation";
import { ProvinceProvider } from "@/context/ProvinceProvider";


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
        <ProvinceProvider>
          <ClientsCompaniesProvider>
            <main>{children}</main>
          </ClientsCompaniesProvider>
        </ProvinceProvider>
      </div>
    </>
  );
}
