"use client";
import React, { use, useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import logo from "../../public/images/face.png";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { IImagesObject, TClientsResponse } from "@/store/types/IUserResponses";
import putimg from "@/store/api/putImages";
import { toast } from "react-hot-toast";

export default function FaceRecognitionTrain() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>();
  const [msg, setMsg] = useState("Sonrie");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const msgs = [
    "Mira al frente",
    "Mira a la izquierda",
    "Mira a la derecha",
    "Mira hacia abajo",
  ];

  useEffect(() => {
    const user = window.localStorage.getItem("user");

    if (user === null) {
      console.log("no hay usuario");
      router.push(`/`);
    } else {
      const { id } = JSON.parse(user) as TClientsResponse;
      id && setUserId(id.toString());
      console.log(id);
    }
  }, []);

  const webcamRef = useRef<Webcam>(null);
  const imagesBuffer: Buffer[] = [];
  const imagesToSave: IImagesObject[] = [];

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();

    if (imageSrc) {
      const base64Data = imageSrc.replace("data:image/jpeg;base64,", "");
      const buffer = Buffer.from(base64Data, "base64");
      imagesBuffer.push(buffer);
    }
  };

  const saveImages = useCallback(async () => {
    setIsButtonDisabled(true);

    const takePhoto = async (index: number) => {
      if (index < 4) {
        setTimeout(() => {
          setMsg(msgs[index]);
          capture();
          takePhoto(index + 1);
          console.log(imagesToSave);
        }, 2500);
      } else {
        imagesBuffer.forEach((image, index) => {
          imagesToSave.push({
            fileName: `${userId}image${index}.jpeg`,
            image,
            userId: userId as unknown as string,
          });
        });

        try {
          putimg(imagesToSave).then((res) => {
            if (res) {
              toast.success("Imágenes subidas correctamente");
              console.log("Imágenes subidas correctamente");
              router.push(`/user/`);
            } else {
              toast.error(
                "Error al realizar el entrenamiento de reconocimiento facial, intente de nuevo"
              );
              router.push(`/register/user/faceRecognition`);
            }
          });
        } catch (error) {
          console.error("Error al subir las imágenes:", error);
          toast.error(
            "Error al realizar el entrenamiento de reconocimiento facial, intente de nuevo"
          );
        }
      }
    };

    takePhoto(0);
  }, [userId]);

  return (
    <div>
      <div className="bg-slate-400 p-8 rounded-3xl pb-2">
        <h1 className="text-center  text-white mb-4 text-3xl">
          Estamos registrando tu bello rostro
        </h1>
        <h1 className="text-center font-bold text-white mb-4 text-3xl">
          {msg}
        </h1>

        <Webcam
          className="rounded-3xl "
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
        <div className="flex justify-center">
          <img className=" h-24" src={logo.src} alt="logo" />
        </div>
      </div>

      {!isButtonDisabled && (
        <Button
          key="RecogButton"
          onclick={saveImages}
          texto="Tomar"
          disabled={isButtonDisabled}
        ></Button>
      )}
    </div>
  );
}
