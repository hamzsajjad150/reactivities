using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace application.Activities
{
    public class Create
    {
        // in the CQRS Command dont retrun any value that why our irequest as no generic
        //type value in <>
        public class Command : IRequest
        {
            //our command class will accept an object of Activity
            public Activity Activity { get; set; }
        }

        // note that in the IRequestHandler we are just passing the command and no return
        // type in the <> because commands dont return a value 
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //saving the activity obj in the memory not in the DB yet!
                //thats why there is no async Version used 
                _context.Activities.Add(request.Activity);
                // saving the chnages done in the context to the DB thats why there is 
                //Async version method used
                await _context.SaveChangesAsync();
                // this lets our api know that the task has been completed and it 
                //can move on
                //this returns nothing
                return Unit.Value;
            }
        }
    }
}