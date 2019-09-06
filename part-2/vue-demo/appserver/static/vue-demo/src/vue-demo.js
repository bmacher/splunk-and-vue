import Vue from 'vue';

export const init = (mvc) => {
  new Vue({
    data: {
      message: 'Hello World'
    }
  }).$mount("#vue-app");
}