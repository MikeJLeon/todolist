using Data;
using todolist;

public class SqlToDoListRepo : IToDoListRepo
{
    private readonly ToDoListContext _context;

    public SqlToDoListRepo(ToDoListContext context)
    {
        _context = context;
    }
    public void CreateAccount(AccountModel account)
    {
        _context.Accounts.Add(account);
    }
    public bool SaveChanges(){
        return (_context.SaveChanges() >= 0);
    }
}
