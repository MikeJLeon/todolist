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
        try
        {
            var data = _context.Tasks.Where(b => b.UserID.Equals(UserID)).ToList().OrderBy(b => b.Completed).ThenBy(b => b.ModifiedDate);
            var newData = new List<TaskModel>();
            foreach (var item in data)
            {
                if (DateTime.Parse(item.Date) >= DateTime.Now.Date)
                {
                    newData.Add(item);
                }
            }

            return (newData);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            Console.WriteLine("No tasks");
            var data = new List<TaskModel>();
            return (data);
        }
    }
    public void UpdateTask(int User, Guid TaskGuid, String TaskDesc)
    {
        TaskModel updatedTask = _context.Tasks.Where(b => (b.Id.Equals(TaskGuid) && b.UserID.Equals(User))).FirstOrDefault();
        if (updatedTask != null)
        {
            updatedTask.Desc = TaskDesc;
            updatedTask.ModifiedDate = DateTime.UtcNow;
        }
    }
    public void CompleteTask(int User, Guid TaskGuid, Boolean Completed)
    {

        TaskModel updatedTask = _context.Tasks.Where(b => (b.Id.Equals(TaskGuid) && b.UserID.Equals(User))).FirstOrDefault();
        if (updatedTask != null)
        {
            updatedTask.Completed = Completed;
            updatedTask.ModifiedDate = DateTime.UtcNow;
        }
    }
    public bool SaveChanges()
    {
        return (_context.SaveChanges() >= 0);
    }
}
