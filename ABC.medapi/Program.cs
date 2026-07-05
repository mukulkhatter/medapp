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
builder.Services.AddSingleton<ABC.medapi.Services.IMedStoreService, ABC.medapi.Services.MedStoreService>();
builder.Services.AddTransient<ABC.medapi.Services.Interface.IServiceA, ABC.medapi.Services.ServiceA>();
builder.Services.AddTransient<ABC.medapi.Services.Interface.IServiceB, ABC.medapi.Services.ServiceB>();
builder.Services.AddSingleton<ABC.medapi.Services.Interface.IServiceC, ABC.medapi.Services.ServiceC>();

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

