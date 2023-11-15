import { getRandomIntInclusive } from './getRandomIntInclusive';

export function excludeUsedRandomNumber(tracksIds, songs) {
  const newRandomNumber = getRandomIntInclusive(0, songs.length - 1);

  if (tracksIds.includes(songs[newRandomNumber].trackId)) {
    return excludeUsedRandomNumber(tracksIds, songs);
  } else {
    return newRandomNumber;
  }
}