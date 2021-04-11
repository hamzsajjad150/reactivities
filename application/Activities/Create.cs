using System.Threading;
using System.Threading.Tasks;
using application.core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace application.Activities
{
    public class Create
    {
        // in the CQRS Command dont retrun any value that why our irequest as no generic
        //type value in <>
        // unit is mediator class void
        public class Command : IRequest<Result<Unit>>
        {
            //our command class will accept an object of Activity
            public Activity Activity { get; set; }
        }

        //this works like a middleware in between our command and handler
        //createing a command validator that extense the validor class from fluent validation
        // we also pass the object type we want to validate against
        // validater against the command because the command contains the activity
        public class CommandValidator : AbstractValidator<Command>
        {
            // in the constructor we add the rules we want to add
            // using rule for that takes in an expression in the ruleFor
            // x is our activity
           public CommandValidator()
            {
                // x is the command object dot gets us access to activity
                //we are speicfing that we want a rule for the activity
                // we are gonna specify that we are gonna set the validator against this
                //property or this object using our validator class
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        // note that in the IRequestHandler we are just passing the command and no return
        // type in the <> because commands dont return a value 
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                //saving the activity obj in the memory not in the DB yet!
                //thats why there is no async Version used 
                _context.Activities.Add(request.Activity);
                // saving the chnages done in the context to the DB thats why there is 
                //Async version method used
                //await when using with content (to access the db) returns the number of data row returns in the db
                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to create activity");
                // this lets our api know that the task has been completed and it 
                //can move on
                //this returns nothing
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}