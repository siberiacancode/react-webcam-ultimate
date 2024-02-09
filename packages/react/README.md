# 📸 React Webcam Ultimate

Ultimate tool for working with media stream and displaying it in your React application

## Installation

Install with [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

```shell
npm i react-webcam-ultimate
# or
yarn add react-webcam-ultimate
```

## Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Webcam } from 'react-webcam-ultimate';

const App = () => (
  <Webcam />
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
```

### Get webcam snapshot

```jsx
import { Webcam } from 'react-webcam-ultimate';

const YourComponent = () => (
  <Webcam mirrored>
    {({ getSnapshot }) => (
      <button onClick={() => getSnapshot({ quality: 0.8 })}>
        Make photo
      </button>
    )}
  </Webcam>
);
```

## API

You can pass any supported [properties](https://developer.mozilla.org/ru/docs/Web/HTML/Element/video) to the underlying video tag (eg `autoplay`, `className`, etc). However, for convenience, the component uses its own values for these properties, but you can reassign them without any problems:
| **Prop**                  | **Type** | **Default**  |
| ------------------------- | -------- | ------------ |
| muted                     | boolean  | true         |
| autoPlay                  | boolean  | true         |
| playsInline               | boolean  | true         |
| controls                  | boolean  | false        |

The component also supports many properties for more specific work:
| **Prop**                  | **Type** | **Default**  | **Note**                                                                                |
| ------------------------- | -------- | ------------ | --------------------------------------------------------------------------------------- |
| stream                    | boolean  |              | external media stream (turns off internal media stream handling logic)                  |
| mirrored                  | boolean  | false        | show camera preview and get the screenshot mirrored                                     |
| mainCamera                | boolean  | false        | should use a main camera (requires Navigator.mediaDevices.enumerateDevices)             |
| frontCamera               | boolean  | false        | should use a front camera (MediaTrackConstraints['facingFront'] === 'user')             |
| applyConstraints          | boolean  | false        | should new constraints be applied to the media stream                                   |
| cameraResolutionType      | string   |              | video track resolution size - 'UHD' | 'QHD' | 'FHD' | 'HD'                              |
| cameraResolutionMode      | string   | 'ideal'      | video track resolution mode - 'min' | 'max' | 'ideal' | 'exact'                         |
| audioConstraints          | object   |              | audio track constraints - MediaStreamConstraints['audio']                               |
| videoConstraints          | object   |              | video track constraints - MediaStreamConstraints['video']                               |
| requestTimeLimit          | number   |              | limiting the media stream request by time                                               |
| onStreamRequest           | function |              | callback for when component requests a media stream                                     |
| onStreamStart             | function |              | callback for when component starts a media stream                                       |
| onStreamStop              | function |              | callback for when component stops a media stream                                        |
| onStreamError             | function |              | callback for when component can't receive a media stream                                |




