import './App.css';
import { useEffect } from 'react';
import { useStore } from './store/gameStore';
import { getSongsFromAlbum } from './services/fetchItunes';

function App() {
  const { count, inc, songsByAlbum, setSongsByAlbum } = useStore();

  useEffect(() => {
    let ignore = false;
    getSongsFromAlbum('1441164816')
      .then((response) => {
        if (!ignore) {
          setSongsByAlbum(response.data.results);
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
  }, [setSongsByAlbum]);

  console.log(songsByAlbum);

  return (
    <>
      <div>
        <h1>zustand</h1>
        <div>
          <span>{count}</span>
          <button onClick={inc}>one up</button>
        </div>
        <p>{songsByAlbum[0]?.trackName}</p>
      </div>
    </>
  );
}

export default App;
