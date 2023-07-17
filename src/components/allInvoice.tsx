"use client"
import { handleGetAllInvoices } from '@/store/api/invoiceApi'
import React, { useEffect, useRef, useState } from 'react'
import { DataTable, DataTableRowClickEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { set } from 'date-fns';
import { IInvoiceResponse } from '@/store/types/IInvoices';
import InvoiceInfo from '@/components/invoiceInfo';

export default function allInvoice() {
    const toast = useRef<Toast>(null);
    const [invoices, setInvoices] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showVisible, setShowVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState<IInvoiceResponse>();

    const columns = [
        { field: "id", header: "ID" },
        { field: "emissionType", header: "Tipo de emisión" },
        { field: "emissionDate", header: "Fecha de emisión" },
        { field: "totalWithoutTax", header: "Total sin impuestos" },
        { field: "totalDiscount", header: "Descuento total" },
        { field: "total", header: "Total" },
        { field: "paymentType", header: "Tipo de pago" },
    ];

    useEffect(() => {
        handleGetAllInvoices().then((res) => {
            if (res) {
                setInvoices(res);
            }
        }
        )
    }, [])

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = invoices.filter((product) =>
        Object.values(product).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleRowClick = (event: DataTableRowClickEvent) => {
        const rowData = event.data as IInvoiceResponse;
        setSelectedRowData(rowData);
        setShowVisible(true);
    };

    return (
        <div className='flex flex-col gap-8'>
            <Toast ref={toast} />
            <h1 className="text-neutral-100 text-3xl text-center font-bold">
                <span>
                    <i className="pi pi-search" style={{ fontSize: "1.5rem" }}></i>
                </span>{" "}
                Listado de facturas
            </h1>

            <div className="flex gap-4 justify-between">
                <div className="p-input-icon-left">
                    <i className="pi pi-search"></i>
                    <InputText
                        placeholder="Buscar"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-96"
                    />
                </div>
            </div>
            <DataTable
                value={filteredProducts}
                tableStyle={{ minWidth: "50rem" }}
                className="centered-table"
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                rowHover
                onRowClick={handleRowClick}
            >
                {columns.map((col, i) => {
                    return (
                        <Column
                            alignHeader={"center"}
                            key={col.field}
                            field={col.field}
                            header={col.header}
                            body={(rowData) => rowData[col.field] || "-"}
                            style={{ textAlign: "center" }}
                            bodyStyle={{ cursor: 'pointer' }}

                        />
                    );
                }
                )}

            </DataTable>

            {
                selectedRowData && (
                    <InvoiceInfo
                        invoice={selectedRowData}
                        visible={showVisible}
                        setShowVisible={setShowVisible}
                        onHide={() => {
                            setShowVisible(false)
                        }}
                    />
                )
            }

        </div>
    )
}
