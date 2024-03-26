export type GetMainCameraParams = RegExp | { front?: RegExp; back?: RegExp };

export const DEFAULT_MAIN_CAMERA_REG_EXP = {
  back: /(?=.*\bback\b)(?=.*\b0\b)/,
  front: /\bfront\b/
};

/**
 * Returns MediaDeviceInfo in accordance with the default or passed parameters
 *
 * @param {GetMainCameraParams} params - pattern for searching the main camera device info by its label
 * @param {boolean} isFrontCamera - should the front camera be searched (back by default)
 * @return {MediaDeviceInfo | undefined} main camera device info
 */
export const getMainCamera = async (params?: GetMainCameraParams, isFrontCamera?: boolean) => {
  if (!('mediaDevices' in navigator && navigator.mediaDevices.enumerateDevices)) return;

  const mediaDevices = await navigator.mediaDevices.enumerateDevices();
  const cameras = mediaDevices.filter(({ kind }) => kind === 'videoinput');

  if (cameras.length <= 2) return;

  let regExp: RegExp | undefined;
  const cameraKey = isFrontCamera ? 'front' : 'back';

  if (typeof params === 'object') {
    regExp = params instanceof RegExp ? params : params[cameraKey];
  }

  return cameras.find(({ label }) =>
    (regExp ?? DEFAULT_MAIN_CAMERA_REG_EXP[cameraKey]).test(label)
  );
};
