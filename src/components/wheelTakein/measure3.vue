<template>
    <processtemp v-bind:requestURL="requestURL" v-bind:index="'1'"
                 v-bind:finishFlag="'isMeasureFinish'" v-bind:title="'轮对测量'"
                 v-bind:navhead1="'轮对收入'" v-bind:navhead2="'轮对测量'"></processtemp>
</template>

<script>
    import processtemp from "../template/processtemp";
    export default {
        name: "information",
        components:{
            processtemp:processtemp,
        },
        data(){
             return {
                 requestURL:'/measure',
            };
        },
    }
</script>

<style lang="scss" scoped>
</style>                                                                                                                                                                       