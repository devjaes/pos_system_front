"use client";
import Link from "next/link";

interface IProps {
  texto?: string;
  onclick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

function Botones({
  texto = "botón",
  onclick = () => {},
  disabled = false,
  type = "button",
}: IProps) {
  return (
    <div
      className={
        "bg-blue-500 flex justify-center font-bold text-neutral-50 rounded-full py-2 w-full cursor-pointer"
      }
    >
      <button
        className="w-full flex justify-center"
        type={type}
        onClick={onclick}
        disabled={disabled}
      >
        {texto}
      </button>
    </div>
  );
}

export default Botones;
