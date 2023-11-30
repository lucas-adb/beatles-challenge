import axios from 'axios';

export const AlbumsId = {
  pleasePleaseMe: '1441164816',
};

export async function getSongsFromAlbum(id) {
  try {
    const response = await axios.get(
      `https://itunes.apple.com/lookup?id=${id}&entity=song`
    );
    return response;
  } catch (error) {
    return error;
  }
}
