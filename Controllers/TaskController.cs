using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using todolist.Models;

namespace todolist.Controllers
{
    [ApiController]
    [Route("/account/tasks/")]
    public class TaskController : ControllerBase
    {
        private IToDoListRepo _repository;

        private UserManager<UserModel> UserMgr { get; }

        public TaskController(UserManager<UserModel> userManager, IToDoListRepo repository)
        {
            UserMgr = userManager;
            _repository = repository;
        }
        [Authorize]
        [HttpPost]
        [Route("/account/tasks/create")]
        public async Task<IActionResult> Create(string desc, string date)
        {
            Console.WriteLine(desc);
            Console.WriteLine(date);
            Console.WriteLine("^^^^^^");
            Console.WriteLine(DateTime.Parse(date));
            var username = User?.Identity.Name;
            var userInfo = await UserMgr.FindByNameAsync(username);
            var newTask = new TaskModel();
            newTask.Id = Guid.NewGuid();
            newTask.UserID = userInfo.Id;
            newTask.Desc = desc;
            newTask.Date = date;
            _repository.CreateTask(newTask);
            _repository.SaveChanges();
            return Ok("Created new task!");
        }
        [Authorize]
        [HttpGet]
        [Route("/account/tasks/get")]
        public async Task<IActionResult> GetTasks()
        {
            var username = User?.Identity.Name;
            var userInfo = await UserMgr.FindByNameAsync(username);
            var data = _repository.GetTasks(userInfo.Id);
            Console.WriteLine(data);
            return Ok(data);
        }
        [Authorize]
        [HttpDelete]
        [Route("/account/tasks/delete/{id}")]
        public async Task<IActionResult> DeleteTasks(Guid id)
        {
            Console.Write("Line 56- ");
            Console.WriteLine(id);
            _repository.DeleteTask(id);
            _repository.SaveChanges();
            return Ok();
        }

        [Authorize]
        [HttpPost]
        [Route("/account/tasks/update/description/{id}")]
        public async Task<IActionResult> UpdateTask(String TaskID, String TaskDesc)
        {
            var username = User?.Identity.Name;
            var userInfo = await UserMgr.FindByNameAsync(username);
            var taskGuid = Guid.Parse(TaskID);
            Console.WriteLine(userInfo.Id);
            Console.WriteLine(taskGuid);
            Console.WriteLine(TaskDesc);
            Console.WriteLine("hmmmm");
            _repository.UpdateTask(userInfo.Id, taskGuid, TaskDesc);
            _repository.SaveChanges();
            return Ok("Updated completion");
        }

        [Authorize]
        [HttpPost]
        [Route("/account/tasks/update/completed/{id}")]
        public async Task<IActionResult> CompleteTask(String TaskID, Boolean Completed)
        {
            var username = User?.Identity.Name;
            var userInfo = await UserMgr.FindByNameAsync(username);
            var taskGuid = Guid.Parse(TaskID);
            Console.WriteLine(userInfo.Id);
            Console.WriteLine(taskGuid);
            Console.WriteLine("hmmmm");
            _repository.CompleteTask(userInfo.Id, taskGuid, Completed);
            _repository.SaveChanges();
            return Ok("Updated completion");
        }
    }

}
