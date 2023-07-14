import Navegador, { IOption } from '../components/Nav';


function HomePage() {

  const options: IOption[] = [
    { label: "Sobre Nosotros", redirect: "/about", type: "option" },
    { label: "Contacto", redirect: "/contact", type: "option" },
    { label: "Iniciar sesión", redirect: "/ELogin", type: "option" },
  ];

  return (
    <div>
      <Navegador options={options} imageRedirect='/' />
      <main className="h-screen flex justify-center items-center">

      </main>
    </div>
  );
}

export default HomePage;
