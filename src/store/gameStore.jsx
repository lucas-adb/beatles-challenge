import { create } from 'zustand';

export const useStore = create((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),

  songsByAlbum: [],
  // setSongsByAlbum: (songs) => set(() => ({ songsByAlbum: songs })),

  setSongsByAlbum: (songs) =>
    set(() => {
      const objFilteredByKind = songs.filter((song) => song.kind === 'song');
      return { songsByAlbum: objFilteredByKind };
    }),
}));
