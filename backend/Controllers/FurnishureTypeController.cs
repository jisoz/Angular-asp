using AutoMapper;
using backend.Dto;
using backend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class FurnishureTypeController:ControllerBase
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public FurnishureTypeController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

        [HttpGet("list")]
        [AllowAnonymous]

        public async Task<IActionResult> GetFurnishureTypes()
        {
            var furtypes = await uow.FurnishitureTypeRepository.GetFurnitshureTypesAsync();
            var furtypedto = mapper.Map<IEnumerable<KeyValuePairDto>>(furtypes);
            return Ok(furtypedto);
        }
    }
}
