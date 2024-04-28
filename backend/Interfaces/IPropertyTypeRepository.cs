using backend.Models;

namespace backend.Interfaces
{
    public interface IPropertyTypeRepository
    {

        Task<IEnumerable<PropertyType>> GetPropertyTypesAsync();
    }
}
