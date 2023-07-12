"use client";
import "@/app/globals.css";
import Navegador from "@/components/Nav";
import { IOption } from "@/components/Nav";
import { CardAccountsProvider } from "@/context/CardAccountsProvider";
import { TEnterpriseResponse } from "@/store/types/IUserResponses";
import { useRouter } from "next/navigation";
import "@/app/globals.css";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user;
  let userId;
  const router = useRouter();

  if (localStorage) {
    user = localStorage.getItem("user");
    if (user === null) {
      console.log("no hay usuario");
      router.push(`/`);
    } else {
      const company = JSON.parse(user) as TEnterpriseResponse;
      if (company.name) {
        userId = company.id;
      }
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    router.push(`/`);
  };

  const options: IOption[] = [
    { label: "DashBoard", redirect: "/enterprise", type: "option" },
    { label: "Cuentas", redirect: "/enterprise/accounts", type: "option" },
    { label: "Perfil", redirect: "/enterprise/profile", type: "option" },
    { label: "Cerrar sesión", redirect: handleLogout, type: "button" },
  ];
  return (
    <>
      {userId && (
        <div>
          <Navegador options={options} imageRedirect="/enterprise" />
          <CardAccountsProvider userId={userId} userType="COMPANY">
            <main>{children}</main>
          </CardAccountsProvider>
        </div>
      )}
    </>
  );
}
