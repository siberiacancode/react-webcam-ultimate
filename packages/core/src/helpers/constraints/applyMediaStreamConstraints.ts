/**
 * Applies a set of audio and video constraints to the corresponding media stream tracks
 *
 * @return {Promise<void>}
 */
export const applyMediaStreamConstraints = async (
  stream: MediaStream,
  { video, audio }: MediaStreamConstraints
) => {
  const [videoTrack] = stream.getVideoTracks();
  if (videoTrack) {
    await videoTrack.applyConstraints(typeof video === 'object' ? video : {});
  }

  const [audioTrack] = stream.getAudioTracks();
  if (audioTrack) {
    await audioTrack.applyConstraints(typeof audio === 'object' ? audio : {});
  }
};
