using LearnPiano.Hubs.GameManager;
using LearnPiano.Hubs.Menu;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapHub<LobbyHub>("/lobby");
app.MapHub<ShufflerGameHub>("/shufflerGame");
app.Run();