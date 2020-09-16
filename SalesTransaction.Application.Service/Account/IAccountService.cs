using SalesTransaction.Application.Model.Account;
using System;
using System.Collections.Generic;
using System.Text;

namespace SalesTransaction.Application.Service.Account
{
    public interface IAccountService
    {
        dynamic GetLogin(MvLogin login);
        dynamic GetUserDetail(string json);
    }
}
