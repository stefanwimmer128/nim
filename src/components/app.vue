<script>
    import game from "./game";
    import total from "./total";
    
    export default {
        components: {
            game,
            total,
        },
        computed: {
            title: () =>
                document.title,
        },
    };
</script>

<style lang="scss" scoped>
    div#app
    {
        font-family: "Ubuntu", "Arial";
        font-size: 1rem;
        text-align: center;
    }
</style>

<template lang="pug">
    div#app
        h1 {{title}}
        game
        total
</template>
