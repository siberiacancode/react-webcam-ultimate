import { getUserMediaFunction } from './getUserMedia';
import { hasGetUserMedia } from './hasGetUserMedia';

// ✅ important
// In mobile browser work only for https://
export const canGetUserMedia = () => {
  if (typeof navigator === 'undefined') return false;

  if (!hasGetUserMedia()) {
    return !!getUserMediaFunction;
  }

  return !!navigator.mediaDevices.getUserMedia;
};
