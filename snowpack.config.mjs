/** @type {import('snowpack').SnowpackUserConfig } */
import rollupPluginNodePolyfills from 'rollup-plugin-node-polyfills';

export default {
  env: {
    DISCOVERY_DOCS: [
      'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest',
    ],
    SCOPES: 'https://www.googleapis.com/auth/tasks',
  },
  mount: {
    public: {
      url: '/',
      static: true
    },
    src: { url: '/dist' },
  },
  alias: {
    '@app': './src',
    components: './src/components',
    routes: './src/routes'
  },
  plugins: [
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-typescript',
    ['@snowpack/plugin-webpack', {}]
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    {
      'match': 'routes',
      'src': '.*',
      'dest': '/index.html'
    },
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // 'bundle': true,
  },
  packageOptions: {
    packageOptions: {
      polyfillNode: true,
      rollup: {
        plugins: [rollupPluginNodePolyfills({
          crypto: true
        })],
      },
    },
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    htmlFragments: true
  },
};
