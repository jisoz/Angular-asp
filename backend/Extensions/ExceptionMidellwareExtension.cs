using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using System.Net;
using backend.Middelwares;

namespace backend.Extensions
{
    public static class ExceptionMidellwareExtension
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app,
        IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMidellware>();
        }
        public static void ConfigureBuiltinExceptionHandler(this IApplicationBuilder app,
        IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(
                    options => {
                        options.Run(
                            async context =>
                            {
                                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                                var ex = context.Features.Get<IExceptionHandlerFeature>();
                                if (ex != null)
                                {
                                    await context.Response.WriteAsync(ex.Error.Message);
                                }
                            }
                        );
                    }
                );
            }
        }


    }
}
