using System;
using System.Collections.Generic;
using todolist;
using todolist.Models;

public interface IToDoListRepo
{
    bool SaveChanges();

    void CreateTask(TaskModel task);
    void DeleteTask(Guid taskID);
    List<TaskModel> GetTasks(int UserID);
    void EditTask(TaskModel task);
    void CompleteTask(TaskModel task);
}