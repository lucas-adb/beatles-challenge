import { useRef, useState } from 'react';
import { useStore } from '../store/GameStore';
import IconButton from '@mui/material/IconButton';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import StopCircleIcon from '@mui/icons-material/StopCircle';

export default function CustomAudioPlayer() {
  const audioRef = useRef();

  const { songsByAlbum, sortedNumber, actions } = useStore();
  const { setDuration, setPausedTime } = actions;

  const [clicked, setClicked] = useState(false);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    setClicked(!clicked);
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

      <IconButton
        aria-label="play-stop"
        sx={{ width: 140, margin: '0 auto' }}
        onClick={togglePlayPause}
      >
        {clicked ? (
          <StopCircleIcon fontSize="large" sx={{ fontSize: 140 }} />
        ) : (
          <PlayCircleFilledIcon sx={{ fontSize: 140 }} />
        )}
      </IconButton>
    </>
  );
}
