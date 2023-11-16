import { useRef, useState } from 'react';
import { useStore } from '../store/GameStore';

export default function CustomAudioPlayer() {
  const [duration, setDuration] = useState(0);
  const [pausedTime, setPausedTime] = useState(0);
  const audioRef = useRef();

  const { songsByAlbum, sortedNumber } = useStore();

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

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
