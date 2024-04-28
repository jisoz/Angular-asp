using backend.Models;

namespace backend.Interfaces
{
    public interface IFurnishitureTypeRepository
    {
        Task<IEnumerable<FurnishingType>> GetFurnitshureTypesAsync();
    }
}
