"use client";
import "@/app/globals.css";
import { useRouter } from "next/navigation";
import { PanelMenu } from 'primereact/panelmenu';
import { MenuItem } from 'primereact/menuitem';
import "primereact/resources/themes/bootstrap4-dark-purple/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Image from "next/image";
import Logo from '../../../public/images/PostLogo5.png'

const items: MenuItem[] = [
  {
    label: 'Productos',
    icon: 'pi pi-fw pi-tag',
    url: '/admin/products'

  },

  {
    label: 'Usuarios',
    icon: 'pi pi-fw pi-user',
    items: [
      {
        label: 'Agregar',
        icon: 'pi pi-fw pi-user-plus',
        url: '/admin/addUser'
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
        label: 'Agregar Sucursal/Caja',
        icon: 'pi pi-fw pi-plus-circle',
        url: '/admin/branchs'
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
    <div className='flex '>
      <div className='min-h-screen bg-jair'>
        <div className='h-full '>
          <div className='flex justify-center items-center'>
            <Image src={Logo.src} alt="" width={104} height={104} className='py-2 ' />
          </div>
          <PanelMenu model={items} className="w-52 md:w-25rem mb-4 bg-gray-700" />
        </div>

      </div>
      <div className='flex justify-center items-center w-11/12 bg-slate-600'>
        {children}
      </div>
    </div>
  );
}
