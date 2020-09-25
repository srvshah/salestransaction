using Microsoft.AspNetCore.Mvc;
using SalesTransaction.Application.Service.Invoice;
using SalesTransaction.Application.WebApi.Areas.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesTransaction.Application.WebApi.Areas.Invoice
{
    public class InvoiceController : BaseController
    {
        private readonly IInvoiceService _invoiceService;

        public InvoiceController(IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
        }

        [HttpGet]
        public IActionResult GetAllInvoice()
        {
            try
            {
                var jsonString = _invoiceService.GetAllInvoice();
                return Ok(jsonString);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
