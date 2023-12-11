import { useEffect } from 'react';
import { useStore } from '../store/GameStore';
import { getSongsFromAlbum } from '../services/fetchItunes';
import CustomAudioPlayer from '../components/CustomAudioPlayer';
import GuessForm from '../components/GuessForm';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ShowAnswer from '../components/ShowAnswer';
import NextBtn from '../components/NextBtn';
import RestartBtn from '../components/RestartBtn';
import BoxScore from '../components/BoxScore';

function Game() {
  const { actions } = useStore();
  const { setSongsByAlbum, setSortedNumber, setNameOfTheSongs } = actions;

  useEffect(() => {
    let ignore = false;
    getSongsFromAlbum('1441164816')
      .then((response) => {
        if (!ignore) {
          setSongsByAlbum(response.data.results);
          setNameOfTheSongs(response.data.results);
          setSortedNumber();
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
  }, [setSongsByAlbum, setSortedNumber, setNameOfTheSongs]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          textAlign: 'center',
        }}
      >
        <BoxScore />

        <ShowAnswer />

        <CustomAudioPlayer />

        <GuessForm />

        <NextBtn />

        <RestartBtn />
      </Box>
    </Container>
  );
}

export default Game;
