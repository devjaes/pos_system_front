"use client";
import React, { useEffect, useState, useMemo } from "react";
import Table from "@/components/enterpirseTable";
import { TEnterpriseResponse } from "@/store/types/IUserResponses";
import { fetchAllCompanies } from "@/store/api/userApi";
import Link from "next/link";
import { useClientsCompanies } from "@/context/ClientsCompaniesProvider";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const { companies, setResearch } = useClientsCompanies();
  const [totalItems, setTotalItems] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [paginatedUsers, setPaginatedUsers] = useState([]);

  useEffect(() => {
    if (companies) {
      setTotalItems(companies.length);
      setStartIndex((currentPage - 1) * itemsPerPage);
      setEndIndex(startIndex + itemsPerPage);
      if (companies.length < itemsPerPage) {
        setPaginatedUsers(companies.slice(0, companies.length) as any);
      } else {
        setPaginatedUsers(companies.slice(startIndex, endIndex) as any);
      }
      console.log(startIndex);
    }
  }, [companies, startIndex, endIndex, currentPage]);

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
        Header: "Nombre",
        accessor: "name",
      },
      {
        Header: "RUC",
        accessor: "ruc",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Telefono",
        accessor: "phoneNumber",
      },
      {
        Header: "Ciudad",
        accessor: "city",
      },
      {
        Header: "Provincia",
        accessor: "province",
      },
      {
        Header: "Direccion",
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
      <h1 className="text-2xl font-bold mb-4 text-center my-6">
        Administrar empresas
      </h1>
      <div className="my-0 mx-auto max-w-screen-2xl mt-6">
        <Table
          columns={columns}
          data={paginatedUsers}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          isClient={false}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
