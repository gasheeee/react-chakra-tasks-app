/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: {
      url: '/',
      static: true
    },
    src: { url: '/dist' },
  },
  alias: {
    "@app": "./src",
    components: "./src/components",
    routes: "./src/routes"
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-webpack'
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    {
      "match": "routes",
      "src": ".*",
      "dest": "/index.html"
    },
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
