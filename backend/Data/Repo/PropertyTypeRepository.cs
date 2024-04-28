using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Repo
{
    public class PropertyTypeRepository:IPropertyTypeRepository
    {

        private readonly DataContext dc;
        public PropertyTypeRepository(DataContext dc) {
        
        this.dc = dc;
        }

        public async Task<IEnumerable<PropertyType>> GetPropertyTypesAsync()
        {
            return await dc.PropertyTypes.ToListAsync();
        }
    }
}
