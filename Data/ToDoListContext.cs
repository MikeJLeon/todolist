using Microsoft.EntityFrameworkCore;
using todolist;

namespace Data
{
    public class ToDoListContext : DbContext
    {
        public ToDoListContext (DbContextOptions<ToDoListContext> options)
            : base(options)
        {
        }

        public DbSet<AccountModel> Accounts { get; set; }
    }
}