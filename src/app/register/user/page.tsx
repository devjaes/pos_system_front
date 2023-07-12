import Navegador, { IOption } from "@/components/Nav";
import RegisterForm from "@/components/RegisterForm";
import { ProvinceProvider } from "@/context/ProvinceProvider";

export default function page() {
  const options: IOption[] = [
    { label: "Regresar", redirect: "/register", type: "option" },
  ];

  return (
    <div>
      <Navegador options={options} imageRedirect="/register" />
      <main className="mx-auto my-0 max-w-screen-lg mt-16">
        <h1 className="text-center font-bold text-3xl border-2 border-b-0 border-gray-300 border-solid p-4 rounded-t-3xl">
          Crear cuenta
        </h1>
        <ProvinceProvider>
          <RegisterForm isUser={true} />
        </ProvinceProvider>
      </main>
    </div>
  );
}
