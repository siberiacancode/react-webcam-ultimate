import { getUserMediaFunction } from './getUserMedia';
import { hasGetUserMedia } from './hasGetUserMedia';

/**
 * Checks the possibility of using any implementation of getUserMedia
 *
 * @return {boolean}
 */
export const canGetUserMedia = () => {
  if (typeof navigator === 'undefined') return false;

  if (!hasGetUserMedia()) {
    return !!getUserMediaFunction;
  }

  return !!navigator.mediaDevices.getUserMedia;
};
