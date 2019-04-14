module.exports = {
  entry: 'src/lib/index.ts',
  babel: true,
  typescript: true,
  vue: true,
  sass: true,
  postcss: true,
  autoprefixer: true,
  external: [
    'vue',
    '@dadajam4/scroller',
    '@dadajam4/ev',
    '@dadajam4/visibility',
  ],
  globals: {
    vue: 'Vue',
    '@dadajam4/scroller': 'Scroller',
    '@dadajam4/event': 'EV',
    '@dadajam4/visibility': 'Visibility',
  },
};
