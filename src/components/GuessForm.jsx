import { useStore } from '../store/GameStore';
import Button from '@mui/material/Button';
import ComboBox from './ComboBox';

export default function GuessForm() {
  const {
    songsByAlbum,
    answer,
    playedTracksId,
    sortedNumber,
    pausedTime,
    actions,
  } = useStore();
  const { savePlayedTracksId, setScore, eraseAnswer, setIsAnswerCorrect } =
    actions;

  const checkAnswer = () => {
    if (answer !== songsByAlbum[sortedNumber].trackName) {
      setIsAnswerCorrect(false);
    } else {
      setIsAnswerCorrect(true);
      savePlayedTracksId();
      setScore();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    checkAnswer();
    eraseAnswer();
  };

  const isAnswerButtonDisable = () => {
    if (answer && pausedTime > 0) return false;
    if (playedTracksId.length >= songsByAlbum.length) return true;
    return true;
  };

  console.log('answer', answer);
  console.log('pausedTime', pausedTime);

  return (
    <form onSubmit={handleSubmit}>
      <ComboBox />

      <Button
        type="submit"
        disabled={isAnswerButtonDisable()}
        variant="contained"
        sx={{ width: '100%' }}
      >
        Answer
      </Button>
    </form>
  );
}
