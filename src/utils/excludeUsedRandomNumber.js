import { getRandomIntInclusive } from './getRandomIntInclusive';

export function excludeUsedRandomNumber(tracksIds, songs, prevRandomNumber) {
  if (tracksIds.length >= songs.length) {
    return prevRandomNumber;
  }

  let newRandomNumber;
  do {
    newRandomNumber = getRandomIntInclusive(0, songs.length - 1);
  } while (tracksIds.includes(songs[newRandomNumber].trackId));

  return newRandomNumber;
}
