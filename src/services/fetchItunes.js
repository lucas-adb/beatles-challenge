export const AlbumsId = {
  pleasePleaseMe: '1441164816',
  withTheBeatles: '1441164362',
  aHardDaysNight: '1441164416',
  beatlesForSale: '1441165005',
  help: '1441164524',
  rubberSoul: '1441164359',
  revolver: '1441164670',
  sgtPeppersLonelyHeartsClubBand: '1573250333',
  magicalMysteryTour: '1441163490',
  theBeatlesWhiteAlbum: '1441133180',
  yellowSubmarine: '1441164525',
  abbeyRoad: '1441164426',
  letItBe: '1441164495',
};

// export async function getSongsFromAlbum(id) {
//   try {
//     const response = await fetch(
//       `https://itunes.apple.com/lookup?id=${id}&entity=song`
//     );
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     return { data: data };
//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// }

export async function getSongsFromAlbum(id) {
  try {
    const response = await fetch(`/api/lookup?id=${id}&entity=song`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { data: data };
  } catch (error) {
    console.error(error);
    return error;
  }
}
