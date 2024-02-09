interface Navigator {
  getUserMedia?: (
    options: MediaStreamConstraints,
    success: (stream: MediaStream) => void,
    error: (exception: DOMException) => void
  ) => Promise<MediaStream>;
  webkitGetUserMedia?: Navigator['getUserMedia'];
  mozGetUserMedia?: Navigator['getUserMedia'];
  msGetUserMedia?: Navigator['getUserMedia'];
}

interface MediaTrackSource {
  readonly id: string;
  readonly kind: string;
  readonly label: string;
}

interface Window {
  msRequestAnimationFrame?: Window['requestAnimationFrame'];
  mozRequestAnimationFrame?: Window['requestAnimationFrame'];
  webkitRequestAnimationFrame?: Window['requestAnimationFrame'];
  msCancelAnimationFrame?: Window['cancelAnimationFrame'];
  mozCancelAnimationFrame?: Window['cancelAnimationFrame'];
  webkitCancelAnimationFrame?: Window['cancelAnimationFrame'];
}
