import { useStore } from '../store/gameStore';
import { Button } from '@mui/material';

function RestartBtn() {
  const { isAnswerCorrect, actions } = useStore();
  const {
    setIsComboBoxDisabled,
    sortNumber,
    setIsAnswerCorrect,
    setPausedTime,
    setIsClickedPlayBtn,
    setScoreToZero,
    resetPlayedTracksId,
  } = actions;

  const restartGame = () => {
    setScoreToZero();
    resetPlayedTracksId();
    sortNumber();
    setIsAnswerCorrect();
    setPausedTime();
    setIsClickedPlayBtn(false);
    setIsComboBoxDisabled();
  };

  return (
    <>
      {!isAnswerCorrect && isAnswerCorrect !== null && (
        <Button
          type="submit"
          disabled={!(!isAnswerCorrect && isAnswerCorrect !== null)}
          variant="contained"
          onClick={restartGame}
        >
          Restart
        </Button>
      )}
    </>
  );
}

export default RestartBtn;
