using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace todolist.Models
{
    public class TaskModel
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public int UserID { get; set; }
        [Required]
        public string Desc { get; set; }
        [Required]
        public string Date { get; set; }
        public Boolean Completed { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public TaskModel()
        {
            this.Completed = false;
            this.CreationDate = DateTime.UtcNow;
            this.ModifiedDate = DateTime.UtcNow;
        }

    }
}
