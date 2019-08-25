# [Using VueJS in a Splunk Dashboard Part 1](https://medium.com/@bmacher/using-vuejs-in-splunk-dashboards-part-1-7af73c7e2e98)

The `vue-demo` app is the result of the article linked in the headline. The minified version of VueJS is imported into a Splunk dashboard to create a simple text filter. For more details you can read the medium article.

#### How to use the [Mixin Token Factory](https://github.com/bmacher/splunk-and-vue/blob/2804bb509c6c7dbcc4791582a3d4b9082c3c0680/part-1/vue-demo/appserver/static/vue-demo.js#L15)

Create a new Vue instance and mixin every token you want to manipulate and the token model (submitted, default). The mixin will create a data entry and watcher with the name of the token. It also adds and removes an observer on the token model, to get notified when Splunk changes the token. The method `updateOnTokenChange` is addet to `methods`. You need to use a named function to properly unsubscribe when the instance is destroyed.

#### Example

```javascript
new Vue({
    mixins: [ ...mixinSplunkTokens(["sourcetype","source"], 'submitted') ],

    template: `
      <div>
        <input v-model.lazy="sourcetype" placeholder="Sourcetype" />
        <input v-model.lazy="source" placeholder="Source" />
      </div>
    `,
  }).$mount("#vue-app");
```

I recommend to use the `lazy` modifier, otherwise the token would be changed on every input event.
