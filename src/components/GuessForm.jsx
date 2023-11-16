import { useStore } from '../store/GameStore';
import Button from '@mui/material/Button';
import ComboBox from './ComboBox';

export default function GuessForm() {
  const { songsByAlbum, answer, playedTracksId, sortedNumber, actions } =
    useStore();
  const { savePlayedTracksId, sortNumber, saveAnswer, setScore, eraseAnswer } =
    actions;

  const checkAnswer = () => {
    if (answer !== songsByAlbum[sortedNumber].trackName) {
      alert("That's Wrong");
    } else if (playedTracksId.length >= songsByAlbum.length - 1) {
      alert('Wow, you guessed 100% of the songs. Amazing!');
      savePlayedTracksId();
      setScore();
    } else {
      alert("That's Right!");
      savePlayedTracksId();
      sortNumber();
      setScore();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    checkAnswer();
    eraseAnswer();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={answer}
        onChange={(e) => saveAnswer(e.target.value)}
      />

      <Button
        type="submit"
        disabled={playedTracksId.length >= songsByAlbum.length}
      >
        Answer
      </Button>

      <ComboBox />
    </form>
  );
}

{
  /* <form onSubmit={handleSubmit}>
<input
  type="text"
  value={answer}
  onChange={(e) => saveAnswer(e.target.value)}
/>
<button disabled={playedTracksId.length >= songsByAlbum.length}>
  Answer
</button>

<Button>Mui Button</Button>
</form> */
}
