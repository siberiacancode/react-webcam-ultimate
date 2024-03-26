export const getMediaTrackSources = () =>
  new Promise<MediaTrackSource[] | undefined>((resolve) => {
    if ('getSources' in MediaStreamTrack) {
      // @ts-ignore
      MediaStreamTrack.getSources(resolve);
      return;
    }

    resolve(undefined);
  });
