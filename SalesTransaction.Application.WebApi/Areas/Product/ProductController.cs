using Microsoft.AspNetCore.Mvc;
using SalesTransaction.Application.Model.Product;
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

        [HttpPost]
        public IActionResult AddProduct([FromBody] MvAddProduct product)
        {
            try
            {
                var added = _productService.AddProduct(product);
                if (!added)
                {
                    return BadRequest();
                }
                return Ok();


            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPut]
        public IActionResult UpdateProduct([FromBody] MvUpdateProduct product)
        {
            try
            {
                var updated = _productService.UpdateProduct(product);
                if (!updated)
                {
                    return BadRequest();
                }
                return Ok();
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
