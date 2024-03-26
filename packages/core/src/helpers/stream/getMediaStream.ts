import type { GetMediaStreamConstraintsParams } from '../constraints';
import { getMediaStreamConstraints } from '../constraints';

import { canGetUserMedia } from './canGetUserMedia';
import { getUserMedia } from './getUserMedia';

/**
 * Accepts custom parameters and uses getUserMedia to get an instance of the media stream
 *
 * @param {GetMediaStreamConstraintsParams} params - options for constraints generating
 * @param {GetMediaStreamConstraintsParams} timeLimitMs - Time limit for MediaStream request execution
 * @return {Promise<MediaStream>} media stream instance
 */
export const getMediaStream = async (
  params?: GetMediaStreamConstraintsParams,
  timeLimitMs?: number
): Promise<MediaStream> => {
  if (!canGetUserMedia()) {
    throw new Error('Method getUserMedia of Navigator is not supported');
  }

  let mediaStream: MediaStream | undefined;
  const mediaStreamConstraints = await getMediaStreamConstraints(params);

  if (timeLimitMs) {
    mediaStream = await new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('User media request has reached the specified time limit'));
      }, timeLimitMs);

      getUserMedia(mediaStreamConstraints)
        .then((result) => {
          clearTimeout(timer);
          return resolve(result);
        })
        .catch((error) => {
          clearTimeout(timer);
          reject(error);
        });
    });
  } else {
    mediaStream = await getUserMedia(mediaStreamConstraints);
  }

  if (!mediaStream) {
    throw new Error('Stream of media content was not found');
  }

  return mediaStream;
};
