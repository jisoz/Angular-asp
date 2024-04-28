using backend.Data;
using backend.Data.Repo;
using backend.Extensions;
using backend.Helpers;
using backend.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using System.Net;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
//builder.Services.AddCors(
//    options =>

//    {

//        options.AddPolicy(

//        name: "AllowOrigin",

//        builder => {

//            builder.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();

//        });

//    }
//    );
// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("MyConnection")
    ));
builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);
builder.Services.AddScoped<IUnitOfWork,UnitOfWork>();

var secretkey = builder.Configuration.GetSection("AppSettings:Key").Value;

var key =new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretkey));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidateIssuer = false,
        ValidateAudience = false,
        IssuerSigningKey = key
    };
});
var app = builder.Build();

// Configure the HTTP request pipeline.
app.ConfigureExceptionHandler(app.Environment);
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseSwagger();
app.UseSwaggerUI(

    );

app.UseAuthentication();
app.UseAuthorization();
//cors
app.UseCors(
   options => options.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader()
  );

//app.UseCors("AllowOrigin");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
