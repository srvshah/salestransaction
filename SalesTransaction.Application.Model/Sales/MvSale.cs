using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SalesTransaction.Application.Model.Sales
{
    public class MvAddSale
    {
        [Required]
        public int customerId { get; set; }

        [Required]
        public int productId { get; set; }

        [Required]
        public int quantity { get; set; }
    }

    public class MvUpdateSale
    {
        [Required]
        public int salesTransactionId { get; set; }

        public int customerId { get; set; }

        public int productId { get; set; }

        public int quantity { get; set; }

    }
}
