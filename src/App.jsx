import './App.css';
// import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useStore } from './store/GameStore';
import { getSongsFromAlbum } from './services/fetchItunes';
import CustomAudioPlayer from './components/CustomAudioPlayer';
import GuessForm from './components/GuessForm';

function App() {
  const { songsByAlbum, sortedNumber, score, actions } = useStore();
  const { setSongsByAlbum, sortNumber } = actions;

  useEffect(() => {
    let ignore = false;
    getSongsFromAlbum('1441164816')
      .then((response) => {
        if (!ignore) {
          setSongsByAlbum(response.data.results);
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
  }, [setSongsByAlbum, sortNumber]);

  return (
    <>
      <div>
        <h1>Beatles Challenge</h1>
        <div>
          <p>answer: {songsByAlbum[sortedNumber]?.trackName}</p>
          <p>total of tracks: {songsByAlbum?.length}</p>
          <p>sorted number: {sortedNumber}</p>
          <p>Score: {score} </p>
        </div>

        <CustomAudioPlayer />

        <GuessForm />
      </div>
    </>
  );
}

export default App;
