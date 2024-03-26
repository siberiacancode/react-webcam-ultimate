import type { GetMainCameraParams } from '../getMainCamera';
import { getMainCamera } from '../getMainCamera';

export type VideoResolutionSize = {
  width: number;
  height: number;
};

export type CameraResolutionType = 'HD' | 'FHD' | 'QHD' | 'UHD';
export type CameraResolutionMode = keyof ConstrainULongRange;

export const VIDEO_RESOLUTION_SIZE: Record<CameraResolutionType, VideoResolutionSize> = {
  UHD: {
    width: 3840,
    height: 2160
  },
  QHD: {
    width: 2560,
    height: 1440
  },
  FHD: {
    width: 1920,
    height: 1080
  },
  HD: {
    width: 1280,
    height: 720
  }
};

export interface VideoTrackConstraintsOptions {
  cameraResolutionMode?: CameraResolutionMode;
  cameraResolutionType?: CameraResolutionType;
  mainCamera?: GetMainCameraParams | boolean;
  frontCamera?: boolean;
}

/**
 * Generates and returns video track constraints by passed options
 *
 * @param {GetMediaStreamConstraintsParams} options - options for constraints generating
 * @return {Promise<MediaStreamConstraints>} video track constraints
 */
export const getVideoTrackConstraints = async (
  externalConstraints: MediaTrackConstraints,
  {
    mainCamera: useMainCamera,
    frontCamera: useFrontCamera,
    cameraResolutionType,
    cameraResolutionMode = 'ideal'
  }: VideoTrackConstraintsOptions
) => {
  const customConstraints: MediaTrackConstraints = {
    ...(cameraResolutionType && {
      width: {
        [cameraResolutionMode]: VIDEO_RESOLUTION_SIZE[cameraResolutionType].width
      },
      height: {
        [cameraResolutionMode]: VIDEO_RESOLUTION_SIZE[cameraResolutionType].height
      }
    })
  };

  if (useMainCamera) {
    const mainCamera = await getMainCamera(
      typeof useMainCamera === 'object' ? useMainCamera : undefined,
      useFrontCamera
    );

    if (mainCamera?.deviceId) {
      customConstraints.deviceId = { exact: mainCamera.deviceId };
    }
  }

  if (!customConstraints.deviceId && typeof useFrontCamera === 'boolean') {
    customConstraints.facingMode = useFrontCamera ? 'user' : 'environment';
  }

  const finalConstraints: MediaTrackConstraints = {
    ...customConstraints,
    ...externalConstraints
  };

  return finalConstraints;
};
