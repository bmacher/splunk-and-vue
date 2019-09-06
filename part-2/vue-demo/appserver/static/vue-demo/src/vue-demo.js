import Vue from 'vue';

const SearchManagerConfig = {
  'id': 'search1',
  'status_buckets': 0,
  'earliest_time': '-24h@h',
  'latest_time': 'now',
  'sample_ratio': 1,
  'cancelOnUnload': true, 
  'search': 'index=_internal sourcetype IN (splunkd, splunk_web_service) | timechart count by sourcetype',
  'app': 'vue-demo',
  'auto_cancel': 90,
  'preview': true,
  'tokenDependencies': {
  },
  'runWhenTimeIsUndefined': false
}

export const init = (mvc, SearchManager) => {
  // Create and start search
  const searchManager = new SearchManager(
    SearchManagerConfig,
    { tokens: true, tokenNamespace: 'submitted' }
  ).startSearch();

  // Subscribe to search
  const results = searchManager
    .data('results')
    .on('data', (model, data) => console.log(data.rows));

  // Start search

  new Vue({
    data: {
      message: 'Hello World'
    },

    template: '<p>{{ message }}</p>'
  }).$mount('#vue-app');
}