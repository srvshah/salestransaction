using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SalesTransaction.Application.Model.Product
{
    public class MvAddProduct
    {

        [Required]
        public string name { get; set; }

        [Required]
        public string description { get; set; }

        [Required]
        public decimal rate { get; set; }

        [Required]
        public DateTime startDate { get; set; }

        [Required]
        public DateTime endDate { get; set; }

        [Required]
        public int stock { get; set; }
    }

    public class MvUpdateProduct
    {
        [Required]
        public int productId { get; set; }

      
        public string name { get; set; }

      
        public string description { get; set; }

       
        public int? stock { get; set; }
    }
}
