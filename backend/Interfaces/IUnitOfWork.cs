namespace backend.Interfaces
{
    public interface IUnitOfWork
    {

        ICityRepository CityRepository { get; }

        IUserRepository UserRepository { get; }

        IPropertyRepository PropertyRepository { get; }

        IPropertyTypeRepository PropertyTypeRepository { get; }

        IFurnishitureTypeRepository FurnishitureTypeRepository { get; }
        Task<bool> SaveAsync();
    }
}
