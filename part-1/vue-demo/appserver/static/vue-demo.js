//# sourceURL=vue-demo.js

require.config({
  paths: {
    vue: "../app/vue-demo/node_modules/vue/dist/vue"
  }
});

require([
  "splunkjs/mvc",
  "vue",
  'splunkjs/mvc/simplexml/ready!',
  'splunkjs/ready!'
], (mvc, Vue) => {
  const mixinSplunkTokens = (tokens, model) => {
    const tokenModel = mvc.Components.get(model);

    return tokens.map(token => ({
      data: function () {
        return {
          [token]: tokenModel.get(token)
        }
      },

      watch: {
        [token]: function (value) {
          tokenModel.set(token, value);
        }
      },

      created () {
        tokenModel.on(`change:${token}`, this.updateOnTokenChange);
      },

      destroyed () {
        tokenModel.off(`change:${token}`, this.updateOnTokenChange);
      },
      
      methods: {
        updateOnTokenChange(model, value) {
          this[token] = value;
        },
      }
    }))
  }

  new Vue({
    mixins: [ ...mixinSplunkTokens(["sourcetype","source"], 'submitted') ],

    template: `
      <div>
        <input v-model.lazy="sourcetype" placeholder="Sourcetype" />
        <input v-model.lazy="source" placeholder="Source" />
      </div>
    `,
  }).$mount("#vue-app");
});