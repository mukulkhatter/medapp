using ABC.medapi.Services;
using ABC.medapi.Services.Interface;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();

// Add JWT Bearer Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));
    //.AddJwtBearer(options =>
    //{
    //    options.Authority = builder.Configuration["Jwt:Authority"];
    //    // Accept tokens whose 'aud' is either api://{clientid} or the client id GUID
    //    var validAudiences = builder.Configuration.GetSection("Jwt:ValidAudiences").Get<string[]>();
    //    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    //    {
    //        ValidateAudience = true,
    //        ValidAudiences = validAudiences,
    //        ValidateIssuer = true,
    //        ValidIssuers= builder.Configuration.GetSection("Jwt:ValidIssuer").Get<string[]>()
    //    };

//    // Helpful for debugging during development
//    options.Events = new Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerEvents
//    {
//        OnAuthenticationFailed = ctx =>
//        {
//            var logger = ctx.HttpContext.RequestServices.GetRequiredService<Microsoft.Extensions.Logging.ILoggerFactory>()
//                .CreateLogger("JwtAuth");
//            logger.LogError(ctx.Exception, "Authentication failed");
//            return System.Threading.Tasks.Task.CompletedTask;
//        }
//    };
//});

builder.Services.AddAuthorization();

builder.Services.AddControllers();
builder.Services.AddSingleton<IMedStoreService, ABC.medapi.Services.MedStoreService>();
builder.Services.AddTransient<IServiceA, ABC.medapi.Services.ServiceA>();
builder.Services.AddTransient<IServiceB, ABC.medapi.Services.ServiceB>();
builder.Services.AddSingleton<IServiceC, ABC.medapi.Services.ServiceC>();

// Adding BlobService Wrapper
builder.Services.AddScoped<IBlobService, BlobService>();
builder.Services.AddSingleton<Azure.Storage.Blobs.BlobServiceClient>(sp =>
{
    var connectionString = builder.Configuration.GetConnectionString("BlobStorageConnectionString");
    return new Azure.Storage.Blobs.BlobServiceClient(connectionString);
});

// Redis Registeration and initialization

builder.Services.AddStackExchangeRedisCache(options =>
{

    options.Configuration = builder.Configuration.GetConnectionString("Redis");
    options.InstanceName = "forredisolddemo.redis";
});



builder.Services.AddCors(o=>o.AddPolicy("AllowAll", policy =>
{
    policy.AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader();
}));

//builder.Services.AddSwaggerGen(c =>
//{
    
//});
var app = builder.Build();
app.UseCors("AllowAll");
// Configure the HTTP request pipeline.
app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

//app.UseSwagger();
//app.UseSwaggerUI(c =>
//{
//    c.SwaggerEndpoint("/swagger/v1/swagger.json", "ABC.medapi API v1");
//});

app.UseHttpsRedirection();
app.MapControllers();


app.Run();

