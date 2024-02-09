export const hasGetUserMedia = () =>
  !!('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia);
