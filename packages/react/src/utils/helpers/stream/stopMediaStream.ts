export const stopMediaStream = (stream: MediaStreamTrack | MediaStream) => {
  if (stream instanceof MediaStreamTrack) {
    stream.stop();
    return;
  }

  if (stream.getVideoTracks && stream.getAudioTracks) {
    stream.getVideoTracks().forEach((track) => {
      stream.removeTrack(track);
      track.stop();
    });
    stream.getAudioTracks().forEach((track) => {
      stream.removeTrack(track);
      track.stop();
    });

    return;
  }

  // ✅ important
  // If previous methods aren't supported by the browser
  if (stream.getTracks) {
    stream.getTracks().forEach((track) => {
      stream.removeTrack(track);
      track.stop();
    });
  }
};
