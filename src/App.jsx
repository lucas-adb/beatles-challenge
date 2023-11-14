import { useEffect, useState } from 'react';
import { AlbumsId, getSongsFromAlbum } from './services/fetchItunes';
import './App.css';
import { getRandomIntInclusive } from './utils/getRandomIntInclusive';

function App() {
  const [album, setAlbum] = useState(null);
  const [error, setError] = useState(null);
  const [sortedNumber, setSortedNumber] = useState(null);

  useEffect(() => {
    // ignores the api call if the component is unmounted
    let ignore = false;

    // indicates that a new api call is in progress
    setAlbum(null);

    // waits the Promise to resolve, and if ignore is "false", sets data to "album"
    getSongsFromAlbum(AlbumsId.pleasePleaseMe)
      .then((result) => {
        if (!ignore) {
          setAlbum(result);
          setSortedNumber(getRandomIntInclusive(0, result.resultCount));
        }
      })
      .catch((error) => {
        if (!ignore) {
          setError(error.message);
        }
      });

    // cleanup function: signals that the state update must be ignored
    return () => {
      ignore = true;
    };
  }, []);

  if (error) return <h1>Something bad happened...</h1>;

  if (!album) return <h1>Loading...</h1>;

  if (album)
    return (
      <>
        <div>
          <h1>One-Second Guessing Challenge</h1>
          <h2>The Beatles Edition</h2>

          <p>{album.results[2].trackName}</p>

          <p>total of results: {album.resultCount}</p>
          <p>sorted: {sortedNumber}</p>

          <audio
            sandbox="allow-same-origin"
            controls
            src={album.results[2].previewUrl}
          ></audio>
        </div>
      </>
    );
}

export default App;
