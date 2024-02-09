import type { StoryObj, Meta } from '@storybook/react';
import React from 'react';

import { Webcam } from '../../src/components/Webcam/Webcam';

type Story = StoryObj<typeof Webcam>;
const WebcamTemplate: Story = {
  render: (args) => <Webcam {...args} />
};

export const Playground = {
  ...WebcamTemplate
};

export default {
  component: Webcam,
  title: 'webcam'
} as Meta<typeof Webcam>;
