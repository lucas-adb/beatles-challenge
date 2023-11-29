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
  const {
    setPlayedTracksId,
    setScore,
    eraseAnswer,
    setIsAnswerCorrect,
    setIsComboBoxDisabled,
  } = actions;

  const checkAnswer = () => {
    if (answer !== songsByAlbum[sortedNumber].trackName) {
      setIsAnswerCorrect(false);
    } else {
      setIsAnswerCorrect(true);
      setPlayedTracksId();
      setScore();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    checkAnswer();
    eraseAnswer();
    setIsComboBoxDisabled();
  };

  const isAnswerButtonDisable = () => {
    if (answer && pausedTime > 0) return false;
    if (playedTracksId.length >= songsByAlbum.length) return true;
    return true;
  };

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
