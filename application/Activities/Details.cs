using System;
using System.Threading;
using System.Threading.Tasks;
using application.core;
using Domain;
using MediatR;
using Persistence;

namespace application.Activities
{
    public class Details
    {
        //this class will be fetching the data 
        public class Query : IRequest<Result<Activity>>
        {
            //this is the poperty required to use this query
            public Guid Id { get; set; }
        }

        //
        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);

                return Result<Activity>.Success(activity);
            }
        }
    }
}
 

// the query class build the query for DB meaning 
//(any required Param for db to excute will be passed to  Query)
// when query class is called in the controller(meaning an object is create) it will 
//excute the handler class