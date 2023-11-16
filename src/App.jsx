import './App.css';
// import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useStore } from './store/GameStore';
import { getSongsFromAlbum } from './services/fetchItunes';
import CustomAudioPlayer from './components/CustomAudioPlayer';

function App() {
  const { songsByAlbum, sortedNumber, answer, playedTracksId, actions } =
    useStore();
  const { setSongsByAlbum, sortNumber, saveAnswer, savePlayedTracksId } =
    actions;

  // const [duration, setDuration] = useState(0);
  // const [pausedTime, setPausedTime] = useState(0);

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
      alert("That's Wrong");
    } else if (playedTracksId.length >= songsByAlbum.length - 1) {
      alert('Wow, you guessed 100% of the songs. Amazing!');
      savePlayedTracksId();
    } else {
      alert("That's Right!");
      savePlayedTracksId();
      sortNumber();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    checkAnswer();
  };

  console.log('playedTracksId', playedTracksId);

  // AUDIO CUSTOMIZATION

  // const audioRef = useRef();

  // const togglePlayPause = () => {
  //   const audio = audioRef.current;
  //   if (audio.paused) {
  //     audio.play();
  //   } else {
  //     audio.pause();
  //   }
  // };

  return (
    <>
      <div>
        <h1>Beatles Challenge</h1>
        <div>
          <p>answer: {songsByAlbum[sortedNumber]?.trackName}</p>
          <p>total of tracks: {songsByAlbum?.length}</p>
          <p>sorted number: {sortedNumber}</p>
        </div>

        <CustomAudioPlayer />

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
