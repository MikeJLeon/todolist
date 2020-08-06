using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using todolist;
using todolist.Models;

namespace Data
{
    public class ToDoListContext : IdentityDbContext<UserModel, RoleModel, int>
    {
        public ToDoListContext(DbContextOptions<ToDoListContext> options)
            : base(options)
        {
        }

        public DbSet<UserModel> Accounts { get; set; }

        public DbSet<TaskModel> Tasks { get; set; }
    }
}