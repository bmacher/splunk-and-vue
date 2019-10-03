import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts';
import mixinSplunkSearch from './splunk-search-mixin';

Vue.component('apexchart', VueApexCharts);

const SEARCH_ID = 'vue-demo-search';
const SEARCH = `
  index=_internal sourcetype IN (splunkd, splunk_web_service) 
  | timechart span=1m count by sourcetype
`;

export const init = (mvc, SearchManager) => {
  new Vue({
    name: 'vue-demo',

    mixins: [ mixinSplunkSearch(SearchManager, SEARCH_ID, SEARCH) ],

    data() {
      return {
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
        if (!this[SEARCH_ID]) return [];

        const { fields, rows } = this[SEARCH_ID];

        // Extract selected fields (remove _time, _span)
        const selectedFields = fields.slice(1, -1);

        // Initalize series
        const series = selectedFields.map(
          field => ({ name: field, data: [] })
        );

        // Fill data for each series
        for (let row of rows) {
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

    template: `
      <div>
        <apexchart width="500" type="line" :options="options" :series="series"></apexchart>
      </div>
    `,
  }).$mount('#vue-app');
}