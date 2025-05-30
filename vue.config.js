module.exports = {
  publicPath: '/PWA-Urban-Flow/',

  pwa: {
    name: 'Minha PWA',
    themeColor: '#42b983',
    backgroundColor: '#ffffff',
    display: 'standalone',
    start_url: '.',
    icons: [
      {
        src: 'img/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'img/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],

    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true
    }
  }
}