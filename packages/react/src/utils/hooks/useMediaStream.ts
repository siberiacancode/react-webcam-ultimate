import { useEffect, useRef } from 'react';
import type { GetMediaStreamConstraintsParams, MediaTrackConstraintsOptions } from '@webcam/core';
import {
  applyMediaStreamConstraints,
  getMediaStream,
  getMediaStreamConstraints,
  stopMediaStream
} from '@webcam/core';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export interface UseMediaStreamParams extends MediaTrackConstraintsOptions {
  disable?: boolean;
  requestTimeLimit?: number;
  applyConstraints?: boolean;
  audioConstraints?: MediaTrackConstraints;
  videoConstraints?: MediaTrackConstraints;
  onStreamRequest?: () => void;
  onStreamError?: (error: Error) => void;
  onStreamStart?: (stream: MediaStream) => void;
  onStreamStop?: (stream?: MediaStream) => void;
}

/**
 * Returns and manages the media stream in accordance with the passed parameters for configuration
 *
 * @param {UseMediaStreamParams} params - parameters for receiving media stream
 * @return {MediaStream | undefined} media stream instance
 */
export const useMediaStream = ({
  onStreamRequest,
  onStreamError,
  onStreamStart,
  onStreamStop,
  disable,
  applyConstraints,
  requestTimeLimit,
  videoConstraints,
  audioConstraints,
  cameraResolutionMode,
  cameraResolutionType,
  frontCamera,
  mainCamera,
  muted
}: UseMediaStreamParams = {}) => {
  const streamRef = useRef<MediaStream>();
  const handlerRef = useRef({
    request: onStreamRequest,
    error: onStreamError,
    start: onStreamStart,
    stop: onStreamStop
  });

  useIsomorphicLayoutEffect(() => {
    handlerRef.current = {
      request: onStreamRequest,
      error: onStreamError,
      start: onStreamStart,
      stop: onStreamStop
    };
  }, [onStreamRequest, onStreamError, onStreamStart, onStreamStop]);

  useEffect(() => {
    if (disable) return;

    const streamConstraintsParams: GetMediaStreamConstraintsParams = {
      constraints: {
        video: videoConstraints,
        audio: audioConstraints
      },
      options: {
        cameraResolutionMode,
        cameraResolutionType,
        frontCamera,
        mainCamera,
        muted
      }
    };

    const requestMediaStream = async (params: GetMediaStreamConstraintsParams) => {
      try {
        handlerRef.current.request?.();

        const mediaStream = await getMediaStream(params, requestTimeLimit);

        handlerRef.current.start?.(mediaStream);
      } catch (error) {
        handlerRef.current.error?.(error as Error);
      }
    };

    const runningStream = streamRef.current;
    if (applyConstraints && runningStream) {
      getMediaStreamConstraints(streamConstraintsParams)
        .then((constraints) => applyMediaStreamConstraints(runningStream, constraints))
        .catch(() => requestMediaStream(streamConstraintsParams));
    } else {
      requestMediaStream(streamConstraintsParams);
    }

    return () => {
      handlerRef.current.stop?.(runningStream);
      stopMediaStream(runningStream);
    };
  }, [
    // STREAM PARAMS:
    disable,
    applyConstraints,
    requestTimeLimit,
    // DEFAULT CONSTRAINTS:
    videoConstraints,
    audioConstraints,
    // CUSTOM CONSTRAINTS:
    cameraResolutionMode,
    cameraResolutionType,
    frontCamera,
    mainCamera,
    muted
  ]);

  return streamRef.current;
};
