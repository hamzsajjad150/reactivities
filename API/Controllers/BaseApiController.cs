using application.core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class BaseApiController : ControllerBase
    {
        //private Mediator for base API
        private IMediator _mediator;

        //this mediator will be avilable to all the controller that extent this base controller
        //checking if the private mediator is null then getting the mediator from the services
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices
        .GetService<IMediator>();

        protected ActionResult handleResult<T>(Result<T> result){
            //checking if the result is null 
            if(result == null) return NotFound();
             //checking if the result activity is not null and has a activity
            //we return activity from by accessing the result obj
            if (result.isSuccess && result.Value != null)
                return Ok(result.Value);
            //checking if the activity is null
            if(result.isSuccess && result.Value == null)
            return NotFound();
            //else we know there is a bad request 
            return BadRequest(result.Error);
        }

    }
}