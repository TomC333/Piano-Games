using Hubs.GameManager;
using Hubs.GameManager.Games;
using Microsoft.AspNetCore.SignalR;

namespace LearnPiano.Hubs.GameManager
{
    public class ShufflerGameHub : Hub<IShufflerGameClient>
    {
        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        private static object _lock = new object();
        public static List<ShufflerGameObject> games = new List<ShufflerGameObject>();

        public static Guid CreateGame()
        {
            ShufflerGameObject game = new ShufflerGameObject();
            lock (_lock)
            {
                games.Add(game);
            }

            return game.Id;
        }

        private ShufflerGameObject? GetGame(Guid gameID)
        {
            return games.FirstOrDefault(x => x.Id == gameID);
        }

        public async Task ShufflePiano(string gameID)
        {
            ShufflerGameObject? game = GetGame(Guid.Parse(gameID));

            if (game != null)
            {
                await Clients.Caller.ShuffledPiano(game.ShufflePiano());
            }
        }

        public async Task CheckAnswer(string gameID, List<int> piano)
        {
            var game = GetGame(Guid.Parse(gameID));

            if (game != null)
            {
                await Clients.Caller.IsCorrect(game.IsCorrect(piano));
            }
        }
    }
}
