import './App.css';
// import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useStore } from './store/GameStore';
import { getSongsFromAlbum } from './services/fetchItunes';
import CustomAudioPlayer from './components/CustomAudioPlayer';
import GuessForm from './components/GuessForm';
import Container from '@mui/material/Container';

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

  return (
    <Container maxWidth="sm">
      <>
        <div>
          <h1>Beatles Challenge</h1>
          <div>
            <p>Answer: {songsByAlbum[sortedNumber]?.trackName}</p>
            <p>Total of tracks: {songsByAlbum?.length}</p>
            <p>Sorted number: {sortedNumber}</p>
            <p>Score: {score} </p>
            <p>Correct guesses: {playedTracksId.length} </p>
          </div>

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
