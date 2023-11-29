import { useCallback, useEffect, useRef } from 'react';
import { useStore } from '../store/GameStore';
import IconButton from '@mui/material/IconButton';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import StopCircleIcon from '@mui/icons-material/StopCircle';

export default function CustomAudioPlayer() {
  const audioRef = useRef();

  const { songsByAlbum, sortedNumber, isPlayBtnClicked, actions } = useStore();
  const { setDuration, setPausedTime, setIsPlayBtnClicked } = actions;

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    setIsPlayBtnClicked((prevIsPlayBtnClicked) => !prevIsPlayBtnClicked);
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [setIsPlayBtnClicked]);

  useEffect(() => {
    const handleSpacebarPress = (event) => {
      if (event.code === 'Space') {
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleSpacebarPress);

    return () => {
      window.removeEventListener('keydown', handleSpacebarPress);
    };
  }, [togglePlayPause]);

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
        {isPlayBtnClicked ? (
          <StopCircleIcon fontSize="large" sx={{ fontSize: 140 }} />
        ) : (
          <PlayCircleFilledIcon sx={{ fontSize: 140 }} />
        )}
      </IconButton>
    </>
  );
}
