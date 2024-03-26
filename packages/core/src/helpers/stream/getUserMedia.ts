import { hasGetUserMedia } from './hasGetUserMedia';

/**
 * Legacy per-browser implementation of Navigator.getUserMedia
 *
 * @return {Navigator['getUserMedia'] | undefined}
 */
export const getUserMediaFunction =
  typeof window !== 'undefined' &&
  (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

/**
 * Adds extra error handling and support for legacy getUserMedia implementation
 *
 * @return {Promise<MediaStream>}
 */
export const getUserMedia = (constraints: MediaStreamConstraints): Promise<MediaStream> => {
  if (!hasGetUserMedia()) {
    if (!getUserMediaFunction) {
      return Promise.reject(
        new Error('Method getUserMedia of Navigator is not implemented in this browser')
      );
    }

    return new Promise((resolve, reject) => {
      getUserMediaFunction.call(navigator, constraints, resolve, reject);
    });
  }

  return navigator.mediaDevices.getUserMedia(constraints);
};
