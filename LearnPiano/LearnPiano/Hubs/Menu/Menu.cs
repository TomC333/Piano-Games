using Microsoft.AspNetCore.SignalR;

namespace LearnPiano.Hubs.Menu;

public class MenuHub : Hub
{
    public async Task NewMessage(long username, string message) =>
        await Clients.All.SendAsync("messageReceived", username, message);
}