import Navegador, { IOption } from '../components/Nav';
import logo from "../../public/images/PostLogo5.png";


function HomePage() {

  const options: IOption[] = [
    { label: "Sobre Nosotros", redirect: "/about", type: "option" },
    { label: "Contacto", redirect: "/contact", type: "option" },
    { label: "Iniciar sesión", redirect: "/ELogin", type: "option" },
  ];

  return (
    <div>
      <Navegador options={options} imageRedirect='/' />
      <main className="h-max flex py-12">

        <div className="container px-6 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-3xl font-semiboldtext-white lg:text-4xl">Best place to choose <br /> your <span className="text-blue-500 ">clothes</span></h1>

                <p className="mt-3  dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro beatae error laborum ab amet sunt recusandae? Reiciendis natus perspiciatis optio.</p>

                <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Shop Now</button>
              </div>
            </div>

            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <img className="w-full h-full lg:max-w-3xl" src="https://merakiui.com/images/components/Catalogue-pana.svg" alt="Catalogue-pana.svg" />
            </div>
          </div>
        </div>

      </main>

      <footer className=" bg-jair h-max">
        <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
          <a href="#">
            <img className="w-16 h-auto" src={logo.src} alt="" />
          </a>

          <p className="text-sm text-gray-300">© Copyright 2021. All Rights Reserved.</p>

          <div className="flex gap-4">
            <i className="pi pi-facebook" />
            <i className="pi pi-github" />
            <i className="pi pi-twitter" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
