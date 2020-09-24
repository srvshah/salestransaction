﻿using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using SalesTransaction.Application.DataAccess;
using SalesTransaction.Application.Model.Customer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace SalesTransaction.Application.Service.Customer
{
    public class CustomerService : ICustomerService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connStr;
        private readonly string _commandTimeout;
        private DataAccessHelper _dah;

        public CustomerService(IConfiguration configuration)
        {
            _configuration = configuration.GetSection("ConnectionStrings");
            _connStr = _configuration["DefaultConnection"];
            if (!string.IsNullOrEmpty(_connStr))
            {
                _dah = new DataAccessHelper(_connStr);
            }

            _commandTimeout = _configuration["CommandTimeOut"];
        }

        public dynamic GetAllCustomers()
        {
            using (var conn = _dah.GetConnection())
            {
                using (var cmd = new SqlCommand("SpAllCustomerSel", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandTimeout = int.Parse(_commandTimeout);
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

        public bool AddCustomer(MvAddCustomer customer)
        {
          

            var jsonNew = JsonConvert.SerializeObject(customer);
            using (var conn = _dah.GetConnection())
            {
                using (var cmd = new SqlCommand("SpCustomerIns", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Json", SqlDbType.NChar).Value = jsonNew;
                    cmd.CommandTimeout = int.Parse(_commandTimeout);
                    int rows = cmd.ExecuteNonQuery();
                    if (rows > 0)
                    {
                        return true;
                    }
                    return false;

                }

            }
        }

        public bool UpdateCustomer(MvUpdateCustomer customer)
        {
            var jsonNew = JsonConvert.SerializeObject(customer);
            using (var conn = _dah.GetConnection())
            {
                using (var cmd = new SqlCommand("SpCustomerUpd", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Json", SqlDbType.NChar).Value = jsonNew;
                    cmd.CommandTimeout = int.Parse(_commandTimeout);
                    int rows = cmd.ExecuteNonQuery();
                    if (rows > 0)
                    {
                        return true;
                    }
                    return false;

                }

            }
        }
    }
}
