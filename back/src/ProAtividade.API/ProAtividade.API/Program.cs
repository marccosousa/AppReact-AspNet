using Microsoft.EntityFrameworkCore;
using ProAtividade.Data.Context;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var mySqlConnection = builder.Configuration.GetConnectionString("DataContext"); // Connection Database
builder.Services.AddDbContext<DataContext>
    (
        options => options.UseMySql(mySqlConnection, ServerVersion.AutoDetect(mySqlConnection))
    );

builder.Services.AddControllers()
                .AddJsonOptions(opt =>
                {
                    opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); 
                }); 
                
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(opt => opt.AllowAnyHeader()
                      .AllowAnyMethod()
                      .AllowAnyOrigin()); 

app.MapControllers();

app.Run();
