using ABC.medapi.Services.Interface;
using Azure.Storage.Blobs;
using Microsoft.Extensions.Caching.Distributed;

namespace ABC.medapi.Services
{
    public class BlobService : IBlobService
    {
        private readonly BlobServiceClient _blobServiceClient;
        private readonly IDistributedCache _cache;
        public BlobService(BlobServiceClient blobServiceClient,IDistributedCache cache)
        {
            _blobServiceClient = blobServiceClient;
            _cache = cache;
        }
        public Task CreateContainer(string name)
        {
            throw new NotImplementedException();
        }

        public async Task GetBlob(string name)
        {
            var containerName = "firstcontainer";
            var containerCLient = _blobServiceClient.GetBlobContainerClient(containerName);
            var blobLists = containerCLient.GetBlobs();

            var names = blobLists.Select(x => x.Name).ToList();

            // To Demo Cache
            CacheDemo();

        }

        public async Task GetContainers()
        {
            var listContaners = _blobServiceClient.GetBlobContainers();

            var list = listContaners.Select(x => x.Name).ToList();

        }

        public Task UploadToBlob(string fileName, Stream fIleContent)
        {

            // cntianer
            throw new NotImplementedException();
        }

        private void CacheDemo()
        {


            IEnumerable<string> names = new List<string> { "Alice", "Bob", "Charlie" };
            try
            {
                if (_cache.GetString("Names") == null)
                {
                    _cache.SetString("Names", string.Join(",", names), new DistributedCacheEntryOptions() { });
                }
                else
                {
                    var cachedNames = _cache.GetString("Names");
                    Console.WriteLine("Cached Names: " + cachedNames);
                }
               
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

        }


    }
}
