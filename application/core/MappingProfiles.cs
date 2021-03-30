using AutoMapper;
using Domain;

namespace application.core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            //createMapper takes from  to where map 
            CreateMap<Activity, Activity>();
        }
    }
}