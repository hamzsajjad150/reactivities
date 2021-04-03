using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using application.Activities;
using Domain;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    
    public class ActivitiesController : BaseApiController
    {
        

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            //getting the response back from the mediator handler
            //Mediator is getting from the base controller
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] // activities/id
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            //                                          this is an syntax that allows you to
                                                        //send param along with you annyomous obj
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        //when using IActionResult it give us access to HTTp RESPonse codes
        //we can also use [fromBody] before the activity param but inside the ()
        public async Task<IActionResult> CreateActivity(Activity activity){
            return Ok(await Mediator.Send(new Create.Command{Activity = activity}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity){
            activity.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id){
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}