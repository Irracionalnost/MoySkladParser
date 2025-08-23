<script setup>
import { ref } from 'vue';

import TextBlockControl from '../components/TextBlockControl.vue';
import DropList from '../components/DropList.vue';

import { Parser } from '../scripts/parser/Parser';

const mode = ref('moysklad');
const textBefore = ref('');
const textAfter = ref('');

function clear() {
  textBefore.value = '';
  textAfter.value = '';
}

function updateTextBefore(val) {
  textBefore.value = val;

  const parser = new Parser(textBefore.value);
  parser.getAllElements();
  parser.decodedElements();
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
