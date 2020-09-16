using Microsoft.AspNetCore.Mvc;
using SalesTransaction.Application.Model.Account;
using SalesTransaction.Application.Service.Account;
using SalesTransaction.Application.WebApi.Areas.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesTransaction.Application.WebApi.Areas.Account
{
    public class AccountController : BaseController
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }


        [HttpPost]
        public IActionResult Login([FromBody] MvLogin login)
        {
            try
            {
                var jsonString = _accountService.GetLogin(login);
                return Ok(jsonString);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet]
        public IActionResult UserDetail(string json)
        {
            try
            {
                var jsonString = _accountService.GetUserDetail(json);
                return Ok(jsonString);
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
