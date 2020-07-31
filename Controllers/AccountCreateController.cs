using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace todolist.Controllers
{
    [ApiController]
    [Route("/account/create")]
    public class AccountCreateController : ControllerBase
    {
        private readonly IToDoListRepo _repository;
        public AccountCreateController(IToDoListRepo repository)
        {
            _repository = repository;
        }
        [HttpPost]
        public ActionResult <AccountModel> CreateAccount(string user_name, string email, string first_name, string last_name, string password){
            var newAccount = new AccountModel{UserName=user_name, Email=email, FirstName=first_name, LastName=last_name};
            Console.WriteLine($"{newAccount.UserName}, {newAccount.FirstName}, {newAccount.LastName}");
            _repository.CreateAccount(newAccount);
            _repository.SaveChanges();
            return Ok(newAccount);
        }
    }
}
