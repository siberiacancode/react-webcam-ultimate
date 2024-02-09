import { generateRollupConfig } from '@siberiacancode/builder';

const pkg = require('./package.json');

export default generateRollupConfig({
  pkg,
  configs: {
    babel: {
      presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      plugins: ['react-require', '@babel/plugin-transform-runtime'],
      babelHelpers: 'runtime'
    }
  }
});
