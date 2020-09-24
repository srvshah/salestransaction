using SalesTransaction.Application.Model.Product;
using System;
using System.Collections.Generic;
using System.Text;

namespace SalesTransaction.Application.Service.Product
{
    public interface IProductService
    {
        dynamic GetAllProducts();
        bool AddProduct(MvAddProduct product);
        bool UpdateProduct(MvUpdateProduct product);
    }
}
