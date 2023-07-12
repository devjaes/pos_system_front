"use client";
import React, { use, useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Navegador, { IOption } from "@/components/Nav";
import logo from "../../../../../public/images/face.png";
import Button from "@/components/Button";
import FaceRecognitionTrain from "@/components/FaceRecognitionTrain";
import { useRouter } from "next/navigation";
import { IImagesObject, TClientsResponse } from "@/store/types/IUserResponses";
import putimg from "@/store/api/putImages";
import { toast } from "react-hot-toast";

export default function page() {
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
      id && setUserId(String(id));
      console.log(userId, typeof userId);
    }
  }, []);

  const options: IOption[] = [
    { label: "Regresar", redirect: "/register/user", type: "option" },
  ];
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
      <Navegador options={options} imageRedirect="/register" />
      <div className="flex justify-center items-center mt-12 ">
        <FaceRecognitionTrain />
      </div>
    </div>
  );
}
