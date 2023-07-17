"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  handleCreateProduct,
  handleDeleteProduct,
  handleGetAllProducts,
} from "@/store/api/productApi";
import { IProductCreate, IProductResponse } from "@/store/types/IProducts";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { IInputsForm } from "@/store/types/IForms";
import { KeyFilterType } from "primereact/keyfilter";
import { ICE, IRBPNR, IVAS } from "@/store/types/Tables";
import ModifyDialog from "@/components/modifyDialog";
import { useForm } from "react-hook-form";
import { Avatar } from "primereact/avatar";
import { Dropdown } from "primereact/dropdown";
import { ICustomerResponse } from "@/store/types/ICustomer";
import { handleGetAllCustomers } from "@/store/api/customerApi";

const invoicer = () => {
  const [product, setProduct] = useState<IProductResponse>();
  const [products, setProducts] = useState<IProductResponse[]>([]);
  const [productTable, setProductTable] = useState<IProductResponse[]>([]);
  const [customers, setCustomers] = useState<ICustomerResponse[]>([]);
  const [customer, setCustomer] = useState<ICustomerResponse>();
  const [addCustomer, setAddCustomer] = useState<boolean>(false);
  const [customersDropdown, setCustomersDropdown] = useState<{}[]>([]);
  const [productsDropdown, setProductsDropdown] = useState<{}[]>([]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    handleGetAllProducts().then((response) => {
      if (response) {
        setProducts(response);
        setProductTable(response);
        const productsDropdown = response.map((product) => {
          return {
            label: product.name,
            value: product,
          };
        });
        setProductsDropdown(productsDropdown);
      }
    });

    handleGetAllCustomers().then((response) => {
      if (response) {
        setCustomers(response);
        const customersDropdown = response.map((customer) => {
          return {
            label:
              customer.name +
              " " +
              customer.lastName +
              " " +
              customer.identification,
            value: customer,
          };
        });
        setCustomersDropdown(customersDropdown);
      }
    });
  }, []);

  const columns = [
    { field: "delete", header: "Eliminar", align: "center", width: "10%" },
    { field: "name", header: "Producto", width: "20%" },
    { field: "description", header: "Descripción", width: "40%" },
    { field: "stock", header: "Stock", align: "center", width: "10%" },
    { field: "quantity", header: "Cantidad", align: "center", width: "10%" },
    {
      field: "unitPrice",
      header: "P. Unitario",
      align: "center",
      width: "10%",
    },
    { field: "total", header: "Total", align: "center", width: "10%" },
  ];

  return (
    <div className="flex flex-col w-11/12 ">
      <h1 className="w-full border border-opacity-5 bg-gray-800 text-lg">
        <Avatar icon="pi pi-plus" className="bg-gray-700 m-2" />
        <strong>Nuevo registro de una factura</strong>
      </h1>
      <form className="border p-4 border-opacity-5 bg-gray-700 ">
        <div className="flex flex-row pb-4">
          <div className="flex flex-col w-6/12 pr-4">
            <label htmlFor="client">
              <strong>Cliente</strong>
            </label>
            <div className="flex flex-row">
              <Dropdown
                value={customer}
                onChange={(e) => setCustomer(e.value)}
                options={customersDropdown}
                placeholder="Seleccione un cliente"
                filter
                className="w-full md:w-14rem"
              />
              <Button
                className="p-button-success h-10 w-1/12"
                icon="pi pi-plus"
                onClick={() => setAddCustomer(true)}
              />
            </div>
            {addCustomer && (
              <Dialog
                header="Agregar Cliente"
                visible={addCustomer}
                style={{ width: "50vw" }}
                onHide={() => setAddCustomer(false)}
              />
            )}
          </div>
          <div className="flex flex-col pr-4 w-1/5">
            <label htmlFor="paymentType">
              <strong>Método de pago</strong>
            </label>
            <Dropdown
              options={["Efectivo", "Tarjeta", "Transferencia"]}
              placeholder="Método de pago"
            />
          </div>
          <div className="flex flex-col pr-4">
            <label htmlFor="cash">
              <strong>Efectivo Recibido</strong>
            </label>
            <InputText
              type="number"
              keyfilter={"num"}
              placeholder="Efectivo Recibido"
              maxLength={100}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="cash">
              <strong>Cambio</strong>
            </label>
            <InputText
              keyfilter={"num"}
              placeholder="0.00"
              maxLength={100}
              disabled
            />
          </div>
        </div>
        <div className="flex flex-col py-8 px-4 border border-opacity-5 rounded-sm">
          <div className="flex flex-col w-full px-3     ">
            <label htmlFor="client" className="pb-2">
              <strong>Agregar Producto:</strong>
            </label>
            <Dropdown
              value={product}
              onChange={(e) => setProduct(e.value)}
              options={productsDropdown}
              placeholder="Seleccione un producto"
              filter
              className="w-full md:w-14rem"
            />
          </div>
          <div className="flex flex-col w-full py-6 px-3">
            <DataTable
              value={productTable}
              className="p-datatable-sm"
              scrollable
              scrollHeight="1000px"
              showGridlines
              stripedRows
              selectionMode="checkbox"
              height={1000}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
              rowClassName={(...rowData) => {
                return "bg-gray-800";
              }}
            >
              {columns.map((column) => {
                if (column.field === "delete") {
                  return (
                    <Column
                      className="w-1.5"
                      align={"center"}
                      alignHeader={"center"}
                      key={column.field}
                      field={column.field}
                      header={column.header}
                      body={(rowData) => {
                        return (
                          <Button
                            className="p-button-danger"
                            icon="pi pi-trash"
                            onClick={() => handleDeleteProduct(rowData)}
                          />
                        );
                      }}
                    />
                  );
                } else if (column.field === "quantity") {
                  return (
                    <Column
                      alignHeader={"center"}
                      align={"center"}
                      key={column.field}
                      field={column.field}
                      header={column.header}
                      bodyStyle={{ width: column.width }}
                      body={(rowData) => {
                        return (
                          <InputText
                            className="w-3/4"
                            keyfilter={"num"}
                            placeholder="0"
                            maxLength={100}
                          />
                        );
                      }}
                    />
                  );
                } else {
                  return (
                    <Column
                      align={column.align as any}
                      key={column.field}
                      field={column.field}
                      header={column.header}
                      bodyStyle={{ width: column.width }}
                    />
                  );
                }
              })}
            </DataTable>
            <div className="flex flex-row justify-end pt-4">
              <div className="justify-between pt-4">
                <div className="flex flex-row justify-between">
                  <p className="text-lg font-bold">SUBTOTAL: </p>
                  <label className="text-lg font-bold pl-4">0.00</label>
                </div>
                <div className="flex flex-row justify-between">
                  <p className="text-lg font-bold">DESCUENTO: </p>
                  <label className="text-lg font-bold pl-4">0.00</label>
                </div>
                <div className="flex flex-row justify-between">
                  <p className="text-lg font-bold">IVA: </p>
                  <label className="text-lg font-bold pl-4">0.00</label>
                </div>
                <div className="flex flex-row justify-between">
                  <p className="text-lg font-bold">VALOR DEL IVA: </p>
                  <label className="text-lg font-bold pl-4">0.00</label>
                </div>
                <div className="flex flex-row justify-between">
                  <p className="text-lg font-bold">TOTAL: </p>
                  <label className="text-lg font-bold pl-4">0.00</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default invoicer;
