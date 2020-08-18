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
    [Route("/account/")]
    public class UserController : ControllerBase
    {
        private readonly IToDoListRepo _repository;

        private UserManager<UserModel> UserMgr { get; }
        private SignInManager<UserModel> SignInMgr { get; }

        public UserController(UserManager<UserModel> userManager, SignInManager<UserModel> signInManager)
        {
            UserMgr = userManager;
            SignInMgr = signInManager;
        }
        [HttpPost]
        [Route("/account/create/")]
        public async Task<IActionResult> Register(string user_name, string email, string first_name, string last_name, string password)
        {
            try
            {
                UserModel user = await UserMgr.FindByNameAsync(user_name);
                if (user == null)
                {
                    user = new UserModel();
                    user.UserName = user_name;
                    user.Email = email;
                    user.FirstName = first_name;
                    user.LastName = last_name;
                    IdentityResult result = await UserMgr.CreateAsync(user, password);
                    Console.WriteLine(user.UserName + user.Email + user.FirstName + user.LastName);
                    Console.WriteLine(result);
                    return Ok("Account Created!");
                }
                return Ok("Account exists...");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet]
        [Route("/account/authorized")]
        public async Task<IActionResult> checkAuthorization(string user_name)
        {
            if (User?.Identity.IsAuthenticated == true)
            {
                var username = User?.Identity.Name;
                var userInfo = await UserMgr.FindByNameAsync(username);
                
                return Ok(userInfo);
            }
            return Ok(false);
        }
        [HttpPost]
        [Route("/account/login/")]
        public async Task<IActionResult> Login(string user_name, string password)
        {
            var result = await SignInMgr.PasswordSignInAsync(user_name, password, true, false);

            if (result.Succeeded)
            {
                var userToVerify = await UserMgr.FindByNameAsync(user_name);
                var identity = await UserMgr.GetClaimsAsync(userToVerify);
                Console.WriteLine(userToVerify.UserName);
                Console.WriteLine(userToVerify.Id);
                Console.WriteLine(identity);
                return Ok(true);
            }

            return Unauthorized();
        }
        [Authorize]
        [HttpGet]
        [Route("/account/logout")]
        public async Task<IActionResult> Logout(){
            await SignInMgr.SignOutAsync();
            Console.WriteLine("logged out");
            return Ok();
        }
        // public UserController(IToDoListRepo repository)
        // {
        //     _repository = repository;
        // }
        // [HttpPost]
        // public ActionResult <UserModel> CreateAccount(string user_name, string email, string first_name, string last_name){
        //     var newAccount = new UserModel{UserName=user_name, Email=email, FirstName=first_name, LastName=last_name};
        //     Console.WriteLine($"{newAccount.UserName}, {newAccount.FirstName}, {newAccount.LastName}");
        //     _repository.CreateAccount(newAccount);
        //     _repository.SaveChanges();
        //     return Ok(newAccount);
        // }
    }
}
