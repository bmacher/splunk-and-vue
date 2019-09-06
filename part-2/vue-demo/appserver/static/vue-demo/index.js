//# sourceURL=index.js

require([
  'splunkjs/mvc',
  '../app/vue-demo/vue-demo/dist/vue-demo-bundle',
  'splunkjs/mvc/simplexml/ready!',
  'splunkjs/ready!'
], (mvc, VueDemo) => {
  
  // Initalize VueDemo and pass mvc
  VueDemo.init(mvc);

});