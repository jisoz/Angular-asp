using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace backend.Data.Repo
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext dc;
        public UserRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public async Task<User> Authenticate(string username, string passwordtext)
        {
            var user= await dc.Users.FirstOrDefaultAsync(x => x.Username == username);
            if (user == null || user.PasswordKey ==null)
            {
                return null;
            }
            if (!Matchpasswordhash(passwordtext, user.Password, user.PasswordKey))
            {
                return null;
            }

            return user;
        }

        private bool Matchpasswordhash(string passwordtext, byte[]? password, byte[]? passwordKey)
        {
            using (var hmac = new HMACSHA512(passwordKey))
            {
               
                var passwordhash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwordtext));

                for (int i = 0; i< passwordhash.Length; i++)
                {
                    if (passwordhash[i] != password[i])
                    {
                        return false;
                    }
                }

                return true;

            }
        }

        public void Register(string username, string password,string email , string mobile)
        {
            byte[] passwordhash, passwordkey;
            using(var hmac = new HMACSHA512())
            {
                passwordkey = hmac.Key;
                passwordhash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            }

            User user = new User();
            user.Username = username;
            user.Password=passwordhash;
            user.PasswordKey = passwordkey;
            user.Mobile = mobile;
            user.Email = email;
            dc.Users.Add(user);
        }

        public async Task<bool> UserAlreadyExist(string username)
        {
            return await dc.Users.AnyAsync(x => x.Username == username);
        }
    }
}
