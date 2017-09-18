<script>
    import Vue from "vue";
    
    const initialRows = [
        7,
        5,
        3,
        1,
    ];
    
    export default {
        data: () =>
            ({
                player: 0,
                rows: [].concat(initialRows),
                selectedRow: null,
                tookCards: 0,
                won: false,
            }),
        methods: {
            removeCard(row)
            {
                if (this.selectedRow === null || row === this.selectedRow)
                {
                    Vue.set(this.rows, row, this.rows[row] - 1);
                    this.selectedRow = row;
                    this.tookCards++;
                    
                    this.won = this.rows.every(row =>
                        row === 0,
                    );
                    if (this.won)
                        this.$store.commit("total", this.player);
                }
                else
                    alert("Cards must be taken from same row! Or switch player.");
            },
            restart()
            {
                this.player = 0;
                this.rows = [].concat(initialRows);
                this.selectedRow = null;
                this.tookCards = 0;
                this.won = false;
            },
            switchPlayer()
            {
                this.player = Number(! this.player);
                this.selectedRow = null;
                this.tookCards = 0;
            },
        },
    };
</script>

<style lang="scss" scoped>
    div#game
    {
        div.card
        {
            background-color: #00b7ff;
            border-radius: 4px;
            cursor: pointer;
            display: inline-block;
            height: 3.2rem;
            margin: 0 4px;
            width: 2rem;
        }
    }
</style>

<template lang="pug">
    div#game
        h2(id="won" v-if="won") Player {{player + 1}} won!
        div(class="row" v-for="(cards, row) in rows" v-else)
            div(class="card" v-for="card in cards" v-on:click="removeCard(row)")
        el-button(@click="switchPlayer" id="switch-player" title="Switch Player" v-bind:disabled="tookCards === 0" v-if="! won") Player {{player + 1}}
        el-button(@click="restart" id="restart" v-if="won") Restart
</template>
