import './App.css';
// import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useStore } from './store/GameStore';
import { getSongsFromAlbum } from './services/fetchItunes';
import CustomAudioPlayer from './components/CustomAudioPlayer';
import GuessForm from './components/GuessForm';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Zoom from '@mui/material/Zoom';

function App() {
  const {
    songsByAlbum,
    sortedNumber,
    score,
    playedTracksId,
    isAnswerCorrect,
    actions,
  } = useStore();
  const {
    setSongsByAlbum,
    sortNumber,
    setNameOfTheSongs,
    setIsAnswerCorrect,
    setPausedTime,
    setScoreToZero,
    resetPlayedTracksId,
    setIsClickedPlayBtn,
    setIsComboBoxDisabled,
  } = actions;

  useEffect(() => {
    let ignore = false;
    getSongsFromAlbum('1441164816')
      .then((response) => {
        if (!ignore) {
          setSongsByAlbum(response.data.results);
          setNameOfTheSongs(response.data.results);
          sortNumber();
        }
      })
      .catch((error) => {
        if (!ignore) {
          console.error(error.message);
        }
      });

    return () => {
      ignore = true;
    };
  }, [setSongsByAlbum, sortNumber, setNameOfTheSongs]);

  console.log('right answer', songsByAlbum[sortedNumber]?.trackName);
  console.log('total of tracks', songsByAlbum?.length);

  const goToNextSong = () => {
    setIsComboBoxDisabled();
    sortNumber();
    setIsAnswerCorrect();
    setPausedTime();
    setIsClickedPlayBtn(false);
    // setIsComboBoxDisabled();
  };

  const isNextButtonDisable = () => {
    if (isAnswerCorrect) return false;
    if (playedTracksId.length >= songsByAlbum.length) return true;
    return true;
  };

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
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          textAlign: 'center',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>Score: {score} </p>
          <p>Guesses: {playedTracksId.length} </p>
        </Box>

        <h1>Beatles Guessing Challenge</h1>

        {/* To-do: create a component to show feedback of answer */}

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

        <CustomAudioPlayer />

        <GuessForm />

        {!(!isAnswerCorrect && isAnswerCorrect !== null) && (
          <Button
            type="submit"
            disabled={isNextButtonDisable()}
            variant="contained"
            // sx={{ width: '100%' }}
            onClick={goToNextSong}
          >
            Next
          </Button>
        )}

        {!isAnswerCorrect && isAnswerCorrect !== null && (
          <Button
            type="submit"
            disabled={!(!isAnswerCorrect && isAnswerCorrect !== null)}
            variant="contained"
            // sx={{ width: '100%' }}
            onClick={restartGame}
          >
            Restart
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default App;
