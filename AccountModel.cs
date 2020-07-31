using System;
using System.ComponentModel.DataAnnotations;

namespace todolist
{
    public class AccountModel
    {
        [Key]
        public string UserName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
    }
}
