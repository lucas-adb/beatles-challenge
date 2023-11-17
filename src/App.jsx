import './App.css';
// import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useStore } from './store/GameStore';
import { getSongsFromAlbum } from './services/fetchItunes';
import CustomAudioPlayer from './components/CustomAudioPlayer';
import GuessForm from './components/GuessForm';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function App() {
  const {
    songsByAlbum,
    sortedNumber,
    score,
    playedTracksId,
    isAnswerCorrect,
    actions,
  } = useStore();
  const { setSongsByAlbum, sortNumber, setNameOfTheSongs } = actions;

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

  console.log('answer', songsByAlbum[sortedNumber]?.trackName);
  console.log('total of tracks', songsByAlbum?.length);

  return (
    <Container maxWidth="sm">
      <>
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>Score: {score} </p>
            <p>Guesses: {playedTracksId.length} </p>
          </Box>

          <h1>Beatles Challenge</h1>

          {isAnswerCorrect !== null && (
            <div>{isAnswerCorrect ? 'Correct!' : 'Wrong!'}</div>
          )}

          <CustomAudioPlayer />

          <GuessForm />
        </div>
      </>
    </Container>
  );
}

export default App;
