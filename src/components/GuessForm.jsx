import { useStore } from '../store/GameStore';
import Button from '@mui/material/Button';
import ComboBox from './ComboBox';

export default function GuessForm() {
  const { songsByAlbum, answer, playedTracksId, sortedNumber, actions } =
    useStore();
  const {
    savePlayedTracksId,
    sortNumber,
    setScore,
    eraseAnswer,
    setIsAnswerCorrectAsFalse,
    setIsAnswerCorrectAsTrue,
  } = actions;

  const checkAnswer = () => {
    if (answer !== songsByAlbum[sortedNumber].trackName) {
      setIsAnswerCorrectAsFalse();
    } else if (playedTracksId.length >= songsByAlbum.length - 1) {
      setIsAnswerCorrectAsTrue();
      savePlayedTracksId();
      setScore();
    } else {
      setIsAnswerCorrectAsTrue();
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

  console.log('answer', answer);

  return (
    <form onSubmit={handleSubmit}>
      <ComboBox />

      <Button
        type="submit"
        disabled={playedTracksId.length >= songsByAlbum.length}
        variant="contained"
      >
        Answer
      </Button>
    </form>
  );
}
