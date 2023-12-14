import { useStore } from '../store/GameStore';
import Box from '@mui/material/Box';
import Zoom from '@mui/material/Zoom';

function ShowAnswer() {
  const { isAnswerCorrect, songsByAlbum, sortedNumber } = useStore();

  const rightAnswer = songsByAlbum[sortedNumber]?.trackName;

  return (
    <>
      {!isAnswerCorrect && isAnswerCorrect !== null && rightAnswer && (
        <Box sx={{ color: 'error.main' }}>
          <Zoom in={true}>{<h2 data-testid="result">Wrong! ❌</h2>}</Zoom>
          <Box sx={{ color: 'white' }}>
            <Zoom in={true}>
              {
                <p>
                  Right answer: <b>{rightAnswer}</b>
                </p>
              }
            </Zoom>
          </Box>
        </Box>
      )}

      {isAnswerCorrect && (
        <Box sx={{ color: 'success.main' }}>
          <Zoom in={true}>{<h2 data-testid="result">Correct! ✅</h2>}</Zoom>
        </Box>
      )}
    </>
  );
}

export default ShowAnswer;
