import { useStore } from '../store/GameStore';

export default function GuessForm() {
  const { songsByAlbum, answer, playedTracksId, sortedNumber, actions } =
    useStore();
  const { savePlayedTracksId, sortNumber, saveAnswer } = actions;

  const checkAnswer = () => {
    if (answer !== songsByAlbum[sortedNumber].trackName) {
      alert("That's Wrong");
    } else if (playedTracksId.length >= songsByAlbum.length - 1) {
      alert('Wow, you guessed 100% of the songs. Amazing!');
      savePlayedTracksId();
    } else {
      alert("That's Right!");
      savePlayedTracksId();
      sortNumber();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    checkAnswer();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={answer}
        onChange={(e) => saveAnswer(e.target.value)}
      />
      <button disabled={playedTracksId.length >= songsByAlbum.length}>
        Answer
      </button>
    </form>
  );
}
