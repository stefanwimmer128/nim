<script>
    export default {
        computed: {
            total()
            {
                return this.$store.state.total;
            },
        },
    };
</script>

<template lang="pug">
    div#total
        h2
            span(class="total" title="Player 1") {{total[0]}}
            | :
            span(class="total" title="Player 2") {{total[1]}}
</template>

