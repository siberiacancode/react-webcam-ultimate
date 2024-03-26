/**
 * Checks for the presence of getUserMedia in Navigator.MediaDevices
 *
 * @return {boolean}
 */
export const hasGetUserMedia = () =>
  !!('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia);
