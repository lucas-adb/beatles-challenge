import { useEffect, useRef } from 'react';
import { useStore } from '../store/GameStore';
import IconButton from '@mui/material/IconButton';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import StopCircleIcon from '@mui/icons-material/StopCircle';

export default function CustomAudioPlayer() {
  const audioRef = useRef();
  const buttonRef = useRef();

  const { songsByAlbum, sortedNumber, isPlayBtnClicked, actions } = useStore();
  const { setDuration, setPausedTime, setIsPlayBtnClicked } = actions;

  const togglePlayPause = () => {
    const audio = audioRef.current;
    setIsPlayBtnClicked(!isPlayBtnClicked);
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  useEffect(() => {
    const handleSpacebarPress = (event) => {
      if (event.code === 'Space') {
        buttonRef.current.click();
      }
    };

    window.addEventListener('keydown', handleSpacebarPress);

    return () => {
      window.removeEventListener('keydown', handleSpacebarPress);
    };
  }, []);

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
        ref={buttonRef}
        aria-label="play-stop"
        sx={{ width: 140, margin: '0 auto' }}
        onClick={togglePlayPause}
      >
        {isPlayBtnClicked ? (
          <StopCircleIcon fontSize="large" sx={{ fontSize: 140 }} />
        ) : (
          <PlayCircleFilledIcon sx={{ fontSize: 140 }} />
        )}
      </IconButton>
    </>
  );
}
