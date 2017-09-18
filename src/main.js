import ElementUI from "element-ui";
import Vue from "vue";
import Vuex from "vuex";

import "element-ui/lib/theme-default/index.css";

import store from "./store";

import app from "./components/app";

Vue.use(ElementUI);
Vue.use(Vuex);

export default new Vue({
    components: {
        app,
    },
    el: "div#mount",
    store: new Vuex.Store(store),
    template: "<app />",
});
