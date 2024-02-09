import type { GetVideoFrameCanvasOptions } from './getVideoFrameCanvas';
import { getVideoFrameCanvas } from './getVideoFrameCanvas';

export interface GetWebcamSnapshotOptions extends GetVideoFrameCanvasOptions {
  format?: 'image/webp' | 'image/png' | 'image/jpeg';
  quality?: number;
}

export const getWebcamSnapshot = (
  source: HTMLVideoElement,
  { format = 'image/jpeg', quality = 1, ...options }: GetWebcamSnapshotOptions = {}
) => {
  const canvas = getVideoFrameCanvas(source, options);
  if (!canvas) return;

  return canvas.toDataURL(format, quality);
};
