import { useEffect, useState } from 'react';
import { AlbumsId, getSongsFromAlbum } from './services/fetchItunes';
import { getRandomIntInclusive } from './utils/getRandomIntInclusive';
import './App.css';

function App() {
  const [error, setError] = useState(null);
  const [sortedNumber, setSortedNumber] = useState(null);
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [answer, setAnswer] = useState('');
  const [playedTracksId, setPlayedTracksId] = useState([]);

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

          const newTracks = result.results.filter(
            (track) => track.kind === 'song'
          );

          setTracks(() => {
            return [...newTracks];
          });

          // setSortedNumber(getRandomIntInclusive(0, newTracks.length));
          setSortedNumber(() => getRandomIntInclusive(0, newTracks.length));
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

  const goToNextTrack = (playedTracksId = []) => {
    const newTracks = tracks.filter((t) => !playedTracksId.includes(t.trackId));
    setTracks(() => {
      return [...newTracks];
    });
    // setSortedNumber(getRandomIntInclusive(0, newTracks.length - 1));
    setSortedNumber(() => getRandomIntInclusive(0, newTracks.length - 1));
  };

  const storePlayedTracksID = () => {
    setPlayedTracksId((prevTracks) => {
      const newPlayedTracksId = [...prevTracks, tracks[sortedNumber].trackId];
      goToNextTrack(newPlayedTracksId);
      return newPlayedTracksId;
    });
  };

  const checkAnswer = () => {
    if (answer !== tracks[sortedNumber].trackName) {
      alert('Wrong :(');
    } else {
      storePlayedTracksID();
      goToNextTrack();
      alert('Correct :)');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // storePlayedTracksID();
    checkAnswer();
  };

  if (error) return <h1>Something bad happened...</h1>;

  if (!album) return <h1>Loading...</h1>;

  if (tracks && sortedNumber < tracks.length)
    return (
      <>
        <div>
          <h1>One-Second Guessing Challenge</h1>
          <h2>The Beatles Edition</h2>

          <p>sorted: {sortedNumber}</p>

          <p>track name: {tracks[sortedNumber].trackName}</p>

          <p>total of tracks: {tracks.length}</p>

          <audio
            sandbox="allow-same-origin"
            controls
            src={tracks[sortedNumber].previewUrl}
          ></audio>

          <p>Guess the song</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button>Answer</button>
          </form>
        </div>
      </>
    );
}

export default App;
