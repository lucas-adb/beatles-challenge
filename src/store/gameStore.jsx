import { create } from 'zustand';
import { getRandomIntInclusive } from '../utils/getRandomIntInclusive';
import { excludeUsedRandomNumber } from '../utils/excludeUsedRandomNumber';

export const useStore = create((set, get) => ({
  count: 1,
  songsByAlbum: [],
  sortedNumber: null,
  answer: '',
  playedTracksId: [],
  duration: 0,
  pausedTime: 0,
  score: 0,
  nameOfTheSongs: [],

  actions: {
    inc: () => set((state) => ({ count: state.count + 1 })),
    setSongsByAlbum: (songs) =>
      set(() => {
        const objFilteredByKind = songs.filter((song) => song.kind === 'song');
        return { songsByAlbum: objFilteredByKind };
      }),
    sortNumber: () =>
      set(() => {
        const { songsByAlbum, playedTracksId, sortedNumber } = get();

        if (playedTracksId.length > 0) {
          return {
            sortedNumber: excludeUsedRandomNumber(
              playedTracksId,
              songsByAlbum,
              sortedNumber
            ),
          };
        }

        return {
          sortedNumber: getRandomIntInclusive(0, songsByAlbum.length - 1),
        };
      }),
    saveAnswer: (eventTargetValue) => set(() => ({ answer: eventTargetValue })),
    eraseAnswer: () => set(() => ({ answer: '' })),
    savePlayedTracksId: () =>
      set((state) => {
        const { songsByAlbum, sortedNumber } = get();
        return {
          playedTracksId: [
            ...state.playedTracksId,
            songsByAlbum[sortedNumber].trackId,
          ],
        };
      }),
    setPausedTime: (currentTime) => set(() => ({ pausedTime: currentTime })),
    setDuration: (duration) => set(() => ({ duration })),
    setScore: () =>
      set((state) => {
        const { duration, pausedTime } = get();
        const sum = (duration - pausedTime) * 100;
        const score = parseInt(sum.toFixed(0), 10);
        return {
          score: state.score + score,
        };
      }),
    setNameOfTheSongs: (songs) =>
      set(() => {
        const objFilteredByKind = songs.filter((song) => song.kind === 'song');
        const songNames = objFilteredByKind.map((song) => song.trackName);
        return { nameOfTheSongs: songNames };
      }),
  },
}));
