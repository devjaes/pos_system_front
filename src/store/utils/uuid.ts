import { IInvoicePDF, IInvoiceResponse } from "../types/IInvoices";

// generate a uuid
export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export function round(num: number) {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}

export function invoiceResToPDF (invoice: IInvoiceResponse):IInvoicePDF|null{
  if(invoice){
    const invoicePDF:IInvoicePDF = {
      logo: "https://pos-products.s3.amazonaws.com/products/LogoAzul.png",
      from: invoice.branchName,
      to: invoice.customerId.toString(),
      currency: invoice.currency,
      number: invoice.accessKey,
      paymentTerms: invoice.paymentType,
      items: invoice.sellingProducts?.map((sellingProduct) => {
        return {
          quantity: sellingProduct.quantity,
          name: sellingProduct.product.name,
          description: sellingProduct.product.description,
          unitPrice: sellingProduct.product.unitPrice,
        };
      }
      ) || [],
      fields: {
        tax: `%`,
        total: invoice.total.toString(),
        subTotal: invoice.totalWithoutTax.toString(),
        discount: invoice.totalDiscount.toString(),
        tip: invoice.tip.toString(),
      },
      tax: invoice.sellingProducts ? invoice. sellingProducts[0].iva : 0 ,
      notes: "Gracias por preferirnos, te quiero mucho",
      terms: "No hay devoluciones",
  }
  return invoicePDF;
}

return null;
}