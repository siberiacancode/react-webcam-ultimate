export const applyMediaStreamConstraints = (
  stream: MediaStream,
  { video, audio }: MediaStreamConstraints
) => {
  const [videoTrack] = stream.getVideoTracks();
  if (videoTrack) {
    videoTrack.applyConstraints(typeof video === 'object' ? video : {});
  }

  const [audioTrack] = stream.getAudioTracks();
  if (audioTrack) {
    audioTrack.applyConstraints(typeof audio === 'object' ? audio : {});
  }
};
