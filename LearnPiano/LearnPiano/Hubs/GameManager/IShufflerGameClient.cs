namespace Hubs.GameManager
{
    public interface IShufflerGameClient
    {
        Task IsCorrect(bool v);
        Task ShuffledPiano(List<int> list);
    }
}