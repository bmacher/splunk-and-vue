const mixinSplunkSearch = (SearchManager, id, search) => {
  const SearchManagerConfig = {
    id,
    status_buckets: 0,
    earliest_time: '-20m@m',
    latest_time: 'now',
    sample_ratio: 1,
    cancelOnUnload: true,
    search,
    app: 'vue-demo',
    auto_cancel: 90,
    preview: true,
    tokenDependencies: {
    },
    runWhenTimeIsUndefined: false
  }

  return {
    data() {
      return {
        // Results of search
        [id]: undefined,
      };
    },

    created() {
      // Create and start search
      const searchManager = new SearchManager(SearchManagerConfig);
      searchManager.startSearch();

      // Subscribe to search
      searchManager
        .data('results')
        .on('data', (model, data) => {
          this[id] = data;
        });
    },
  };

};

export default mixinSplunkSearch;