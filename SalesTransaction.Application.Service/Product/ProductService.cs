using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using SalesTransaction.Application.DataAccess;
using SalesTransaction.Application.Model.Product;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace SalesTransaction.Application.Service.Product
{
    public class ProductService : IProductService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connStr;
        private readonly string _commandTimeout;
        private DataAccessHelper _dah;

        public ProductService(IConfiguration configuration)
        {
            _configuration = configuration.GetSection("ConnectionStrings");
            _connStr = _configuration["DefaultConnection"];
            if (!string.IsNullOrEmpty(_connStr))
            {
                _dah = new DataAccessHelper(_connStr);
            }

            _commandTimeout = _configuration["CommandTimeOut"];
        }



        public dynamic GetAllProducts()
        {
            using (var conn = _dah.GetConnection())
            {
                using (var cmd = new SqlCommand("SpAllProductSel", conn))
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

        public bool AddProduct(MvAddProduct product)
        {
            var jsonNew = JsonConvert.SerializeObject(product);
            using (var conn = _dah.GetConnection())
            {
                using (var cmd = new SqlCommand("SpProductProductRateTsk", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Json",SqlDbType.NChar).Value = jsonNew;
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

        public bool UpdateProduct(MvUpdateProduct product)
        {
            var jsonNew = JsonConvert.SerializeObject(product);
            using (var conn = _dah.GetConnection())
            {
                using (var cmd = new SqlCommand("SpProductUpd", conn))
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
