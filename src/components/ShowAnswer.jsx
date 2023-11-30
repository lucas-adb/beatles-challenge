import { useStore } from '../store/GameStore';
import Box from '@mui/material/Box';
import Zoom from '@mui/material/Zoom';

function ShowAnswer() {
  const { isAnswerCorrect } = useStore();

  return (
    <>
      {!isAnswerCorrect && isAnswerCorrect !== null && (
        <Box sx={{ color: 'error.main' }}>
          <Zoom in={true}>{<h2>Wrong! ❌</h2>}</Zoom>
        </Box>
      )}

      {isAnswerCorrect && (
        <Box sx={{ color: 'success.main' }}>
          <Zoom in={true}>{<h2>Correct! ✅</h2>}</Zoom>
        </Box>
      )}
    </>
  );
}

export default ShowAnswer;
