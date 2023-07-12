"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TClientsResponse } from "@/store/types/IUserResponses";
import { UserEditBox } from "@/components/UserEditBox";
import { ProvinceProvider } from "@/context/ProvinceProvider";
import Button from "@/components/Button";
import Link from "next/link";

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState<TClientsResponse>();

  useEffect(() => {
    const duser = localStorage.getItem("user");
    if (duser) {
      setUser(JSON.parse(duser));
    } else {
      console.log("no hay usuario");
      router.push(`/`);
      return;
    }
  }, []);

  return (
    <div className="mx-auto my-0 max-w-screen-lg mt-8 ">
      <div className="flex justify-between items-center border-2 border-b-0 border-gray-300 border-solid rounded-t-3xl">
        <h1 className="text-center font-bold text-3xl p-4  bg-gray-100 w-8/12 h-full rounded-tl-3xl -m-0">
          Perfil
        </h1>
        <Link
          href="/user/profile/FaceTraining"
          className="bg-blue-500 flex justify-center font-bold text-neutral-50 -m-0 rounded-tr-3xl py-2 w-4/12 cursor-pointer text-xl h-full"
        >
          <div>
            <span>
              Reentrenamiento de<br></br> Reconocimiento Facial
            </span>
          </div>
        </Link>
      </div>
      <ProvinceProvider>{user && <UserEditBox user={user} />}</ProvinceProvider>
    </div>
  );
}
