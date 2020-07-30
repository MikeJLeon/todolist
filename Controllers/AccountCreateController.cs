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
        public ActionResult <AccountModel> CreateAccount(string user_name, string first_name, string last_name, string password){
            var newAccount = new AccountModel{first_name=first_name,  last_name=last_name, user_name=user_name, password=password};
            Console.WriteLine("HELLO?" + user_name, first_name, last_name, password);
            //_repository.CreateAccount(newAccount);
            //_repository.SaveChanges();
            //Console.WriteLine(newAccount.first_name);
            return Ok(newAccount);
        }
    }
}
