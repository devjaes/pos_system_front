import React from "react";
import Navegador from "@/components/Nav";
import LookPayN from "../../../public/images/PostLogo5.png";
import { HiOutlineLockClosed } from "react-icons/hi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { HiOutlineSparkles } from "react-icons/hi";
import BloqueInfo from "@/components/aboutBox";
import { IOption } from "@/components/Nav";

function SobreNosotros() {
    const options: IOption[] = [{ label: "Iniciar sesión", redirect: "/", type: "option" }]
    return (
        <div>
            <Navegador options={options} imageRedirect="/" />
            <div className="mx-auto my-0 max-w-screen-xl">
                <main >
                    <h1 className="text-center font-bold text-3xl mt-8">Sobre Nosotros</h1>

                    <div className="flex items-center">
                        <div className="text-center">
                            <p>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa ex
                                optio laudantium enim vero omnis modi totam asperiores officia
                                distinctio, fugiat recusandae, libero unde et inventore possimus
                                quidem quae quia. Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Velit officia explicabo in adipisci ut. Deleniti
                                autem maiores eligendi libero, pariatur saepe impedit. Sit
                                quibusdam quis, molestiae corrupti asperiores eaque. Numquam.
                            </p>
                            <p>
                                {" "}
                                Culpa ex optio laudantium enim vero omnis modi totam asperiores
                                officia distinctio, fugiat recusandae, libero unde et inventore
                                possimus quidem quae quia. Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Velit officia explicabo in adipisci ut. Deleniti
                                autem maiores eligendi libero, pariatur saepe impedit. Sit
                                quibusdam quis, molestiae corrupti asperiores eaque. Numquam.{" "}
                            </p>
                        </div>

                        <img className="about__img" src={LookPayN.src} alt="nosotros" />
                    </div>
                </main>

                <section >
                    <h2 className="font-bold text-center text-3xl mb-8"> Porqué comprar con nosotros</h2>

                    <div className="flex gap-8">
                        <BloqueInfo
                            titulo="Compras rápidas y seguras"
                            svg={<HiOutlineLockClosed className="h-14 w-full mb-4 text-blue-500" />}
                        />

                        <BloqueInfo
                            titulo="Soporte para múltiples métodos de pago"
                            svg={<HiOutlineGlobeAlt className="h-14 w-full mb-4 text-blue-500" />}
                        />

                        <BloqueInfo
                            titulo="Programa de recompensas"
                            svg={<HiOutlineCurrencyDollar className="h-14 w-full mb-4 text-blue-500" />}
                        />

                        <BloqueInfo
                            titulo="Atención al cliente de calidad"
                            svg={<HiOutlineSparkles className="h-14 w-full mb-4 text-blue-500" />}
                        />
                    </div>
                </section>
            </div>
            <footer className="text-center bg-blue-500 py-8 mt-6 text-white font-light">
                <p className="footer__text">LookPay - Todos los derechos reservados 2023.</p>
            </footer>
        </div>
    );
}

export default SobreNosotros;
