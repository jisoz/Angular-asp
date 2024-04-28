using AutoMapper;
using backend.Dto;
using backend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyTypeController:ControllerBase
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public PropertyTypeController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

        [HttpGet("list")]
        [AllowAnonymous]

        public async Task<IActionResult> GetPropertTypes()
        {
            var propertirtypes = await uow.PropertyTypeRepository.GetPropertyTypesAsync();
            var propertytypedto = mapper.Map<IEnumerable<KeyValuePairDto>>(propertirtypes);
            return Ok(propertytypedto);
        }

    }
}
