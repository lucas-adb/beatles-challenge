import './App.css';
import { useEffect } from 'react';
import { useStore } from './store/gameStore';
import { getSongsFromAlbum } from './services/fetchItunes';

function App() {
  const { songsByAlbum, sortedNumber, actions } = useStore();
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
          <p>{songsByAlbum[sortedNumber]?.trackName}</p>
          <p>total of tracks: {songsByAlbum?.length}</p>
          <p>sorted number: {sortedNumber}</p>
        </div>
        <audio
          sandbox="allow-same-origin"
          controls
          src={songsByAlbum[sortedNumber]?.previewUrl}
        ></audio>
      </div>
    </>
  );
}

export default App;
