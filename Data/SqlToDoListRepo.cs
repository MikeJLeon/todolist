using System;
using System.Collections.Generic;
using System.Linq;
using Data;
using Microsoft.AspNetCore.Identity;
using todolist;
using todolist.Models;

public class SqlToDoListRepo : IToDoListRepo
{
    private readonly ToDoListContext _context;
    private UserManager<UserModel> UserMgr { get; }


    public SqlToDoListRepo(ToDoListContext context, UserManager<UserModel> userManager)
    {
        _context = context;
        UserMgr = userManager;
    }
    public void CreateTask(TaskModel task)
    {
        Console.WriteLine(task);
        Console.WriteLine(task.Desc);
        Console.WriteLine(task.UserID);
        Console.WriteLine(task.Date);
        _context.Tasks.Add(task);
    }
    public void DeleteTask(Guid taskID)
    {

        var task = _context.Tasks.Where(b => b.Id.Equals(taskID)).Single();
        Console.WriteLine(task);
        _context.Remove(task);
    }
    public List<TaskModel> GetTasks(int UserID)
    {
        Console.WriteLine(DateTime.Now.Date);
        Console.WriteLine(_context.Tasks.ToList());
        var data = _context.Tasks.Where(b => b.UserID.Equals(UserID) && b.Date >= DateTime.Now.Date).ToList();
        foreach (var item in data)
        {
            Console.Write(item.Id + " ");
            Console.WriteLine(item.Desc);
        }

        return (data);
    }
    public void EditTask(TaskModel task1) { }
    public bool SaveChanges()
    {
        return (_context.SaveChanges() >= 0);
    }
}
