import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts';

Vue.component('apexchart', VueApexCharts);

const SearchManagerConfig = {
  'id': 'search1',
  'status_buckets': 0,
  'earliest_time': '-20m@m',
  'latest_time': 'now',
  'sample_ratio': 1,
  'cancelOnUnload': true,
  'search': 'index=_internal sourcetype IN (splunkd, splunk_web_service) | timechart span=1m count by sourcetype',
  'app': 'vue-demo',
  'auto_cancel': 90,
  'preview': true,
  'tokenDependencies': {
  },
  'runWhenTimeIsUndefined': false
}

export const init = (mvc, SearchManager) => {
  new Vue({
    name: 'vue-demo',

    data() {
      return {
        fields: undefined,
        rows: undefined,

        options: {
          xaxis: {
            type: 'datetime'
          }
        }
      };
    },

    // [ "_time", "splunk_web_service", "splunkd", "_span" ]
    // [ "2019-09-05T21:00:00.000+02:00", "1209", "3558", "1800" ]
    computed: {
      series() {
        if (!this.fields || !this.rows) return [];

        // Extract selected fields (remove _time, _span)
        const selectedFields = this.fields.slice(1, -1);

        // Initalize series
        const series = selectedFields.map(
          field => ({ name: field, data: [] })
        );

        // Fill data for each series
        for (let row of this.rows) {
          const timestamp = (new Date(row[0])).getTime();

          // Remove values of _time, _span
          const transformedRow = row.slice(1, -1);

          transformedRow.forEach(
            (cell, i) => series[i].data.push([ timestamp, cell])
          );
        }

        return series;
      }
    },

    created() {
      // Create and start search
      const searchManager = new SearchManager(SearchManagerConfig);
      searchManager.startSearch();

      // Subscribe to search
      searchManager
        .data('results')
        .on('data', (model, { fields, rows }) => {
          this.fields = fields;
          this.rows = rows;
        });
    },

    template: `
      <div>
        <apexchart width="500" type="line" :options="options" :series="series"></apexchart>
      </div>
    `,
  }).$mount('#vue-app');
}