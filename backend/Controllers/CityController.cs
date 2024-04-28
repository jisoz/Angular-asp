using AutoMapper;
using Azure;
using backend.Dto;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;


namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CityController : ControllerBase
    {
     
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        public CityController(IUnitOfWork uow,IMapper mapper) {
          
            this.uow = uow;
            this.mapper = mapper;
        
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Getcitites() {

            var cities = await uow.CityRepository.GetCitiesAsync();

            //var citiesdto = from c in cities
            //                select new CityDto()
            //                {
            //                    Id= c.Id,
            //                    Name = c.Name,
            //                };
            var citiesdto=mapper.Map<IEnumerable<CityDto>>(cities);

            return Ok(citiesdto);

        }

        //[HttpPost("add")]
        //[HttpPost("add/{cityname}")]

        //public async Task<IActionResult> Addcity(string cityname)
        //{
        //    City city = new City();
        //    city.Name = cityname; ;
        //    await dc.Cities.AddAsync(city);
        //    await dc.SaveChangesAsync();
        //    return Ok(city);
        //}

        [HttpPost("post")]
        public async Task<IActionResult> Addcity(CityDto citydto)
        {
            var city = mapper.Map<City>(citydto);
            city.LastUpdatedby = 1;
            city.LastUpdatedOn = DateTime.Now;
        //    var city = new City
        //    {
        //    Name = citydto.Name,
        //    LastUpdatedby = 1,
        //    LastUpdatedOn = DateTime.Now
        //};
            uow.CityRepository.AddCity(city);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCity(int id ,CityDto citydto)
        {
            var cityfromdb = await uow.CityRepository.FindCity(id);
            cityfromdb.LastUpdatedby = 1;
            cityfromdb.LastUpdatedOn = DateTime.Now;
            throw new Exception("some error");
            mapper.Map(citydto, cityfromdb);
            await uow.SaveAsync();
            return StatusCode(200);
        }

        [HttpPut("updateCityName/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityUpdateDto citydto)
        {
            var cityfromdb = await uow.CityRepository.FindCity(id);
            cityfromdb.LastUpdatedby = 1;
            cityfromdb.LastUpdatedOn = DateTime.Now;
            mapper.Map(citydto, cityfromdb);
            await uow.SaveAsync();
            return StatusCode(200);
        }

        [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateCityPatch(int id, JsonPatchDocument<City> citytopatch)
        {
            var cityfromdb = await uow.CityRepository.FindCity(id);
            cityfromdb.LastUpdatedby = 1;
            cityfromdb.LastUpdatedOn = DateTime.Now;
            citytopatch.ApplyTo(cityfromdb, ModelState);
            await uow.SaveAsync();
            return StatusCode(200);
        }
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Deletecity(int id)
        {
            uow.CityRepository.DeleteCity(id);
            
            await uow.SaveAsync();
            return Ok(id);    
        }


    }
}
