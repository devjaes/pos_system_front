"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import logo from "../../../../public/images/face.png";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import {
  TClientsResponse,
  TEnterpriseResponse,
} from "@/store/types/IUserResponses";
import { getMatchs } from "@/store/api/putImages";
import { fetchClient } from "@/store/api/userApi";
import { toast } from "react-hot-toast";
import ChargeModal from "@/components/chargeModal";
import { format } from "date-fns";
import { IPartPaymentCreation } from "@/store/types/IPaymentMethods";

export default function page({ params }: { params: { accountId: number } }) {
  const router = useRouter();
  const [userData, setUserData] = useState<TEnterpriseResponse>();
  const [msg, setMsg] = useState("Sonrie");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [clientFound, setClientFound] = useState(false);
  const [client, setClient] = useState<TClientsResponse>();
  const [partPayment, setPartPayment] = useState<IPartPaymentCreation>();
  const currentDate = new Date();
  console.log("currentDate: ", currentDate.toString());
  const formattedDate = currentDate.toString();

  let imagesBuffer: Buffer;

  useEffect(() => {
    const user = window.localStorage.getItem("user");

    if (!user) {
      toast.error("No hay usuario");
      console.log("no hay usuario");
      router.push(`/`);
      return;
    } else {
      const enterprise = JSON.parse(user);

      if ("gender" in enterprise) {
        toast.error("No es una empresa");
        console.log("No es una empresa");
        router.push(`/user`);
        return;
      }

      const paymentCreation = localStorage.getItem("paymentCreation");
      if (paymentCreation) {
        const payment = JSON.parse(paymentCreation) as IPartPaymentCreation;

        if (!payment) {
          toast.error("No hay pago");
          console.log("no hay pago");
          router.push(`/enterprise`);
        }

        setPartPayment(payment);
        setUserData(enterprise as TEnterpriseResponse);
      } else {
        toast.error("No hay pago");
        console.log("no hay pago");
        router.push(`/enterprise`);
      }
    }

    console.log("user: ", user);
  }, []);

  const webcamRef = useRef<Webcam>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();

    if (imageSrc) {
      const base64Data = imageSrc.replace("data:image/jpeg;base64,", "");
      const buffer = Buffer.from(base64Data, "base64");
      imagesBuffer = buffer;
    }
  };

  const saveImage = useCallback(async () => {
    setIsButtonDisabled(true);

    const takePhoto = async (index: number) => {
      capture();

      try {
        const matches = await getMatchs(imagesBuffer);
        console.log(matches);
        if (matches.length >= 3) {
          const clientId = matches[0]?.userId as unknown as number;
          const client = await fetchClient(clientId);

          if (client) {
            setMsg("Hola " + client.name + " procederemos a realizar tu pago");
            setTimeout(() => {
              setClientFound(true);
              setClient(client);
            }, 3000);
          } else {
            setMsg("No se encontró el usuario, por favor intente de nuevo");
            setIsButtonDisabled(false);
            setClientFound(false);
          }
        } else {
          setMsg("No se encontró el usuario, por favor intente de nuevo");
          setIsButtonDisabled(false);
          setClientFound(false);
        }
      } catch (error) {
        console.error("Error al subir la imágen:", error);
        setIsButtonDisabled(false);
      }
    };

    takePhoto(0);
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-12 ">
        <div className="bg-slate-400 rounded-3xl pt-4 max-w-xl">
          <h1 className="text-center  text-white mb-4 text-3xl">
            Estamos registrando tu bello rostro
          </h1>
          <div className="">
            <h1 className="text-center font-bold text-white mb-4 text-3xl">
              {msg}
            </h1>
          </div>

          <Webcam className="" ref={webcamRef} screenshotFormat="image/jpeg" />
          <div className="flex justify-center">
            <img className=" h-16" src={logo.src} alt="logo" />
          </div>

          {!isButtonDisabled && (
            <div
              className="flex w-full m-0 bg-blue-500 h-16 justify-center items-center rounded-b-3xl "
              onClick={saveImage}
            >
              <Button
                key="RecogButton"
                onclick={saveImage}
                texto="Tomar"
                disabled={isButtonDisabled}
              ></Button>
            </div>
          )}
        </div>
        {clientFound && (
          <ChargeModal
            amount={partPayment?.amount as number}
            name={partPayment?.name as string}
            description={partPayment?.description as string}
            companyAccountName={partPayment?.companyAccountName as string}
            companyAccountNumber={partPayment?.companyAccountNumber as string}
            companyName={userData?.name as string}
            companyRuc={userData?.ruc as string}
            paymentDate={formattedDate}
            clientDNI={client?.dni as string}
            clientName={client?.name as string}
          />
        )}
      </div>
    </div>
  );
}
