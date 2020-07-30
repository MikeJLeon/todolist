using todolist;

public interface IToDoListRepo
{
    bool SaveChanges();

    void CreateAccount(AccountModel account);
}