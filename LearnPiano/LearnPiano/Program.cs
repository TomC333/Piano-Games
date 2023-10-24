using LearnPiano.Hubs.Menu;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapHub<MenuHub>("/menu");
app.Run();