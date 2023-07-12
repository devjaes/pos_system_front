import React from "react";
import logo from "../../public/images/face.png";
import Option from "./Option";
import Link from "next/link";
import { UrlObject } from "url";
import Button from "@/components/Button";

type Url = string | UrlObject;
export interface IOption {
  label: string;
  redirect?: string | Url | (() => void);
  type: "button" | "option" | "image";
}

function Navegador({
  options,
  imageRedirect,
}: {
  options: IOption[];
  imageRedirect: string;
}) {
  return (
    <div className="flex bg-blue-500 py-1 ">
      <div className="flex-1 ml-12">
        <Link href={imageRedirect}>
          <img className=" h-24" src={logo.src} alt="logo" />
        </Link>
      </div>

      <div className="flex-1 flex justify-end gap-x-4 mr-12 items-center">
        {options.map((option, index) => {
          if (option.type === "button") {
            return (
              <div className="w-10p text-center" key={index}>
                <Button
                  texto={option.label as string}
                  key={option.label as string}
                  onclick={option.redirect as () => {}}
                />
              </div>
            );
          }

          if (option.type === "option") {
            return (
              <div className="w-10p text-center" key={index}>
                <Option
                  opcion={option.label}
                  redirect={option.redirect as string}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Navegador;
