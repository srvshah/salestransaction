using Microsoft.AspNetCore.Mvc;
using SalesTransaction.Application.Service.Product;
using SalesTransaction.Application.WebApi.Areas.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesTransaction.Application.WebApi.Areas.Product
{
    public class ProductController : BaseController
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public IActionResult AllProducts()
        {
            try
            {
                var jsonString = _productService.GetAllProducts();
                return Ok(jsonString);

            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
