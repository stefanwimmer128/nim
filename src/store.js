import Vue from "vue";
import createLogger from "vuex/dist/logger";

export default {
    mutations: {
        total(state, player)
        {
            Vue.set(state.total, player, state.total[player] + 1);
        },
    },
    state: {
        total: [
            0,
            0,
        ],
    },
    plugins: [
        ...(process.env.NODE_ENV === "development" ? [
            createLogger({
                collapsed: false,
            }),
        ] : []),
    ],
};
