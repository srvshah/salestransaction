export interface MvInvoice{
    invoiceId: number;
    total: number;
    subtotal: number;
    discount: number;
    customerName: string;
    customerId: number;
    invoiceNumber: string;
    transactionCount: number;
}

export interface MvInvoiceDetail{
    salesTransactionId: number;
    total: number;
    rate: number;
    productName: string;
    quantity: number;
}
