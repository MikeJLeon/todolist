using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace todolist.Models
{
    public class TaskModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int UserID { get; set; }
        [Required]
        public string Desc { get; set; }
    }
}
