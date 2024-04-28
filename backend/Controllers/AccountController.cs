using backend.Dto;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AccountController:ControllerBase
    {

        private readonly IUnitOfWork uow;
        private readonly IConfiguration configuration;
        public AccountController(IUnitOfWork uow,IConfiguration configuration ) { 
        
        this.uow= uow;
            this.configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginReqDto  loginReq)
        {
           var user =await uow.UserRepository.Authenticate(loginReq.Username, loginReq.Password);

            if (user == null)
            {
                return Unauthorized("Invalid User ID or Password");
            }

            var loginRes = new LoginResDto();
            loginRes.Username = user.Username;
            loginRes.Token = CreateJWT(user);
            return Ok(loginRes);

        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterReq Registerreq)
        {
            if(await uow.UserRepository.UserAlreadyExist(Registerreq.Username))
            {
                return BadRequest("User already Exist , please try Something else");
            }
            uow.UserRepository.Register(Registerreq.Username, Registerreq.Password,Registerreq.Email, Registerreq.Mobile);
            await uow.SaveAsync();
            return StatusCode(201);
        }


        private string CreateJWT(User user)
        {
            var secretkey =configuration.GetSection("AppSettings:Key").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretkey));

            var claims = new Claim[] {
                new Claim(ClaimTypes.Name,user.Username),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString())
            };

            var signingCredentials = new SigningCredentials(
                    key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(10),
                SigningCredentials = signingCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
       


    

