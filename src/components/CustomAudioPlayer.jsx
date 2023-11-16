import { useRef } from 'react';
import { useStore } from '../store/GameStore';

export default function CustomAudioPlayer() {
  const audioRef = useRef();

  const { songsByAlbum, sortedNumber, duration, pausedTime, actions } =
    useStore();
  const { setDuration, setPausedTime } = actions;

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  console.log('duration', duration);
  console.log('pausedTime', pausedTime);

  return (
    <>
      <audio
        ref={audioRef}
        onPause={(e) => setPausedTime(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        sandbox="allow-same-origin"
        src={songsByAlbum[sortedNumber]?.previewUrl}
      ></audio>

      <button onClick={togglePlayPause}>Play/Pause</button>
    </>
  );
}
