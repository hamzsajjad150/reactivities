using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace application.Activities
{
    public class Details
    {
        //this class will be fetching the data 
        public class Query : IRequest<Activity>
        {
            //this is the poperty required to use this query
            public Guid Id { get; set; }
        }

        //
        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.FindAsync(request.Id);
            }
        }
    }
}
 

// the query class build the query for DB meaning 
//(any required Param for db to excute will be passed to  Query)
// when query class is called in the controller(meaning an object is create) it will 
//excute the handler class