using AutoMapper;
using backend.Dto;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;



namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController: BaseController
    {

        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        public PropertyController(IUnitOfWork uow ,IMapper mapper)

        {
            this.mapper = mapper;
            this.uow = uow;
        }

        [HttpGet("type/{sellRent}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyList(int sellRent)
        {
            var properties=await uow.PropertyRepository.GetPropertiesAsync(sellRent);
            var propertylistdto = mapper.Map<IEnumerable<PropertyDto>>(properties);
            return Ok(propertylistdto);
        }

        [HttpGet("detail/{id}")]
        [AllowAnonymous]

        public async Task<IActionResult> GetPropertyByid(int id)
        {
            var property = await uow.PropertyRepository.GetPropertyDetailAsync(id);
            var propertydto = mapper.Map<PropertyDetailDto>(property);
            return Ok(propertydto);
        }

            [HttpPost("post")]
            [Authorize]

            public async Task<IActionResult> AddProperty(ProperDto propertydto)
            {
                var property = mapper.Map<Property>(propertydto);
                var userid = GetUserId();
                property.PostedBy = userid;
   
                property.LastUpdatedby = userid;
                uow.PropertyRepository.AddProperty(property);
                await uow.SaveAsync();
                return StatusCode(201);

            }
    }
}
