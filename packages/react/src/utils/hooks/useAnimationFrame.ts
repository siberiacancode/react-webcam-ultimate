import { useEffect, useRef } from 'react';

import { cancelAnimationFrame, requestAnimationFrame } from '../helpers';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/**
 * Helps request and cancel animation frame
 *
 * @param {Function} callback - frame request callback
 * @param {boolean} active - should animation frame be requested
 * @return {Object} request/cancel animation frame handlers
 */
export const useAnimationFrame = (callback: (time: number) => void, active?: boolean) => {
  const animationFrameRequestRef = useRef<number>();
  const previousTimestampRef = useRef<number>();
  const savedHandlerRef = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    savedHandlerRef.current = callback;
  }, [callback]);

  const onFrameRequest = (timestamp?: DOMHighResTimeStamp) => {
    if (timestamp) {
      previousTimestampRef.current = timestamp;
      if (typeof previousTimestampRef.current === 'undefined') return;
      savedHandlerRef.current(timestamp - previousTimestampRef.current);
    }

    animationFrameRequestRef.current = requestAnimationFrame(onFrameRequest);
  };

  const onFrameCancel = () => {
    if (!animationFrameRequestRef.current) return;
    cancelAnimationFrame(animationFrameRequestRef.current);
  };

  useEffect(() => {
    if (active) {
      animationFrameRequestRef.current = requestAnimationFrame(onFrameRequest);
      return;
    }

    onFrameCancel();
    return () => onFrameCancel();
  }, [active]);

  return {
    request: onFrameRequest,
    cancel: onFrameCancel
  };
};
