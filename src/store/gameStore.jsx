import { create } from 'zustand';
import { getRandomIntInclusive } from '../utils/getRandomIntInclusive';

export const useStore = create((set, get) => ({
  count: 1,
  songsByAlbum: [],
  sortedNumber: null,

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
  },
}));
