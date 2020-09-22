using Microsoft.Extensions.Configuration;
using SalesTransaction.Application.DataAccess;
using SalesTransaction.Application.Model.Account;
using System.Data;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace SalesTransaction.Application.Service.Account
{
    public class AccountService : IAccountService
    {
        private readonly string _connStr;
        private DataAccessHelper _dah;

        public AccountService(IConfiguration configuration)
        {
            _connStr = configuration.GetConnectionString("DefaultConnection");
            if(!string.IsNullOrEmpty(_connStr))
            {
                _dah = new DataAccessHelper(_connStr);
            }
        }

        public dynamic GetAllUserDetail()
        {
            using (var conn = _dah.GetConnection())
            {
                using (var cmd = new SqlCommand("SpAllPersonDetailSel", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    using (var reader = cmd.ExecuteReader())
                    {
                        try
                        {
                            if (reader.HasRows)
                            {
                                return _dah.GetJson(reader);
                            }
                            return null;
                        }
                        catch (Exception ex)
                        {

                            throw ex;
                        }
                    }
                }
            }
        }

        public dynamic GetLogin(MvLogin login)
        {
            using (var conn = _dah.GetConnection())
            {
                using (var cmd = new SqlCommand("SpPersonSel", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@Username", login.Username));
                    cmd.Parameters.Add(new SqlParameter("@Password", login.Password));

                    using (var reader = cmd.ExecuteReader())
                    {
                        try
                        {
                            if (reader.HasRows)
                            {
                                return _dah.GetJson(reader);
                            }
                            return null;
                        }
                        catch (Exception ex)
                        {

                            throw ex;
                        }
                    }
                }
            }
           
        }

        public dynamic GetUserDetail(string json)
        {
            var jsonNew = JsonConvert.DeserializeObject(json);
            using (var conn = _dah.GetConnection())
            {
                using (var cmd = new SqlCommand("SpPersonDetailSel", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@Json", jsonNew.ToString()));
                  

                    using (var reader = cmd.ExecuteReader())
                    {
                        try
                        {
                            if (reader.HasRows)
                            {
                                return _dah.GetJson(reader);
                            }
                            return null;
                        }
                        catch (Exception ex)
                        {

                            throw ex;
                        }
                    }
                }
            }
        }
    }
}
