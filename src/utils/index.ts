export function formatTime(time: number): string {
  const timeInMiliseconds = time / 1000;
  const hours = Math.floor(timeInMiliseconds);
  const minutes = Math.floor((timeInMiliseconds - hours) * 60);
  const seconds = Math.floor(((timeInMiliseconds - hours) * 60 - minutes) * 60);

  return `${hours < 10 ? '0' + hours : hours}:${
    minutes < 10 ? '0' + minutes : minutes
  }:${seconds < 10 ? '0' + seconds : seconds}`;
}
