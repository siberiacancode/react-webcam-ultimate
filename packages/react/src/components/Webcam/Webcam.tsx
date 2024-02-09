import type { ComponentPropsWithoutRef, FC, ReactNode, RefObject, SyntheticEvent } from 'react';
import React, { useEffect, useRef } from 'react';

import type { UseMediaStreamParams } from '../../utils/hooks';

import type { GetVideoFrameCanvasOptions, GetWebcamSnapshotOptions } from './helpers';
import { getVideoFrameCanvas, getWebcamSnapshot } from './helpers';
import { useWebcam } from './hooks';

type VideoElementProps = Omit<ComponentPropsWithoutRef<'video'>, 'children'>;
type AvailableUseMediaStreamParams = Omit<UseMediaStreamParams, 'disable'>;

export type WebcamRenderProps = (options: {
  getCanvas: (options?: GetVideoFrameCanvasOptions) => HTMLCanvasElement | undefined;
  getSnapshot: (options?: GetWebcamSnapshotOptions) => string | undefined;
  videoElement: HTMLVideoElement | null;
}) => ReactNode;

interface BaseWebcamProps extends VideoElementProps {
  children?: ReactNode | WebcamRenderProps;
  innerRef?: RefObject<HTMLVideoElement>;
  mirrored?: boolean;
}

interface WebcamPropsWithInternalStream extends BaseWebcamProps, AvailableUseMediaStreamParams {
  stream?: undefined;
}

interface WebcamPropsWithExternalStream extends BaseWebcamProps {
  stream?: MediaStream;
}

type WebcamPropsEnumeration = WebcamPropsWithExternalStream &
  Omit<WebcamPropsWithInternalStream, 'stream'>;

export type WebcamProps = WebcamPropsWithInternalStream | WebcamPropsWithExternalStream;

/**
 * Renders the Webcam component and handles the requesting and displaying of the media stream.
 *
 * @param {WebcamProps} props - The props for the Webcam component.
 * @return {ReactElement} The rendered Webcam component.
 */
export const Webcam: FC<WebcamProps> = ({
  innerRef: externalVideoRef,
  stream: externalStream,
  cameraResolutionMode,
  cameraResolutionType,
  videoConstraints,
  audioConstraints,
  requestTimeLimit,
  applyConstraints,
  frontCamera,
  mainCamera,
  mirrored = true,
  muted = true,
  style = {},
  children,
  onLoadedMetadata,
  onStreamRequest,
  onStreamError,
  onStreamStart,
  onStreamStop,
  ...props
}: WebcamPropsEnumeration) => {
  const internalVideoRef = useRef<HTMLVideoElement | null>(null);
  const videoRef = externalVideoRef ?? internalVideoRef;

  const onMediaStreamLoad = (event: SyntheticEvent<HTMLVideoElement, Event>) => {
    onLoadedMetadata?.(event);
    event.currentTarget.play();
  };

  const stream = useWebcam(
    videoRef,
    !externalStream
      ? {
          // STREAM PARAMS:
          applyConstraints,
          requestTimeLimit,
          // STREAM HANDLERS:
          onStreamRequest,
          onStreamError,
          onStreamStart,
          onStreamStop,
          // DEFAULT CONSTRAINTS:
          videoConstraints,
          audioConstraints,
          // CUSTOM CONSTRAINTS:
          cameraResolutionMode,
          cameraResolutionType,
          frontCamera,
          mainCamera,
          muted
        }
      : {
          disable: true
        }
  );

  useEffect(() => {
    if (!externalStream) return;

    stream.start(externalStream);

    return () => {
      stream.stop(externalStream);
    };
  }, [externalStream]);

  return (
    <>
      <video
        autoPlay
        playsInline
        muted={muted}
        ref={videoRef}
        controls={false}
        src={stream.source}
        onLoadedMetadata={onMediaStreamLoad}
        style={{
          ...style,
          ...(mirrored && {
            transform: `${style.transform ? `${style.transform} ` : ''}scaleX(-1)`
          })
        }}
        {...props}
      />
      {typeof children === 'function'
        ? children({
            videoElement: videoRef.current,
            getCanvas: (options?: GetVideoFrameCanvasOptions) =>
              videoRef.current
                ? getVideoFrameCanvas(videoRef.current, { ...options, mirrored })
                : undefined,
            getSnapshot: (options?: GetWebcamSnapshotOptions) =>
              videoRef.current
                ? getWebcamSnapshot(videoRef.current, { ...options, mirrored })
                : undefined
          })
        : children}
    </>
  );
};
