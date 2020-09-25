using Microsoft.AspNetCore.Mvc;
using SalesTransaction.Application.Model.Sales;
using SalesTransaction.Application.Service.Sales;
using SalesTransaction.Application.WebApi.Areas.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesTransaction.Application.WebApi.Areas.Sales
{
    public class SalesController : BaseController
    {
        private readonly ISalesService _salesService;

        public SalesController(ISalesService salesService)
        {
            _salesService = salesService;
        }

        [HttpGet]
        public IActionResult GetAllSales()
        {
            try
            {
                var jsonString = _salesService.GetAllSales();
                return Ok(jsonString);
            }
            catch (Exception)
            {

                throw;
            }
        }


        [HttpPost]
        public IActionResult AddSale([FromBody] MvAddSale sale)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var added = _salesService.AddSale(sale);
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
        public IActionResult UpdateSale([FromBody] MvUpdateSale sale)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var updated = _salesService.UpdateSale(sale);
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
