using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SalesTransaction.Application.Model.Invoice
{
    public class MvGenerateInvoice
    {
        [Required]
        public int salesTransactionId { get; set; }
    }

    public class MvInvoice
    {
        [Required]
        public int invoiceId { get; set; }
    }
}
