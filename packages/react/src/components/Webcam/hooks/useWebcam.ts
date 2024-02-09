import type { RefObject } from 'react';
import { useRef, useState } from 'react';

import type { UseMediaStreamParams } from '../../../utils/hooks';
import { useIsomorphicLayoutEffect, useMediaStream } from '../../../utils/hooks';

/**
 * Helps get/set the media stream source for a video element..
 *
 * @param {RefObject<HTMLVideoElement>} videoRef - video element reference object.
 * @param {UseMediaStreamParams} params - parameters for receiving media stream.
 * @return {string | undefined} media stream source.
 */
export const useWebcam = (
  videoRef: RefObject<HTMLVideoElement>,
  { onStreamStart, onStreamStop, ...params }: UseMediaStreamParams = {}
) => {
  const [streamSource, setStreamSource] = useState<string>();
  const handlerRef = useRef({
    start: onStreamStart,
    stop: onStreamStop
  });

  useIsomorphicLayoutEffect(() => {
    handlerRef.current = {
      start: onStreamStart,
      stop: onStreamStop
    };
  }, [onStreamStart, onStreamStop]);

  const handleStreamStart = (stream: MediaStream) => {
    handlerRef.current.start?.(stream);

    if (videoRef.current && 'srcObject' in videoRef.current) {
      // eslint-disable-next-line no-param-reassign
      videoRef.current.srcObject = stream;
      return;
    }

    // @ts-ignore
    setStreamSource(window.URL.createObjectURL(stream));
  };

  const handleStreamStop = (stream?: MediaStream) => {
    handlerRef.current.stop?.(stream);

    if (!streamSource) return;
    window.URL.revokeObjectURL(streamSource);
  };

  useMediaStream({
    onStreamStart: handleStreamStart,
    onStreamStop: handleStreamStop,
    ...params
  });

  return {
    start: handleStreamStart,
    stop: handleStreamStop,
    source: streamSource
  };
};
