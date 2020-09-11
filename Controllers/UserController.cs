using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MailKit;
using MimeKit;
using todolist.Models;
using MailKit.Net.Smtp;
using System.Web;

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
                UserModel user = await UserMgr.FindByEmailAsync(email);
                if (user == null)
                {
                    user = new UserModel();
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
        public async Task<IActionResult> checkAuthorization()
        {
            if (User?.Identity.IsAuthenticated == true)
            {
                var username = User?.Identity.Name;
                Console.WriteLine(username);
                var userInfo = await UserMgr.FindByNameAsync(username);

                return Ok(userInfo);
            }
            return Ok(false);
        }
        [HttpPost]
        [Route("/account/login/")]
        public async Task<IActionResult> Login(string user_email, string password)
        {
            Console.WriteLine(user_email);
            var userToVerify = await UserMgr.FindByEmailAsync(user_email);
            var result = await SignInMgr.PasswordSignInAsync(userToVerify.UserName, password, true, false);
            Console.WriteLine(result.Succeeded);
            if (result.Succeeded)
            {
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
        public async Task<IActionResult> Logout()
        {
            await SignInMgr.SignOutAsync();
            Console.WriteLine("logged out");
            return Ok();
        }
        [HttpPost]
        [Route("/account/update")]
        public async Task<IActionResult> Update(string email, string firstName, string lastName, string newPassword)
        {
            Console.WriteLine(email);
            Console.WriteLine(firstName);
            Console.WriteLine(lastName);
            Console.WriteLine(newPassword);
            if (newPassword == null)
            {
                var user = await UserMgr.FindByEmailAsync(email);
                user.FirstName = firstName;
                user.LastName = lastName;
                IdentityResult result = await UserMgr.UpdateAsync(user);
                return Ok("Account Updated");
            }
            return Ok("Account not updated.");

        }


        [HttpPost]
        [Route("/account/recover")]
        public async Task<IActionResult> Recover(string email, string token, string password)
        {
            var user = await UserMgr.FindByEmailAsync(email);
            token = HttpUtility.UrlDecode(token);
            token = token.Replace(" ", "+");
            var result = await UserMgr.ResetPasswordAsync(user, token, password);
            Console.WriteLine(result);
            Console.WriteLine(email);
            Console.WriteLine(token);
            Console.WriteLine(password);
            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest();
        }
        [HttpPost]
        [Route("/account/forgot")]
        public async Task<IActionResult> Forgot(string email)
        {
            Console.WriteLine(email);
            var user = await UserMgr.FindByEmailAsync(email);
            var todoEmail = Environment.GetEnvironmentVariable("TODOLIST_EMAIL");
            var password = Environment.GetEnvironmentVariable("TODOLIST_EMAIL_PASSWORD");
            if (user != null)
            {
                var token = await UserMgr.GeneratePasswordResetTokenAsync(user);
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("Password Recovery - Mike's Todolist", todoEmail));
                message.To.Add(MailboxAddress.Parse(email));
                message.Subject = "Password Recovery - Mike's Todolist";
                message.Body = new TextPart("plain")
                {
                    Text = "https://localhost:5001/Recover/" + email + "/" + HttpUtility.UrlEncode(token)
                };

                using (var client = new SmtpClient())
                {
                    client.Connect("smtp.gmail.com", 587, false);
                    client.Authenticate(todoEmail, password);
                    client.Send(message);
                    client.Disconnect(true);
                }
                return Ok(true);
            }
            return BadRequest("Wrong email");
        }
    }
}
