import { useStore } from '../store/GameStore';
import { Button } from '@mui/material';

function RestartBtn() {
  const { isAnswerCorrect, actions } = useStore();
  const {
    setIsComboBoxDisabled,
    setSortedNumber,
    setIsAnswerCorrect,
    setPausedTime,
    setIsPlayBtnClicked,
    setScoreToZero,
    resetPlayedTracksId,
  } = actions;

  const restartGame = () => {
    setScoreToZero();
    resetPlayedTracksId();
    setSortedNumber();
    setIsAnswerCorrect();
    setPausedTime();
    setIsPlayBtnClicked(false);
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
