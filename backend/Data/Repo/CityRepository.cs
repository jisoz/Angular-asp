using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Repo
{
    public class CityRepository : ICityRepository
    {

        private readonly DataContext dc;
        public CityRepository(DataContext dc)
        {
            this.dc = dc;
            
        }

        public async Task<City> FindCity(int id)
        {
            return await dc.Cities.FindAsync(id);
        }

        void ICityRepository.AddCity(City city)
        {
           dc.Cities.AddAsync(city);
        }

        void ICityRepository.DeleteCity(int CityId)
        {
            var city = dc.Cities.Find(CityId);
            dc.Cities.Remove(city);
        }

         async Task<IEnumerable<City>> ICityRepository.GetCitiesAsync()
        {
            return await dc.Cities.ToListAsync();
        }


       
    }
}
