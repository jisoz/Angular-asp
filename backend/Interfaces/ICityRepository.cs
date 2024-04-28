using backend.Models;

namespace backend.Interfaces
{
    public interface ICityRepository
    {
        Task<IEnumerable<City>> GetCitiesAsync();

        void AddCity(City city);

        Task<City> FindCity(int id);
        void DeleteCity(int CityId);

       
    }
}
