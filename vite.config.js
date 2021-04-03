/**
 * @type {import('vite').UserConfig}
 */
export default {
  server: {
    proxy: {
      '/subscribe.php': 'http://localhost:8080/',
    },
  },
}
