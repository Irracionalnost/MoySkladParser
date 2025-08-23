<script setup>
import { ref } from 'vue';

import TextBlockControl from '../components/TextBlockControl.vue';
import DropList from '../components/DropList.vue';

const mode = ref('moysklad');
const textBefore = ref('');
const textAfter = ref('');

function updateTextBefore(val) {
  textBefore.value = val;
}

function clear() {
  textBefore.value = '';
  textAfter.value = '';
}

function updateTextAfter(val) {
  textAfter.value = val;
}
</script>

<template>
  <div class="body-container">
    <DropList @change-mode="(val) => (mode = val)" />
    <TextBlockControl
      :text-before="textBefore"
      :text-after="textAfter"
      @clear-text="clear"
      @update-text-before="(val) => updateTextBefore(val)"
      @update-text-after="(val) => updateTextAfter(val)"
    />
  </div>
</template>

<style>
.body-container {
  margin: 68px 200px 0px 200px !important;
}
</style>
