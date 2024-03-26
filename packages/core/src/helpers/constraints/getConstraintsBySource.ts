import { getMediaTrackSources } from '../getMediaTrackSources';

const getOptionalSourceConstraints = (id?: string) => {
  if (!id) return;

  return { optional: [{ sourceId: id }] } as MediaTrackConstraints;
};

const getSourceIdByConstraints = (constraints?: MediaTrackConstraints | boolean) => {
  if (typeof constraints !== 'object') return;

  const { deviceId } = constraints;

  if (typeof deviceId === 'string') return deviceId;

  if (Array.isArray(deviceId)) return deviceId[0];

  if (typeof deviceId === 'object' && deviceId.ideal) {
    return Array.isArray(deviceId.ideal) ? deviceId.ideal[0] : deviceId.ideal;
  }
};

// ✅ important
// Deprecated web-api
export const getConstraintsBySource = async (constraints: MediaStreamConstraints) => {
  const result: MediaStreamConstraints = { video: undefined, audio: undefined };

  const sources = await getMediaTrackSources();
  if (!sources) return result;

  let videoSource: string | undefined;
  let audioSource: string | undefined;

  sources.forEach((source) => {
    if (source.kind === 'video') {
      videoSource = source.id;
      return;
    }

    if (source.kind === 'audio') {
      audioSource = source.id;
    }
  });

  const videoSourceId = getSourceIdByConstraints(constraints.video);
  const audioSourceId = getSourceIdByConstraints(constraints.audio);

  result.audio = getOptionalSourceConstraints(videoSourceId ?? videoSource);
  result.video = getOptionalSourceConstraints(audioSourceId ?? audioSource);

  return result;
};
