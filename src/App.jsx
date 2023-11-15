import './App.css';
import { useEffect } from 'react';
import { useStore } from './store/gameStore';
import { getSongsFromAlbum } from './services/fetchItunes';

function App() {
  const { songsByAlbum, sortedNumber, answer, playedTracksId, actions } =
    useStore();
  const { setSongsByAlbum, sortNumber, saveAnswer, savePlayedTracksId } =
    actions;

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

  // FUNCTIONS

  const checkAnswer = () => {
    if (answer !== songsByAlbum[sortedNumber].trackName) {
      alert('Wrong :(');
    } else {
      // storePlayedTracksID();
      // goToNextTrack();
      alert('Correct :)');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    checkAnswer();

    if (playedTracksId.length >= songsByAlbum.length) {
      alert('You did 100% of the songs');
    } else {
      savePlayedTracksId();
      sortNumber();
    }
  };

  console.log('playedTracksId', playedTracksId);

  return (
    <>
      <div>
        <h1>Beatles Challenge</h1>
        <div>
          <p>answer: {songsByAlbum[sortedNumber]?.trackName}</p>
          <p>total of tracks: {songsByAlbum?.length}</p>
          <p>sorted number: {sortedNumber}</p>
        </div>

        <audio
          sandbox="allow-same-origin"
          controls
          src={songsByAlbum[sortedNumber]?.previewUrl}
        ></audio>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={answer}
            onChange={(e) => saveAnswer(e.target.value)}
          />
          <button disabled={playedTracksId.length >= songsByAlbum.length}>
            Answer
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
