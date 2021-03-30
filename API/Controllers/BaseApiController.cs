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
    }
}