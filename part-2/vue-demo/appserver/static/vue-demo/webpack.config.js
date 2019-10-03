const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'apexcharts$': 'apexcharts/dist/apexcharts.amd.js',
      // Use build with runtime
      'vue$': 'vue/dist/vue.esm.js',
    }
  },
  
  entry: './src/vue-demo.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vue-demo-bundle.js',
    libraryTarget: 'amd'
  }
};
