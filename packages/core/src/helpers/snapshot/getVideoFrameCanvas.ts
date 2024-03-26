export interface GetVideoFrameCanvasOptions {
  imageSmoothingEnabled?: boolean;
  mirrored?: boolean;
  height?: number;
  width?: number;
}

/**
 * Returns a canvas with a drawn image of the current video stream frame in accordance with the passed options
 *
 * @param {HTMLVideoElement} source - video element instance with provided media stream
 * @param {GetVideoFrameCanvasOptions} options - options for getting video frame canvas
 * @return {HTMLCanvasElement | undefined} video stream frame canvas
 */
export const getVideoFrameCanvas = (
  source: HTMLVideoElement,
  { imageSmoothingEnabled = true, mirrored, ...options }: GetVideoFrameCanvasOptions = {}
) => {
  const { videoWidth: canvasWidth, videoHeight: canvasHeight } = source;

  const canvas = document.createElement('canvas');
  canvas.width = options.width ?? canvasWidth;
  canvas.height = options.height ?? canvasHeight;

  const context = canvas.getContext('2d');
  if (!context) return;

  if (mirrored) {
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
  }

  context.imageSmoothingEnabled = imageSmoothingEnabled;
  context.drawImage(source, 0, 0, canvas.width, canvas.height);

  if (mirrored) {
    context.scale(-1, 1);
    context.translate(-canvas.width, 0);
  }

  return canvas;
};
