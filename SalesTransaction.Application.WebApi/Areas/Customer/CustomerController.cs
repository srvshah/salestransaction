using Microsoft.AspNetCore.Mvc;
using SalesTransaction.Application.Model.Customer;
using SalesTransaction.Application.Service.Customer;
using SalesTransaction.Application.WebApi.Areas.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesTransaction.Application.WebApi.Areas.Customer
{
    public class CustomerController : BaseController
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public IActionResult GetAllCustomers()
        {
            try
            {
                var jsonString = _customerService.GetAllCustomers();
                return Ok(jsonString);

            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpPost]
        public IActionResult AddCustomer([FromBody] MvAddCustomer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var added = _customerService.AddCustomer(customer);
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
        public IActionResult UpdateCustomer([FromBody] MvUpdateCustomer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var updated = _customerService.UpdateCustomer(customer);
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
