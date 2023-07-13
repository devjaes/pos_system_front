"use client";
import "@/app/globals.css";
import Navegador from "@/components/Nav";
import { IOption } from "@/components/Nav";
import { useRouter } from "next/navigation";
import { ProvinceProvider } from "@/context/ProvinceProvider";
import { PanelMenu } from 'primereact/panelmenu';
import { MenuItem } from 'primereact/menuitem';

const items: MenuItem[] = [
  {
    label: 'Productos',
    icon: 'pi pi-fw pi-tag',
    items: [
      {
        label: 'Agregar',
        icon: 'pi pi-fw pi-plus',

      },
      {
        label: 'Administrar',
        icon: 'pi pi-fw pi-pencil'
      },

    ]
  },

  {
    label: 'Usuarios',
    icon: 'pi pi-fw pi-user',
    items: [
      {
        label: 'Agregar',
        icon: 'pi pi-fw pi-user-plus'
      },
      {
        label: 'Administrar',
        icon: 'pi pi-fw pi-pencil'
      },

    ]
  },
  {
    label: 'Mi Empresa',
    icon: 'pi pi-fw pi-shopping-bag',
    items: [

      {
        label: 'Agregar Cliente',
        icon: 'pi pi-fw pi-plus-circle'
      },
      {
        label: 'Agregar Caja',
        icon: 'pi pi-fw pi-plus-circle'
      },
      {
        label: 'Agregar Sucursal',
        icon: 'pi pi-fw pi-plus-circle'
      },
    ],
  },
  {
    label: 'Configuración',
    icon: 'pi pi-fw pi-wrench',
  }
];


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

  return (
    <>
      <div>
        <div className='flex'>
          <div className='min-h-screen '>
            <div className='h-full'>
              <PanelMenu model={items} className="w-52 md:w-25rem mb-4" />
            </div>

          </div>
          <div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
