using System.Threading;
using System.Threading.Tasks;
using application.core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
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

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            //injecting Datacontext and the mapper into the hander
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                //getting the activty that needs to be updated from the DB
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                //if the activity is null the we return null
                if(activity == null) return null;

                //mapping the updated activity obj in request to the one found in the DB
                _mapper.Map(request.Activity, activity);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to update activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}