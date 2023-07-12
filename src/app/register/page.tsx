import Navegador, { IOption } from "../../components/Nav";
import BloqueRegistro from "@/components/registerBox";
import RegistroUsuario from "../../../public/images/userAccount.png";
import RegistroEmpresa from "../../../public/images/enterpriseAccount2.png";
import { IInputsForm } from "@/components/Input";

function PaginaRegistro() {
  let arrayDeDatos: string[] = [];
  const options: IOption[] = [
    { label: "Regresar", redirect: "/", type: "option" },
  ];

  return (
    <div>
      <Navegador options={options} imageRedirect="/" />

      <div className="my-0 mx-auto max-w-screen-xl ">
        <div className="flex flex-row gap-8 mt-24">
          <BloqueRegistro
            titulo="Cuenta personal"
            arrayDeDatos={
              (arrayDeDatos = [
                "Compra en millones de sitios web alrededor del mundo",
                "Paga solo con tu usuario y contraseña",
                "Olvídate de compartir los datos de tus tarjetas en cada compra",
                "Protección al Comprador",
              ])
            }
            img={RegistroUsuario}
            redirect="/register/user"
          ></BloqueRegistro>

          <BloqueRegistro
            titulo="Cuenta empresarial"
            arrayDeDatos={
              (arrayDeDatos = [
                "Vende alrededor del mundo",
                "Acepta las principales tarjetas de crédito",
                "Recibe pagos a través de tu sitio web o correo electrónico",
                "Sin comisiones mensuales o de apertura",
              ])
            }
            img={RegistroEmpresa}
            redirect="/register/enterprise"
          ></BloqueRegistro>
        </div>
      </div>
    </div>
  );
}

export default PaginaRegistro;
