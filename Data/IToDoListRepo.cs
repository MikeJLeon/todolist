using System.Collections.Generic;
using todolist;
using todolist.Models;

public interface IToDoListRepo
{
    bool SaveChanges();

    void CreateTask(TaskModel task);
    void DeleteTask(int taskID);
    List<TaskModel> GetTasks(int UserID);
    void EditTask(TaskModel task1);
}