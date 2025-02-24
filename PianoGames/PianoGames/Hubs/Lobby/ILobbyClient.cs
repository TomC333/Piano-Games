namespace Hubs.ILobbyClient
{
    public interface ILobbyClient
    {
        Task PlayGame(long gameMode, Guid gameID);
        Task ReceivedMessage(long username, string message);
    }
}