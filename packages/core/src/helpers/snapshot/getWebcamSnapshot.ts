import type { GetVideoFrameCanvasOptions } from './getVideoFrameCanvas';
import { getVideoFrameCanvas } from './getVideoFrameCanvas';

export interface GetWebcamSnapshotOptions extends GetVideoFrameCanvasOptions {
  format?: 'image/webp' | 'image/png' | 'image/jpeg';
  quality?: number;
}

/**
 * Returns a base64 encoded string of the current video stream frame in the specified format and quality
 *
 * @param {HTMLVideoElement} source - video element instance with provided media stream
 * @param {GetWebcamSnapshotOptions} options - options for getting webcam snapshot
 * @return {string | undefined} media stream source
 */
export const getWebcamSnapshot = (
  source: HTMLVideoElement,
  { format = 'image/jpeg', quality = 1, ...options }: GetWebcamSnapshotOptions = {}
) => {
  const canvas = getVideoFrameCanvas(source, options);
  if (!canvas) return;

  return canvas.toDataURL(format, quality);
};
