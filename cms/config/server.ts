module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: 'http://localhost:1337',
  app: {
    keys: ['mySuperSecretKey1', 'mySuperSecretKey2'],
  },
  settings: {
    cors: {
      origin: [
        'http://api.lussogroupgeo.com',
        'http://lussogroupgeo.com',
        'https://lussogroupgeo.com',
        'http://localhost:3000',
        'http://localhost',
        'http://127.0.0.1',
      ],
    },
  },
  allowedHosts: [
    'localhost',
    '127.0.0.1',
    'localhost:3000',
  ],
});
