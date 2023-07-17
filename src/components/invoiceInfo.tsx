import { IInvoiceResponse } from '@/store/types/IInvoices'
import { Dialog } from 'primereact/dialog'
import React from 'react'

interface Props {
    invoice: IInvoiceResponse;
    visible: boolean;
    setShowVisible: (value: boolean) => void;
    onHide: () => void;
}

export default function invoiceInfo(
    {
        invoice,
        visible,
        setShowVisible,
        onHide
    }: Props

) {
    return (
        <Dialog visible={visible} onHide={onHide} >
            <h1 className='text-center font-bold text-3xl'>Información de la factura</h1>
            <div className='flex gap-4 px-32 py-8'>
                <div className='font-bold'>
                    <p>ID:</p>
                    <p>Tipo de ambiente:</p>
                    <p>Tipo de emisión:</p>
                    <p>Clave de acceso:</p>
                    <p>Tipo de comprobante:</p>
                    <p>ID del cliente:</p>
                    <p>Fecha de emisión:</p>
                    <p>Guía de remisión:</p>
                    <p>Total sin impuestos:</p>
                    <p>Total de descuento:</p>
                    <p>Propina:</p>
                    <p>Tipo de pago:</p>
                    <p>Total:</p>
                    <p>Moneda:</p>
                    <p>ID de la caja:</p>
                    <p>Clave de la caja:</p>
                    <p>Nombre de la sucursal:</p>
                </div>
                <div>
                    <p>{invoice.id}</p>
                    <p>{invoice.environmentType}</p>
                    <p>{invoice.emissionType}</p>
                    <p>{invoice.accessKey}</p>
                    <p>{invoice.receiptType}</p>
                    <p>{invoice.customerId}</p>
                    <p>{invoice.emissionDate}</p>
                    <p>{invoice.remissionGuide}</p>
                    <p>{invoice.totalWithoutTax}</p>
                    <p>{invoice.totalDiscount}</p>
                    <p>{invoice.tip}</p>
                    <p>{invoice.paymentType}</p>
                    <p>{invoice.total}</p>
                    <p>{invoice.currency}</p>
                    <p>{invoice.boxId}</p>
                    <p>{invoice.boxKey}</p>
                    <p>{invoice.branchName}</p>
                </div>
            </div>
        </Dialog>

    )
}
