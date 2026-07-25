namespace ABC.medapi.Services.Interface
{
    public interface IBlobService
    {
        Task GetContainers();
        Task CreateContainer(string name);
        Task GetBlob(string name);
        Task UploadToBlob(string fileName, Stream fIleContent);
    }
}