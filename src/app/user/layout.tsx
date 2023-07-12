"use client";
import "@/app/globals.css";
import Navegador from "@/components/Nav";
import { IOption } from "@/components/Nav";
import { CardAccountsProvider } from "@/context/CardAccountsProvider";
import { TClientsResponse } from "@/store/types/IUserResponses";
import { useRouter } from "next/navigation";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = localStorage.getItem("user");
  let userId;
  const router = useRouter();

  if (user === null) {
    console.log("no hay usuario");
    router.push(`/`);
  } else {
    const client = JSON.parse(user) as TClientsResponse;
    if (client.name) {
      userId = client.id;
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    router.push(`/`);
  };

  const options: IOption[] = [
    { label: "DashBoard", redirect: "/user", type: "option" },
    { label: "Cuentas", redirect: "/user/accounts", type: "option" },
    { label: "Perfil", redirect: "/user/profile", type: "option" },
    { label: "Cerrar sesión", redirect: handleLogout, type: "button" },
  ];
  return (
    <>
      {userId && (
        <div>
          <Navegador options={options} imageRedirect="/user" />
          <CardAccountsProvider userId={userId} userType="CLIENT">
            <main>{children}</main>
          </CardAccountsProvider>
        </div>
      )}
    </>
  );
}
