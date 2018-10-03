module.exports = {
  exportPathMap: async function (defaultPathMap) {
    return {
      '/': { page: '/' },
      '/repo': { page: '/repo' },
    }
  },
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    return config
  }
}
