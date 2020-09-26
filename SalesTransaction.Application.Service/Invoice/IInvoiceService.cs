using SalesTransaction.Application.Model.Invoice;
using System;
using System.Collections.Generic;
using System.Text;

namespace SalesTransaction.Application.Service.Invoice
{
    public interface IInvoiceService
    {
        dynamic GetAllInvoice();
        bool GenerateInvoice(IEnumerable<MvGenerateInvoice> sales);
        dynamic GetInvoiceDetail(MvInvoice invoice);
    }
}
