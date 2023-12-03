// import axios from 'axios';

export const AlbumsId = {
  pleasePleaseMe: '1441164816',
};

// export async function getSongsFromAlbum(id) {
//   try {
//     const response = await axios.get(
//       `https://itunes.apple.com/lookup?id=${id}&entity=song`
//     );
//     return response;
//   } catch (error) {
//     return error;
//   }
// }

export async function getSongsFromAlbum(id) {
  try {
    const response = await fetch(
      `https://itunes.apple.com/lookup?id=${id}&entity=song`
    );
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
