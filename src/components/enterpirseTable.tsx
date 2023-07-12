import React from "react";
import { useTable, Column } from "react-table";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import Modal from "@/components/EditModal";
import { fetchDeleteClient, fetchDeleteCompany } from "@/store/api/userApi";
import { useClientsCompanies } from "@/context/ClientsCompaniesProvider";
import { set } from "react-hook-form";
import { toast } from "react-hot-toast";

interface TableProps {
  columns: Column[];
  data: any[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  isClient: boolean;
  onPageChange: (page: number) => void;
}

export default function Table({
  columns,
  data,
  currentPage,
  itemsPerPage,
  totalItems,
  isClient,
  onPageChange,
}: TableProps) {
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const { setResearch } = useClientsCompanies();

  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected + 1;
    onPageChange(selectedPage);
  };

  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const handleEditClick = (id: string) => {
    const user = data.find((item) => item.id === id);
    setSelectedUser(user);

  };

  const handleDeleteClick = (id: string) => {
    if (!isClient) {
      fetchDeleteCompany(id as unknown as number).then(
        (response) => {
          if (response) {
            setResearch(true);
            toast.success("Empresa eliminada con éxito");
          } else {
            toast.error("Error al eliminar la empresa");
          }
        },
        (error) => {
          toast.error("Error al eliminar la empresa");
        }
      );
    } else {
      fetchDeleteClient(id as unknown as number).then(
        (response) => {
          if (response) {
            setResearch(true);
            toast.success("Cliente eliminado con éxito");
          } else {
            toast.error("Error al eliminar el cliente");
          }
        },
        (error) => {
          toast.error("Error al eliminar el cliente");
        }
      );
    }
  };

  const closeModal = () => {
    setSelectedUser(null);
  };


  return (
    <div>
      <table
        className="border-collapse w-full border-2 border-solid border-gray-300 rounded-lg "
        {...getTableProps()}
      >
        <thead className=" bg-gray-200">
          {headerGroups.map((headerGroup, index) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={isClient ? "clientsP" + index : "companiesP" + index}
            >
              {headerGroup.headers.map((column) => (
                <th
                  className="py-2 px-4 border-b-2 border-gray-300"
                  {...column.getHeaderProps()}
                  scope="col"
                >
                  {column.render("Header")}
                </th>
              ))}
              <th className="py-2 px-4 border-b-2 border-gray-300" scope="col">
                Acciones
              </th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="hover:bg-gray-300 cursor-pointer"
                key={isClient ? "client" + row.id : "company" + row.id}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="py-2 px-4 border-b border-gray-300 text-center  "
                      {...cell.getCellProps()}
                      key={
                        isClient
                          ? "client" + cell.value
                          : "company" + cell.value
                      }
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
                <td className="py-2 px-4 border-b border-gray-300 text-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
                    onClick={() => handleEditClick(row.original.id)}
                    key={isClient ? "client" + row.id : "company" + row.id}
                  >
                    Modificar
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                    onClick={(e) => handleDeleteClick(row.original.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination mt-4 flex items-center justify-center">
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          forcePage={currentPage - 1}
          containerClassName="pagination-container flex justify-between gap-24 items-center mt-6"
          pageClassName="pagination-page "
          activeClassName="pagination-active"
          previousLabel="Previous "
          nextLabel="Next"
          breakLabel="..."
          previousClassName="pagination-previous bg-blue-500 text-white rounded-lg pagination-button [&>*]:w-28 [&>*]:h-12 [&>*]:p-x-4 [&>*]:p-y-2 text-center hover:bg-blue-600 [&>*]:flex [&>*]:items-center [&>*]:justify-center"
          nextClassName="pagination-previous bg-blue-500 text-white rounded-lg pagination-button [&>*]:w-28 [&>*]:h-12 [&>*]:p-x-4 [&>*]:p-y-2 text-center hover:bg-blue-600 [&>*]:flex [&>*]:items-center [&>*]:justify-center "
          breakClassName="pagination-break-container"
          disabledClassName="pagination-disabled"
        />
      </div>

      {selectedUser && (
        <Modal isOpen={true} onClose={closeModal} user={selectedUser} />
      )}
    </div>
  );
}
