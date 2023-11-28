import { useStore } from '../store/gameStore';
import { Button } from '@mui/material';

function NextBtn() {
  const { isAnswerCorrect, playedTracksId, songsByAlbum, actions } = useStore();
  const {
    setIsComboBoxDisabled,
    sortNumber,
    setIsAnswerCorrect,
    setPausedTime,
    setIsClickedPlayBtn,
  } = actions;

  const goToNextSong = () => {
    setIsComboBoxDisabled();
    sortNumber();
    setIsAnswerCorrect();
    setPausedTime();
    setIsClickedPlayBtn(false);
  };

  const isNextButtonDisable = () => {
    if (isAnswerCorrect) return false;
    if (playedTracksId.length >= songsByAlbum.length) return true;
    return true;
  };

  return (
    <>
      {!(!isAnswerCorrect && isAnswerCorrect !== null) && (
        <Button
          type="submit"
          disabled={isNextButtonDisable()}
          variant="contained"
          onClick={goToNextSong}
        >
          Next
        </Button>
      )}
    </>
  );
}

export default NextBtn;
