using AutoMapper;
using backend.Dto;
using backend.Models;

namespace backend.Helpers
{
    public class AutoMapperProfile:Profile
    {
       public AutoMapperProfile()
        {
            CreateMap<City, CityDto>().ReverseMap();
            CreateMap<City, CityUpdateDto>().ReverseMap();
            CreateMap<Property,ProperDto>().ReverseMap();
            CreateMap<Property, PropertyDto>().ForMember(d => d.City, opt => opt.MapFrom(src => src.City.Name)).ForMember(d => d.Country, opt => opt.MapFrom(src => src.City.Country))
                .ForMember(d => d.PropertyType, opt => opt.MapFrom(src => src.PropertyType.Name))
                .ForMember(d => d.FurnishingType, opt => opt.MapFrom(src => src.FurnishingType.Name));

            CreateMap<Property, PropertyDetailDto>().ForMember(d => d.City, opt => opt.MapFrom(src => src.City.Name)).ForMember(d => d.Country, opt => opt.MapFrom(src => src.City.Country))
              .ForMember(d => d.PropertyType, opt => opt.MapFrom(src => src.PropertyType.Name))
              .ForMember(d => d.FurnishingType, opt => opt.MapFrom(src => src.FurnishingType.Name));

            CreateMap<PropertyType, KeyValuePairDto>().ReverseMap();
            CreateMap<FurnishingType, KeyValuePairDto>().ReverseMap();
        }
    }
}
