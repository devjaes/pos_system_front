"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TEnterpriseResponse } from "@/store/types/IUserResponses";
import { ProvinceProvider } from "@/context/ProvinceProvider";
import { UserEditBox } from "@/components/UserEditBox";

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState<TEnterpriseResponse>();

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
      <h1 className="text-center font-bold text-3xl border-2 border-b-0 border-gray-300 border-solid p-4 rounded-t-3xl bg-gray-100">
        Perfil
      </h1>
      <ProvinceProvider>{user && <UserEditBox user={user} />}</ProvinceProvider>
    </div>
  );
}
