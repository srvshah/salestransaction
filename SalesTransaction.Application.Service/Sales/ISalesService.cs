using SalesTransaction.Application.Model.Sales;
using System;
using System.Collections.Generic;
using System.Text;

namespace SalesTransaction.Application.Service.Sales
{
    public interface ISalesService
    {
        dynamic GetAllSales();
        bool AddSale(MvAddSale sale);
        bool UpdateSale(MvUpdateSale sale);
    }
}
