namespace Hubs.GameManager.Games
{
    public class ShufflerGameObject
    {

        public Guid Id { get; }

        private List<int> piano = new List<int>();

        public ShufflerGameObject()
        {
            Id = Guid.NewGuid();

            for (int i = 0; i < (int)GameEnums.Piano.NUMBER_OF_KEYS; i++)
            {
                piano.Add(i);
            }

        }

        public List<int> ShufflePiano()
        {

            Random random = new Random();   

            for(int i  = piano.Count - 1; i >=  0; i--)
            {

                int j = random.Next(0, i + 1);

                int tmp = piano[j];
                piano[j] = piano[i];
                piano[i] = tmp;

            }

            return piano; 
        }

        public bool IsCorrect(List<int> piano)
        {
            for(int i = 0; i < piano.Count; i++)
            {
                if (piano[i] != i)
                {
                    return false;
                }
            }

            return true;
        }
    }
}
