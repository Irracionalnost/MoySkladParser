<script setup>
import TextBlockInterface from './components/TextBlockInterface.vue';
import { ref } from 'vue';
const textBefore = ref('')
const textAfter = ref('')

</script>

<template>
<div class="body">
    <TextBlockInterface v-model:text1="textBefore" v-model:text2="textAfter"/>
</div>
</template>

<style scoped>
.body {
    padding-left: 20px;
    padding-top: 60px;
}
</style>
