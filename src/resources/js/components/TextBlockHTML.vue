<script setup>
import { ref, watch } from 'vue';
const editor = ref(null); //dom-элемент редактора
const textValue = ref(''); //текст редактора

const props = defineProps({
  textBefore: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['updateText']);

watch(
  () => props.textBefore,
  (newVal) => {
    textValue.value = newVal;
    if (editor.value && editor.value.innerHTML !== newVal) {
      editor.value.innerHTML = newVal;
    }
  }
);

import DOMPurify from 'dompurify';

function handlePaste(e) {
  e.preventDefault();
  let html = e.clipboardData.getData('text/html') || e.clipboardData.getData('text/plain');
  html = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['ul', 'ol', 'li', 'b', 'i', 'a', 'br', 'p'],
    ALLOWED_ATTR: ['href', 'target'],
  }).trim();

  emit('updateText', html);
}

function inputText(val) {
  textValue.value = val;
  emit('updateText', val);
}
</script>

<template>
  <div
    ref="editor"
    class="text-block px-4 py-3 rounded-4 overflow-y-auto"
    contenteditable
    @input="inputText($event.target.innerHTML)"
    @paste="handlePaste"
  ></div>
</template>

<style lang="scss" scoped>
.text-block {
  background-color: var(--text-block-background);
  color: var(--text-block-color);
  border: 3px solid var(--text-block-border);
  min-height: 650px;
  width: 100%;
  font-size: 18px;

  &:focus {
    outline: none;
    border-color: var(--text-block-focus);
  }

  & ul {
    list-style: disc;
    margin-left: 1.5rem;
    padding-left: 0;
  }
  & li {
    margin-bottom: 0.25rem;
  }
}
</style>
