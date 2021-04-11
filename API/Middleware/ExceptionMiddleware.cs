using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using application.core;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _ev;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment ev)
        {
            _ev = ev;
            _logger = logger;
            _next = next;

        }

        public async Task InvokeAsync (HttpContext context){
            try
            {
                // we will try to call the next middleware in the chain
                await _next(context);
            }
            // if there is an excepion anywhere in between our application or the API it will be caught here
            catch (Exception ex)
            {
                //the is console log
                _logger.LogError(ex, ex.Message);
                //setting the response content type
                context.Response.ContentType = "application/json";
                //getting the error code from the http package and casting it as an int which will be 500
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                
                // if we in development mode then we need to return the full stack trace
                var response = _ev.IsDevelopment() 
                        ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                        : new AppException(context.Response.StatusCode, "Server Error");

                //creating json serlized opptions
                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

                //converting our response to json and also passing the options
                var json = JsonSerializer.Serialize(response, options);

                //wrting the json onto the response
                await context.Response.WriteAsync(json);
            }
        }

    }
}