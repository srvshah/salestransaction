using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SalesTransaction.Application.Model.Customer
{
    public class MvAddCustomer
    {
        [Required]
        public string firstName { get; set; }
        
        public string middleName { get; set; }
        
        [Required]
        public string lastName { get; set; }
    }

    public class MvUpdateCustomer
    {
        [Required]
        public int customerId { get; set; }

        public string firstName { get; set; }

        public string middleName { get; set; }

        public string lastName { get; set; }
    }
}
