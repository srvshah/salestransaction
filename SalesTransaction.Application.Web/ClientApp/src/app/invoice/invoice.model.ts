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
