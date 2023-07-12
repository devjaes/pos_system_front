"use client";
import React, { useEffect, useState, useMemo } from "react";
import Table from "@/components/enterpirseTable";
import Link from "next/link";
import { useClientsCompanies } from "@/context/ClientsCompaniesProvider";
import { handlerRemove } from "@/store/api/putImages";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const { clients } = useClientsCompanies();
  const [totalItems, setTotalItems] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [paginatedUsers, setPaginatedUsers] = useState([]);


  useEffect(() => {
    if (clients) {
      setTotalItems(clients.length);
      setStartIndex((currentPage - 1) * itemsPerPage);
      setEndIndex(startIndex + itemsPerPage);
      if (clients.length < itemsPerPage) {
        setPaginatedUsers(clients.slice(0, clients.length) as any);
      } else {
        setPaginatedUsers(clients.slice(startIndex, endIndex) as any);
      }
      console.log(startIndex);
    }
  }, [clients, startIndex, endIndex, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Cédula",
        accessor: "dni",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Ciudad",
        accessor: "city",
      },
      {
        Header: "Address",
        accessor: "address",
      },
    ],
    []
  );

  return (
    <div>
      <div className="p-4 pb-0">
        <Link href="/admin" className="p-4 pb-0 underline text-xl">
          Regresar
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Administrar usuarios
      </h1>

      <div className="my-0 mx-auto max-w-screen-xl mt-6">
        <Table
          columns={columns}
          data={paginatedUsers}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          isClient={true}
          onPageChange={handlePageChange}
          key={"clients"}
        />

      </div>
    </div>
  );
}
