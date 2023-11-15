import { create } from 'zustand';
import { getRandomIntInclusive } from '../utils/getRandomIntInclusive';

export const useStore = create((set, get) => ({
  count: 1,
  songsByAlbum: [],
  sortedNumber: null,
  answer: '',
  playedTracksId: [],

  actions: {
    inc: () => set((state) => ({ count: state.count + 1 })),
    setSongsByAlbum: (songs) =>
      set(() => {
        const objFilteredByKind = songs.filter((song) => song.kind === 'song');
        return { songsByAlbum: objFilteredByKind };
      }),
    sortNumber: () =>
      set(() => {
        const { songsByAlbum } = get();
        return {
          sortedNumber: getRandomIntInclusive(0, songsByAlbum.length),
        };
      }),
    saveAnswer: (eventTargetValue) => set(() => ({ answer: eventTargetValue })),
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
  },
}));
