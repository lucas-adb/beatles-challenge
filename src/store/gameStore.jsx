import { create } from 'zustand';
import { getRandomIntInclusive } from '../utils/getRandomIntInclusive';
import { excludeUsedRandomNumber } from '../utils/excludeUsedRandomNumber';

export const useStore = create((set, get) => ({
  songsByAlbum: [],
  sortedNumber: null,
  answer: '',
  playedTracksId: [],
  duration: 0,
  pausedTime: 0,
  score: 0,
  nameOfTheSongs: [],
  isAnswerCorrect: null,
  isPlayBtnClicked: false,
  isComboBoxDisabled: false,

  actions: {
    setSongsByAlbum: (songs) =>
      set(() => {
        const objFilteredByKind = songs.filter((song) => song.kind === 'song');
        return { songsByAlbum: objFilteredByKind };
      }),
    setSortedNumber: () =>
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
    setAnswer: (eventTargetValue) => set(() => ({ answer: eventTargetValue })),
    eraseAnswer: () => set(() => ({ answer: '' })),
    setPlayedTracksId: () =>
      set((state) => {
        const { songsByAlbum, sortedNumber } = get();
        return {
          playedTracksId: [
            ...state.playedTracksId,
            songsByAlbum[sortedNumber].trackId,
          ],
        };
      }),
    resetPlayedTracksId: () => set(() => ({ playedTracksId: [] })),
    setPausedTime: (currentTime = 0) =>
      set(() => ({ pausedTime: currentTime })),
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
    setScoreToZero: () => set(() => ({ score: 0 })),
    setNameOfTheSongs: (songs) =>
      set(() => {
        const objFilteredByKind = songs.filter((song) => song.kind === 'song');
        const songNames = objFilteredByKind.map((song) => song.trackName);
        return { nameOfTheSongs: songNames };
      }),
    setIsAnswerCorrect: (boolean = null) =>
      set(() => ({ isAnswerCorrect: boolean })),
    setIsPlayBtnClicked: (boolean) =>
      set(() => ({ isPlayBtnClicked: boolean })),
    setIsComboBoxDisabled: () => {
      const { isComboBoxDisabled } = get();
      set(() => ({ isComboBoxDisabled: !isComboBoxDisabled }));
    },
  },
}));
