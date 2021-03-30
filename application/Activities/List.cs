using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace application.Activities
{
    public class List
    {
        // we extend the Meditator class along with the type of data we want to return
        //in our case it is the Activity in our domain
        // if we have any parmeter that we need to pass in the query we can pass them as
        //  the class property
        public class Query : IRequest<List<Activity>> { }

        // we pass our query and our return data which is a list of activity
        //first parm is the query we need to excute and the second is the return time
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            //to inject the datacontext (in presestence) we add the constructer with datacontext
            // as params
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            //cancellationtoken can cancel an on going request
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                //returns all the activity in the db activities table
                return await _context.Activities.ToListAsync();
            }
        }
    }
}