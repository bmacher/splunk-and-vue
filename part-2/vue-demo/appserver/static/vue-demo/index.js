//# sourceURL=index.js

require([
  'splunkjs/mvc',
  'splunkjs/mvc/searchmanager',
  '../app/vue-demo/vue-demo/dist/vue-demo-bundle',
  'splunkjs/mvc/simplexml/ready!',
  'splunkjs/ready!'
], (mvc, SearchManager, VueDemo) => {
  
  // Initalize VueDemo and pass mvc + SearchManager
  VueDemo.init(mvc, SearchManager);

});