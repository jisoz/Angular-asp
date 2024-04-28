using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Repo
{
    public class FurnishureRepository : IFurnishitureTypeRepository
    {
        private readonly DataContext dc;
        public FurnishureRepository(DataContext dc) {

            this.dc = dc;
        }
        public async Task<IEnumerable<FurnishingType>> GetFurnitshureTypesAsync()
        {
            return await  dc.FurnishingTypes.ToListAsync();
        }
    }
}
