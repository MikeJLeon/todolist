using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using todolist;

namespace Data
{
    public class ToDoListContext : IdentityDbContext
    {
        public ToDoListContext(DbContextOptions<ToDoListContext> options)
            : base(options)
        {
        }

        public DbSet<AccountModel> Accounts { get; set; }
    }
}