export const AlbumsId = {
  pleasePleaseMe: '1441164816', 
}

export async function getSongsFromAlbum(id) {
  const fetchUrl = `https://itunes.apple.com/lookup?id=${id}&entity=song`
  const response = await fetch(fetchUrl);
  const data = await response.json();
  console.log(data);
  return data;
}