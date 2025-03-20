// service-worker.js
precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/assets/field-recordings/forest.mp3', revision: '1' },
    { url: '/assets/field-recordings/waves.mp3', revision: '1' }
  ]);