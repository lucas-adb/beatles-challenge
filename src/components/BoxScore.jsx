import { useStore } from '../store/GameStore';
import Box from '@mui/material/Box';

function BoxScore() {
  const { playedTracksId, score } = useStore();

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Score: {score} </p>
        <p>Guesses: {playedTracksId.length} </p>
      </Box>
      <h1>Beatles Guessing Challenge</h1>
    </>
  );
}

export default BoxScore;
