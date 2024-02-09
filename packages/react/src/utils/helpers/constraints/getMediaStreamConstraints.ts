import { getConstraintsBySource } from './getConstraintsBySource';
import type { VideoTrackConstraintsOptions } from './getVideoTrackConstraints';
import { getVideoTrackConstraints } from './getVideoTrackConstraints';

export interface MediaTrackConstraintsOptions extends VideoTrackConstraintsOptions {
  muted?: boolean;
}

export interface GetMediaStreamConstraintsParams {
  options?: MediaTrackConstraintsOptions;
  constraints?: MediaStreamConstraints;
}

export const getMediaStreamConstraints = async ({
  constraints: { video = true, audio = false, ...otherConstraints } = {},
  options: { muted = true, ...options } = {}
}: GetMediaStreamConstraintsParams = {}) => {
  let videoConstraints: MediaStreamConstraints['video'];
  let audioConstraints: MediaStreamConstraints['audio'];

  if ('mediaDevices' in navigator) {
    audioConstraints = audio;

    if (video) {
      videoConstraints = await getVideoTrackConstraints(
        typeof video === 'object' ? video : {},
        options
      );
    }
  } else {
    const constraintsBySource = await getConstraintsBySource({ video, audio });
    audioConstraints = constraintsBySource.audio;
    videoConstraints = constraintsBySource.video;
  }

  const finalConstraints: MediaStreamConstraints = {
    ...otherConstraints,
    ...(!muted && {
      audio: typeof audioConstraints !== 'undefined' ? audioConstraints : true
    }),
    video: typeof videoConstraints !== 'undefined' ? videoConstraints : true
  };

  return finalConstraints;
};
