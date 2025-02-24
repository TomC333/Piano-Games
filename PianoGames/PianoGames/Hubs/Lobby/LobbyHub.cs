using Hubs;
using Hubs.ILobbyClient;
using LearnPiano.Hubs.GameManager;
using Microsoft.AspNetCore.SignalR;

namespace LearnPiano.Hubs.Menu;

public class LobbyHub : Hub<ILobbyClient>
{
    public override Task OnConnectedAsync()
    {
        return base.OnConnectedAsync();
    }
    public async void SendMessage(long username, string message)
    {
        await Clients.All.ReceivedMessage(username, message);
    }

    public async void RequestPlayGame(int gameMode)
    {

        switch (gameMode)
        {
            case (int)GameEnums.GameModes.PIANO_SHUFFLER:
                var gameID = ShufflerGameHub.CreateGame();
                await Clients.Caller.PlayGame(gameMode, gameID);
                break;
        }
    }
}